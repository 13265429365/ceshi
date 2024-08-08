import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { Loading, QSpinnerBars } from 'quasar';
import { Notifying } from 'src/utils/prompt';
import { userStore } from 'stores/user';

const api = axios.create({ baseURL: process.env.baseURL });
// 请求数据拦截
api.interceptors.request.use((config: any) => {
  const $userStore = userStore();
  if (config.showLoading) {
    Loading.show({
      spinner: QSpinnerBars,
      spinnerColor: 'secondary',
      spinnerSize: 50,
      message: 'loading...'
    });
  }

  // 如果存在Token，那么请求带上Token
  if (
    $userStore.userToken !== '' &&
    !config.headers['Authorization']
  ) {
    config.headers['Authorization'] = 'Bearer ' + $userStore.userToken;
  }

  // 如果设置了语言，那么请求带上语言
  if ($userStore.userLang !== '') {
    config.headers['Accept-Language'] = $userStore.userLang;
  }
  return config;
});

// 响应数据拦截
api.interceptors.response.use(
  (response) => {
    Loading.hide();
    const res = response.data;

    if (res.hasOwnProperty('code')) {
      if (res.code === 0) {
        return res.data;
      }

      Notifying('negative', res.msg);
      return Promise.reject(res.msg);
    } else {
      return res;
    }
  },
  (err) => {
    const $userStore = userStore();
    Loading.hide();
    if (err.response) {
      switch (err.response.status) {
        case 401:
          Notifying('negative', err.response.data);
          $userStore.updateToken('');
          break;
        case 500:
          break;
        default:
          Notifying('negative', err.response.data);
      }
    }
    //  返回错误
    return Promise.reject(err);
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});
export { api };

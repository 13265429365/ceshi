import { onMounted, reactive, toRefs } from 'vue';
import { createUserAuthAPI, userAuthInfoAPI } from 'src/apis/users/auth';
import { Notifying } from 'src/utils/prompt';
import { userStore } from 'stores/user';
import { useI18n } from 'vue-i18n';

//未实名
export const nowAuth = 0;

//审核中
export const pendingAuth = 10;

//已实名
export const successAuth = 20;

//实名失败
export const failedAuth = -1;

export const userAuthCommon = () => {
  const $userStore = userStore()
  const $i18n = useI18n()

  const state = reactive({
    // 用户实名参数
    params: { type: 1, photo1: '', photo2: '', photo3: ''} as any,
  });

  // 获取用户实名信息
  const userAuthInfoFunc = ()=>{
    userAuthInfoAPI().then((res: any) => {
      state.params = res;
    });
  }

  // 提交用户实名信息
  const createUserAuthFunc = () => {
    state.params.type = 1
    createUserAuthAPI(state.params).then(() => {
      state.params.status = pendingAuth
      Notifying('positive',$i18n.t('success'))

      //  更新用户信息状态
      const userInfo = $userStore.userInfo
      userInfo.authInfo.status = pendingAuth
      $userStore.updateUserInfo(userInfo)
    });
  };

  return {
    ...toRefs(state),
    userAuthInfoFunc,
    createUserAuthFunc,
  };
}

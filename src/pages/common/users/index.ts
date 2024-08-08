import { createCaptchaAPI, userLoginAPI, userRegisterAPI } from 'src/apis/users';
import { onlineInfoAPI } from 'src/apis';
import { reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { userStore } from 'stores/user';
import { Notifying } from 'src/utils/prompt';
import { useI18n } from 'vue-i18n';
import { initStore } from 'stores/init';

export const useIndexCommon = () => {
  const $router = useRouter();
  const $route = useRoute();
  const $userStore = userStore();
  const $initStore = initStore();
  const $i18n = useI18n();

  const state = reactive({
    // 基础路径
    baseURL: process.env.baseURL,

    // 是否显示密码
    showTextPassword: {
      // 登录密码
      password: false,
      cmfPassword: false,
      // 安全码
      securityKey: false,
      cmfSecurityKey: false
    },

    // 客服信息
    onlineInfo: { icon: '', link: '' },

    // 登录参数
    loginParams: {
      username: '', //用户名
      password: '', //密码
      captchaId: '', //验证Id
      captchaVal: '' // 验证码
    } as any,

    // 注册参数
    registerParams: {
      username: '', //用户名
      password: '', //密码
      cmfPassword: '',  // 确认密码
      captchaId: '', //验证id
      captchaVal: '', // 验证码
      email: '', //邮箱
      telephone: '', //电话
      securityKey: '', //安全秘钥
      cmfSecurityKey: '',//确认安全密钥
      code: $route.query.code ? $route.query.code as any : '' //邀请码
    } as any,

    // 当前国家信息
    currentCountry: {} as any
  });

  // 获取验证码
  const refreshCaptchaFunc = () => {
    createCaptchaAPI().then((res: any) => {
      state.loginParams.captchaId = res;
      state.registerParams.captchaId = res;
    });
  };

  // 登录
  const userLoginFunc = () => {
    userLoginAPI(state.loginParams)
      .then(async (res: any) => {
        $userStore.updateUserInfo(res.userInfo);
        $userStore.updateToken(res.token);
        void $router.push({ name: 'HomeIndex' });
      })
      .catch(() => {
        refreshCaptchaFunc();
      });
  };

  // 注册
  const userRegisterFunc = () => {
    // 判断两次登录密码是否一致
    if ($initStore.setting.register.showCmfPass) {
      if (state.registerParams.password !== state.registerParams.cmfPassword) {
        Notifying('negative', $i18n.t('twoPasswordsAreDifferent'));
        return false;
      }
    }

    // 判断两次安全秘钥是否一致
    if ($initStore.setting.register.showCmfSecurityKey) {
      if (state.registerParams.securityKey !== state.registerParams.cmfSecurityKey) {
        Notifying('negative', $i18n.t('twoSecretKeyAreDifferent'));
        return false;
      }
    }

    //拼接手机区号
    state.registerParams.telephone = state.currentCountry.code + '|' + state.registerParams.telephone;
    if ($initStore.setting.register.showTelephone) {
    }
    userRegisterAPI(state.registerParams).then((res: any) => {
      $userStore.updateUserInfo(res.userInfo);
      $userStore.updateToken(res.token);
      void $router.push({ name: 'HomeIndex' });
    }).catch(() => {
      refreshCaptchaFunc();
    });
  };

  // 获取客服信息
  const onlineInfoFunc = () => {
    onlineInfoAPI().then((res: any) => {
      state.onlineInfo = res;
    });
  };

  return {
    ...toRefs(state),
    refreshCaptchaFunc,
    userLoginFunc,
    userRegisterFunc,
    onlineInfoFunc
  };
};

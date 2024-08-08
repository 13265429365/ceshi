import { reactive, toRefs } from 'vue';
import { userStore } from 'stores/user';
import { updatePasswordAPI, updateUserInfoAPI, userInfoAPI } from 'src/apis/users/info';
import { useI18n } from 'vue-i18n';
import { Notifying } from 'src/utils/prompt';

//修改密码
export const passwordType = 1;

//实名安全密钥
export const secretKeyType = 2;

export const userInfoCommon = () => {
  const $userStore = userStore();
  const $i18n = useI18n();

  const state = reactive({
    // 用户信息
    userInfo: { authInfo: {} as any, levelInfo: { levelInfo: {} as any } as any } as any,

    //修改用户信息参数
    userInfoParams: {} as any,

    //修改密码参数
    passwordParams: { type: passwordType } as any,

    // 确认密码
    cmfPassword: '' as any,

    // 性别列表
    genderList: [
      { name: $i18n.t('unknown'), value: 0 },
      { name: $i18n.t('male'), value: 1 },
      { name: $i18n.t('female'), value: 2 }
    ] as any,

    // 生日显示
    dates: '' as any,

    // 当前选择国家
    currentCountry: {} as any,
  });

  // 获取用户信息
  const userInfoFunc = () => {
    userInfoAPI().then((res: any) => {
      state.userInfo = res;
      $userStore.updateUserInfo(res);
    });
  };

  // 修改用户信息
  const updateUserInfoFunc = (callback?: any) => {
    updateUserInfoAPI(state.userInfoParams).then(() => {
      userInfoAPI().then((res: any) => {
        Notifying('positive',$i18n.t('success'));
        $userStore.updateUserInfo(res);
        if (typeof callback == 'function') {
          callback();
        }
      });
    });
  };

  // 修改密码
  const updatePasswordFunc = (type: any, callback: any) => {
    state.passwordParams.type = type;
    if (state.passwordParams.newPassword != state.cmfPassword) {
      Notifying('negative',$i18n.t('twoPasswordsAreDifferent'));
      return false;
    }
    updatePasswordAPI(state.passwordParams).then(() => {
      state.passwordParams = { type: passwordType };
      state.cmfPassword = '';
      Notifying('positive',$i18n.t('success'));
      if (typeof callback == 'function') {
        callback();
      }
    });
  };

  return {
    ...toRefs(state),
    userInfoFunc,
    updateUserInfoFunc,
    updatePasswordFunc,
  };
};

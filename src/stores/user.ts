import { defineStore } from 'pinia';
import { Cookies, LocalStorage } from 'quasar';

export const userLangKey = '_userLang';
export const userTokenKey = '_userToken';
export const userInfoKey = '_userInfo';

export const userStoresState = {
  userLang: '',
  userToken: '',
  userInfo: LocalStorage.getItem(userInfoKey) ?? {}
};

export const userStore = defineStore('user', {
  state: () => {
    return {
      userLang: '',
      userToken: '',
      userInfo: {} as any,
    };
  },
  actions: {
    // 修改语言 cookies
    updateLang(lang: string) {
      this.userLang = lang;
      Cookies.set(userLangKey, lang, { path: '/' });
    },
    // 修改token cookies
    updateToken(token: string) {
      this.userToken = token;
      Cookies.set(userTokenKey, token, { path: '/' });
    },
    // 修改用户信息
    updateUserInfo(info: object) {
      this.userInfo = info;
      LocalStorage.set(userInfoKey, JSON.stringify(info));
    }
  }
});

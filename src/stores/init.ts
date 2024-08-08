import { defineStore } from 'pinia';

export const initStoreState = {
  domainStatus: '',

  //  基础配置
  config: {
    name: 'BaJie',
    logo: '',
    template: 'default',//默认模板
  },

  //  设置
  setting: {
    // 注册页面
    register: {
      showCmfPass: true,//是否显示确认密码
      showSecurityKey: false,//是否安全密钥
      showCmfSecurityKey: false,//是否显示确认安全秘钥
      showEmail: false,//是否显示邮箱
      showInvite: false,//是否显示邀请码
      showLang: false,//是否显示语言切换
      showTelephone: false,//是否显示手机号
      showVerify: true,//是否显示验证码
      showOnline: true,//是否显客服
    },
    // 登录页面
    login: {
      showLang: false,//是否显示语言切换
      showOnline: true,//是否显示客服
      showRegister: true,//是否显示注册
      showVerify: true,//是否显示验证码
    },
    // 钱包页面
    wallets: {
      showAccountDelete: true,//是否显示删除按钮
      showAccountNumber: true,//是否显示卡号
      showAccountSecurityKey: true,//是否显示安全秘钥
      showAccountUpdate: true,//是否显示修改按钮
      showTransferSecurityKey: false,//
      showConvertSecurityKey: false,//
    },
    // 主页
    home: {
      showLang: true,
      showOnline: true
    },
    basic: {
      showScore: false,//是否显示信用分
      showLevel: false,//是否显示会员等级
      showAuth: false,//是否显示实名状态
    },
    // 实名页面
    auth: {
      showRealName: true,
      showNumber: true,
      showPhoto2: true,
      showPhoto3: true,
      showAddress: true,
    },
  },

  countryList: [] as countryInterface[],//  国家列表
  langList: [] as LanguageInterface[],//语言列表
  translate: [] as translateInterface[],//  翻译数据
  menuList: {
    more: [] as MenuInterface[],
    navigation: [] as MenuInterface[],
    setting: [] as MenuInterface[],
  } as any,//菜单列表

};

// 初始化数据
export const initStore = defineStore('init', {
  state: () => {
    return initStoreState;
  },
  actions: {
    updateTranslate(translateList: any) {
      this.translate = translateList;
    }
  }
});

interface countryInterface {
  //  国家ID
  id: number;

  // 后缀
  iso1: string;

  //  国家名称
  name: string;

  //  国家图标
  icon: string;

  //  国家代码
  code: string;
}

interface translateInterface {
  // 建铭
  label: string;
  //  键值
  value: string;
}

interface LanguageInterface {
  //  语言ID
  id: number;

  //  语言名称
  name: string;

  //  语言别名
  symbol: string;

  //  语言图标
  icon: string;
}
interface MenuInterface {
  activeIcon: string;//选中图标
  children: [];//子级菜单
  icon: string;//图标
  isDesktop: number;//电脑版是否显示
  isMobile: number;//手机版是否显示
  name: string;//名称
  route: string;//路由路径
}

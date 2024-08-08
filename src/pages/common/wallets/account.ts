import { reactive, ref, toRefs } from 'vue';
import { initStore } from 'stores/init';
import { Notifying } from 'src/utils/prompt';
import {
  accountInfoAPI,
  accountListAPI,
  createAccountAPI,
  deleteAccountAPI, updateAccountAPI,
  walletsPaymentListAPI
} from 'src/apis/wallets/account';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

//获取余额提现账户
export const balanceWithdrawalAccountMode = 1;

//获取资产提现账户
export const assetsWithdrawalAccountMode = 2;

//获取余额支付列表
export const balancePaymentMode = 11;

//获取资产支付列表
export const assetsPaymentMode = 12;

//显示所有数据的银行卡类型
export const cardType1 = 1;

//只显示地址的银行卡类型
export const cardType2 = 11;

// 不同类型卡片的颜色
export const bgList = new Map([
  [cardType1, {
    background: 'linear-gradient(90deg, #4CB8C4 0%, #3CD3AD 100%)',
    height: '145px',
    borderRadius: '8px'
  }],
  [cardType2, {
    background: 'linear-gradient(90deg, #7474BF 0%, #348AC7 100%)',
    height: '145px',
    borderRadius: '8px'
  }]
]);

export const accountCommon = () => {
  const $initStore = initStore();
  const $router = useRouter();
  const $i18n = useI18n();

  // 删除提示弹窗
  const deleteDialogRef = ref(null) as any

  // 输入秘钥弹窗
  const securityDialogRef = ref(null) as any

  const state = reactive({
    // 提现账户模式
    mode: $router.currentRoute.value.query.mode ? Number($router.currentRoute.value.query.mode) : balanceWithdrawalAccountMode,

    // 提现账户列表
    accountList: [] as any,

    //当前删除卡片信息
    currentAccountInfo: {} as any,

    // 删除提现账户参数
    deleteParams: {} as any,

    // 提现账户ID
    id: $router.currentRoute.value.query.id ? Number($router.currentRoute.value.query.id) : 0,

    // 提现账户支付类型模式
    paymentMode: $router.currentRoute.value.query.mode ? Number($router.currentRoute.value.query.mode) : balancePaymentMode,

    // 提现账户支付类型列表
    paymentList: [] as any,

    // 当前选中支付类型
    currentPayment: {} as any,

    // 创建、修改提现账户参数
    createParams: {} as any
  });

  // 获取提现账户列表
  const accountListFunc = async () => {
    await accountListAPI({ mode: state.mode }).then((res: any) => {
      state.accountList = res;
    });
  };

  // 确定删除提现账户
  const submitDeleteFunc = () => {
    state.deleteParams.id = Number(state.currentAccountInfo.id);
    deleteAccountAPI(state.deleteParams).then(async () => {
      Notifying('positive', $i18n.t('success'));
      securityDialogRef.value?.hideFunc()
      await accountListFunc();
    });
  };

  // 点击删除提现账户
  const deleteAccountFunc = () => {
    // 判断是否需要输入安全密钥
    if ($initStore.setting.wallets.showAccountSecurityKey) {
      securityDialogRef.value?.openFunc()
    } else {
      submitDeleteFunc();
    }
  };

  // 获取提现账户支付类型列表
  const walletsPaymentListFunc = () => {
    walletsPaymentListAPI({ mode: state.paymentMode }).then((res: any) => {
      state.paymentList = res;

      //如果携带id，获取提现账户信息
      if (state.id) {
        accountInfoAPI({ id: state.id }).then((result: any) => {
          state.createParams = result;
          state.currentPayment = state.paymentList.find((payment: any) => {
            return payment.id == result.paymentId;
          });
        });
      } else {
        state.currentPayment = state.paymentList[0];
      }
    });
  };

  // 点击创建提现账户
  const submitFunc = () => {

    state.createParams.paymentId = state.currentPayment.id;

    if (!state.id) {
      // 创建提现账户
      createAccountFunc()
      console.log(123);
    } else {
      console.log(222);
      // 编辑提现账户
      if ($initStore.setting.wallets.showAccountSecurityKey) {
        securityDialogRef.value?.openFunc()
      } else {
        updateAccountFunc();
      }
    }
  };

  // 创建提现账户
  const createAccountFunc = ()=>{
    createAccountAPI(state.createParams).then(() => {
      Notifying('positive', $i18n.t('success'));
      void $router.replace({
        name: 'WalletsAccountIndex',
        query: { mode: state.paymentMode == balancePaymentMode ? balanceWithdrawalAccountMode : assetsWithdrawalAccountMode }
      });
    });
  }

  // 修改提现账户
  const updateAccountFunc = ()=>{
    updateAccountAPI(state.createParams).then(() => {
      Notifying('positive', $i18n.t('success'));
      void $router.replace({
        name: 'WalletsAccountIndex',
        query: { mode: state.paymentMode == balancePaymentMode ? balanceWithdrawalAccountMode : assetsWithdrawalAccountMode }
      });
    });
  }

  return {
    deleteDialogRef,
    securityDialogRef,
    ...toRefs(state),
    accountListFunc,
    deleteAccountFunc,
    submitDeleteFunc,
    walletsPaymentListFunc,
    submitFunc,
    updateAccountFunc,
  };
};

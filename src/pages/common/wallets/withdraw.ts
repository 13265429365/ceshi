import { createWithdrawAPI } from 'src/apis/wallets';
import { reactive, ref, toRefs } from 'vue';
import { balanceWithdrawalAccountMode } from 'pages/common/wallets/account';
import { Notifying } from 'src/utils/prompt';
import { initStore } from 'stores/init';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

export const withdrawCommon = () => {
  const $initStore = initStore()
  const $router = useRouter()
  const $i18n = useI18n()

  // 输入秘钥弹窗
  const securityDialogRef = ref(null) as any

  const state = reactive({
    // 当前模式
    mode: $router.currentRoute.value.query.mode ?
      Number($router.currentRoute.value.query.mode) :
      balanceWithdrawalAccountMode,

    // 当前选择的提现账户
    currentAccount: { paymentInfo: {} as any } as any,

    // 提现参数
    withdrawParams: {} as any,
  });

  // 点击提现
  const submitFunc = (accountListLength: any) => {
    if (accountListLength <= 0) {
      Notifying('negative',$i18n.t('notBindWithdrawAccount'))
      return false
    }
    // 编辑提现账户
    if ($initStore.setting.wallets.showAccountSecurityKey) {
      securityDialogRef.value?.openFunc()
    } else {
      createWithdrawFunc()
    }
  }

  // 确认提现
  const createWithdrawFunc = () => {
    state.withdrawParams.accountId = state.currentAccount.id;
    state.withdrawParams.money = Number(state.withdrawParams.money)
    createWithdrawAPI(state.withdrawParams).then(()=>{
      Notifying('positive',$i18n.t('success'))
      $router.back()
    })
  };

  // 切换提现账户
  const switchPayment = (account: any) => {
    state.currentAccount = account;
  };

  return {
    securityDialogRef,
    ...toRefs(state),
    submitFunc,
    createWithdrawFunc,
    switchPayment,
  };
}

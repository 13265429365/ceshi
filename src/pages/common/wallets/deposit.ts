import { createDepositAPI } from 'src/apis/wallets';
import { walletsPaymentListAPI } from 'src/apis/wallets/account';
import { reactive, toRefs } from 'vue';
import { balanceDepositMode } from 'src/pages/common/wallets/order';
import { cardType2 } from 'pages/common/wallets/account';
import { Notifying } from 'src/utils/prompt';
import { copyToClipboard } from 'quasar';
import QRCode from 'qrcode-svg-ts';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

export const depositCommon = () => {
  const $router = useRouter();
  const $i18n = useI18n();

  const state = reactive({
    // 当前模式
    mode: $router.currentRoute.value.query.mode ?
      Number($router.currentRoute.value.query.mode) :
      balanceDepositMode,

    // 当前资产ID
    assetsId: $router.currentRoute.value.query.assetsId ?
      Number($router.currentRoute.value.query.assetsId) : 0,

    // 提现账户类型列表
    paymentList: [] as any,

    // 当前选择账户类型
    currentPayment: {} as any,

    // 充值参数
    createParams: {
      voucher: ''
    } as any,

    // 充值二维码
    currentQrcode: ''
  });

  // 获取提现账户类型列表
  const walletsPaymentListFunc = ()=>{
    walletsPaymentListAPI({ mode: state.mode }).then((res: any) => {
      state.paymentList = res;

      // 如果存在资产ID， 那么选中当前充值类型
      if (state.assetsId > 0) {
        for (let i = 0; i < state.paymentList.length; i++) {
          if (state.paymentList[i].assetsId == state.assetsId) {
            switchPayment(state.paymentList[i]);
          }
        }
      } else {
        state.currentPayment = state.paymentList[0]
      }

      // 生成二维码
      createQrcode();
    });
  }

  // 提交信息
  const createDepositFunc = () => {
    state.createParams.PaymentId = state.currentPayment.id;
    state.createParams.money = Number(state.createParams.money);
    createDepositAPI(state.createParams).then(() => {
      Notifying('positive',$i18n.t('success'));
      // if (state.mode == balanceDepositMode) {
      //   // 跳转钱包
      //   void $router.push({ name: 'WalletsIndex' });
      // } else {
      //   // 跳转资产
      //   void $router.push({ name: 'WalletsAssets' });
      // }
      $router.back()
    });
  };

  // 切换支付类型
  const switchPayment = (payment: any) => {
    state.currentPayment = payment;
    createQrcode();
  };

  // 生成二维码
  const createQrcode = () => {
    if (state.currentPayment.type == cardType2) {
      console.log(state.currentPayment);
      for (let i = 0; i < state.currentPayment.data.length; i++) {
        if (state.currentPayment.data[i].field == 'Number') {
          const qrCode = new QRCode({
            content: state.currentPayment.data[i].value,
            width: 138,
            height: 138,
            color: '#000000',
            background: '#ffffff',
            ecl: 'M'
          });
          state.currentQrcode = qrCode.toDataURL();
        }
      }
    }
  };

  // 复制方法
  const copyFunc = (text: any) => {
    copyToClipboard(text).then(() => {
      Notifying('positive',$i18n.t('success'));
    });
  };

  return {
    ...toRefs(state),
    walletsPaymentListFunc,
    createDepositFunc,
    switchPayment,
    copyFunc
  };
};

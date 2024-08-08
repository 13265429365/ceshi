import { createTransferAPI } from 'src/apis/wallets/transfer';
import { walletsAssetsListAPI } from 'src/apis/wallets/assets';
import { userInfoAPI } from 'src/apis/users/info';
import { reactive, ref, toRefs } from 'vue';
import { date } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { userStore } from 'stores/user';
import { Notifying } from 'src/utils/prompt';
import { initStore } from 'stores/init';

//余额转移记录
export const balanceTransferType = 1;

//资产转移记录
export const assetsTransferType = 11;

export const transferCommon = () => {
  const $route = useRoute();
  const $router = useRouter();
  const $i18n = useI18n();
  const $userStore = userStore();
  const $initStore = initStore();

  // 今日至前7日的时间
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const formattedToday = date.formatDate(today, 'YYYY/MM/DD');
  const formattedSevenDaysAgo = date.formatDate(sevenDaysAgo, 'YYYY/MM/DD');

  // 分页ref
  const pagination = ref(null) as any;

  // 输入秘钥弹窗
  const securityDialogRef = ref(null) as any

  const state = reactive({
    // 获取资金转移参数
    params: {
      createdAt: {
        from: formattedSevenDaysAgo,
        to: formattedToday
      },
      type: Number($route.query.assetsId) > 0 ? assetsTransferType : balanceTransferType,
      pagination: {
        descending: true,
        page: 1,
        rowsPerPage: 10,
        sortBy: 'createdAt'
      }
    } as any,

    // 资金转移参数
    transferParams: { assetsId: 0, money: '' } as any,

    // 钱包资产列表
    assetsList: [] as any,

    // 选中转移的资产
    assetsInfo: { id: 0, name: '', icon: '', userAssets: { money: 0 } } as any,
  });

  // 获取钱包资产列表
  const walletsAssetsListFunc = () => {
    const balanceInfo = { id: 0, name: $i18n.t('balance'), icon: '', userAssets: { money: $userStore.userInfo.money } };
    state.assetsList.unshift(balanceInfo);
    state.assetsInfo = balanceInfo;
    walletsAssetsListAPI().then((res: any) => {
      res.forEach((assets: any) => {
        state.assetsList.push(assets);
      });
    });
  };

  // 点击资金转移
  const submitFunc = () => {
    if (!state.transferParams.money) {
      Notifying('negative', $i18n.t('enterMoney'));
      return;
    }

    if ($initStore.setting.wallets.showTransferSecurityKey) {
      securityDialogRef.value?.openFunc()
    } else {
      createTransferFunc();
    }
  };

  // 确认资金转移
  const createTransferFunc = () => {
    createTransferAPI(state.transferParams).then(() => {
      userInfoAPI().then((res: any) => {
        $userStore.updateUserInfo(res);
      });
      Notifying('positive', $i18n.t('success'));
      void $router.push({ name: 'WalletsTransferRecord', query: { assetsId: state.transferParams.assetsId } });
    });
  };

  return {
    securityDialogRef,
    pagination,
    ...toRefs(state),

    //
    walletsAssetsListFunc,
    submitFunc,
    createTransferFunc
  };
};

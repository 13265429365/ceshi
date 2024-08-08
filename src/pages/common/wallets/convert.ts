import { reactive, ref, toRefs } from 'vue';
import { convertInfoAPI, createConvertAPI } from 'src/apis/wallets/convert';
import { date } from 'quasar';
import { walletsAssetsListAPI } from 'src/apis/wallets/assets';
import { Notifying } from 'src/utils/prompt';
import { useI18n } from 'vue-i18n';
import { initStore } from 'stores/init';
import { useRouter } from 'vue-router';
import { userStore } from 'stores/user';
import { userInfoAPI } from 'src/apis/users/info';

export const convertCommon = () => {
  const $i18n = useI18n()
  const $router = useRouter()
  const $initStore = initStore()
  const $userStore = userStore()

  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const formattedToday = date.formatDate(today, 'YYYY/MM/DD');
  const formattedSevenDaysAgo = date.formatDate(sevenDaysAgo, 'YYYY/MM/DD');

  // 需要转移的资产、需要接收的资产 唯一标识
  const ConvertSideFrom = 'from';
  const ConvertSideTo = 'to';

  // 输入秘钥弹窗
  const securityDialogRef = ref(null) as any

  const pagination = ref(null) as any;

  const state = reactive({
    // 获取资金转换列表参数
    params: {
      createdAt: {
        from: formattedSevenDaysAgo,
        to: formattedToday
      },
      pagination: {
        descending: true,
        page: 1,
        rowsPerPage: 10,
        sortBy: 'createdAt'
      }
    } as any,

    // 资金转换参数
    convertParams: { assetsId: 0, toAssetsId: 1 } as any,

    // 钱包资产列表
    assetsList: [] as any,

    // 需要转移的资产
    assetsInfo: { id: 0, name: '', icon: '', userAssets: { money: 0 } as any } as any,

    // 需要接收的资产
    toAssetsInfo: { id: 0, name: '', icon: '', userAssets: { money: 0 } as any } as any,

    // 转换结果预览弹窗
    showPreview: false,

    // 钱包资产列表弹窗
    showAssetsPopup: false,

    // 判断打开的是 用户资产 、 钱包资产
    AssetsType: '',

    // 转换汇率
    rate: '' as any
  });

  // 获取钱包资产列表
  const walletsAssetsListFunc = ()=>{
    state.assetsList.push({
      id: 0,
      name: $i18n.t('balance'),
      icon: '',
      userAssets: { money: $userStore.userInfo.money }
    });
    walletsAssetsListAPI().then((res: any) => {
      state.assetsInfo = state.assetsList[0];
      state.toAssetsInfo = res[0];
      state.convertParams.toAssetsId = state.toAssetsInfo.id;

      res.forEach((assets: any) => {
        state.assetsList.push(assets);
      });
    });
  }

  // 切换选中资产
  const switchAssetsFunc = (side: string, assetsInfo: any) => {
    state.showAssetsPopup = false;
    if (side == ConvertSideFrom) {
      state.assetsInfo = assetsInfo;
      state.convertParams.assetsId = state.assetsInfo.id;
      return;
    }

    state.toAssetsInfo = assetsInfo;
    state.convertParams.toAssetsId = state.toAssetsInfo.id;
  };

  // 点击查看转换预览结果
  const convertInfoFunc = () => {
    if (!state.convertParams.money) {
      Notifying('negative',$i18n.t('enterMoney'));
      return;
    }

    convertInfoAPI({
      assetsId: state.convertParams.assetsId,
      ToAssetsId: state.convertParams.toAssetsId
    }).then((res: any) => {
      state.showPreview = true;
      state.rate = res.rate;
    });
  };

  // 点击转换
  const submitFunc = () => {
    if ($initStore.setting.wallets.showConvertSecurityKey) {
      securityDialogRef.value?.openFunc()
    } else {
      createConvertFunc();
    }
  };

  // 确认转换
  const createConvertFunc = () => {
    state.convertParams.money = Number(state.convertParams.money);
    createConvertAPI(state.convertParams).then(() => {
      userInfoAPI().then((res: any) => {
        $userStore.updateUserInfo(res);
      })
      Notifying('positive',$i18n.t('success'));
      void $router.push({ name: 'WalletsConvertRecord' });
    });
  };

  // 点击翻转资产
  const invertFunc = () => {
    const assetsInfo = { ...state.assetsInfo };
    const toAssetsInfo = { ...state.toAssetsInfo };

    state.assetsInfo = toAssetsInfo
    state.toAssetsInfo = assetsInfo

    state.convertParams.assetsId = state.assetsInfo.id
    state.convertParams.toAssetsId = state.toAssetsInfo.id
    state.convertParams.money = ''
  };

  return {
    securityDialogRef,
    pagination,
    ConvertSideFrom,
    ConvertSideTo,
    ...toRefs(state),
    //
    walletsAssetsListFunc,
    switchAssetsFunc,
    convertInfoFunc,
    submitFunc,
    createConvertFunc,
    invertFunc,
  };
};

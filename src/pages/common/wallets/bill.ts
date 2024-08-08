import { reactive, ref, toRefs } from 'vue';
import { walletsBillOptionListAPI } from 'src/apis/wallets';
import { date } from 'quasar';
import { useRouter } from 'vue-router';

// 余额通用常量
export const commonBalance = 1

// 余额通用常量
export const commonAssets = 2

export const walletsBillCommon = () => {
  const $router = useRouter()

  // 获取今日至7天前的时间
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const formattedToday = date.formatDate(today, 'YYYY/MM/DD');
  const formattedSevenDaysAgo = date.formatDate(sevenDaysAgo, 'YYYY/MM/DD');

  const pagination = ref(null) as any;

  const state = reactive({
    //账单类型列表
    billOptionList: [] as any,

    //获取账单列表参数
    params: {
      createdAt: {
        from: formattedSevenDaysAgo,
        to: formattedToday
      },
      assetsId: $router.currentRoute.value.query.assetsId ?
        Number($router.currentRoute.value.query.assetsId) :
        0,
      mode: $router.currentRoute.value.query.mode ?
        Number($router.currentRoute.value.query.mode) :
        commonBalance,
      pagination: {
        descending: true,
        page: 1,
        rowsPerPage: 10,
        sortBy: 'createdAt'
      },
      types: []
    } as any,
  });

  // 获取账单类型列表
  const walletsBillOptionListFunc = ()=>{
    walletsBillOptionListAPI({ mode: state.params.mode }).then((res: any) => {
      state.billOptionList = res;
    });
  }

  // 选择账单类型
  const selectBillTypeFunc = (billType: any) => {
    const typesIndex = state.params.types.indexOf(billType);
    if (typesIndex > -1) {
      state.params.types.splice(typesIndex, 1);
      return;
    }
    state.params.types.push(billType);
  };

  // 切换账单(钱包账单、资产账单)
  const switchBill = (mode:any)=>{
    state.params.types = []
    state.params.mode = mode
    state.params.pagination.page = 1;
    pagination.value?.initData()
    walletsBillOptionListAPI({ mode: state.params.mode }).then((res: any) => {
      state.billOptionList = res;
    });
  }


  return {
    pagination,
    ...toRefs(state),
    walletsBillOptionListFunc,
    selectBillTypeFunc,
    switchBill
  };
}

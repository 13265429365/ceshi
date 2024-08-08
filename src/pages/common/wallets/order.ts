import { reactive, ref, toRefs } from 'vue';

// 余额充值模式
export const balanceDepositMode = 1;

// 余额提现模式
export const balanceWithdrawalMode = 11;

//订单、账单拒绝状态
export const orderRefuseStatus = -1;

//订单、账单审核状态
export const orderPendingStatus = 10;

// 订单、账单完成状态
export const orderSuccessStatus = 20;

const pagination = ref(null) as any;

export const orderCommon = () => {
  const state = reactive({
    // 获取订单列表参数
    params: {
      assetsId: 0,
      mode: balanceDepositMode,
      pagination: {
        descending: true,
        page: 1,
        rowsPerPage: 10,
        sortBy: 'createdAt'
      }
    } as any,

    // 是否显示密码
    showMoney: true
  });


  return {
    pagination,
    ...toRefs(state)
  };
};

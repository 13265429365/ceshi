import { api } from 'boot/axios';

// 充值
export const createDepositAPI = (params: any) => {
  return api.post('/auth/wallets/order/deposit', params, { showLoading: true } as any);
};

// 提现
export const createWithdrawAPI = (params: any) => {
  return api.post('/auth/wallets/order/withdraw', params, { showLoading: true } as any);
};

// 获取钱包、资产订单 mode 1资金  2资产
export const walletsOrderListAPI = (params: any) => {
  return api.post('/auth/wallets/order/index', params, { showLoading: false } as any);
};

// 获取钱包、资产账单 mode 1资金  2资产
export const walletsBillListAPI = (params: any) => {
  return api.post('/auth/wallets/bill/index', params, { showLoading: true } as any);
};

// 账单类型  mode 1资金  2资产
export const walletsBillOptionListAPI = (params: any) => {
  return api.post('/auth/wallets/bill/options', params, { showLoading: true } as any);
};

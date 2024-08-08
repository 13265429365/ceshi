import { api } from 'boot/axios';


// 获取提现账户列表 mode 1资金体现账户  2资产提现账户
export const accountListAPI = (params:any) => {
  return api.post('/auth/wallets/account/index', params, { showLoading: true } as any);
};

// 获取提现账户信息
export const accountInfoAPI = (params:any) => {
  return api.post('/auth/wallets/account/info', params, { showLoading: true } as any);
};

// 添加提现账户
export const createAccountAPI = (params:any) => {
  return api.post('/auth/wallets/account/create', params, { showLoading: true } as any);
};

// 修改提现账户
export const updateAccountAPI = (params:any) => {
  return api.post('/auth/wallets/account/update', params, { showLoading: true } as any);
};

// 删除提现账户
export const deleteAccountAPI = (params: any) => {
  return api.post('/auth/wallets/account/delete', params, { showLoading: true } as any);
};

// 获取提现账户类型  mode 11资金  12资产
export const walletsPaymentListAPI = (params: any) => {
  return api.post('/auth/wallets/account/payment', params, { showLoading: true } as any);
};

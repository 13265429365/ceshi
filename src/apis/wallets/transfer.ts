import { api } from 'boot/axios';

// 资金转移（转账）
export const createTransferAPI = (params: any) => {
  return api.post('/auth/wallets/transfer/create', params, { showLoading: true } as any);
};

// 资金转移列表（转账）Type 1资金  11资产
export const transferListAPI = (params: any) => {
  return api.post('/auth/wallets/transfer/index', params, { showLoading: true } as any);
};

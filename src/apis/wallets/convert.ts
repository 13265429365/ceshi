import { api } from 'boot/axios';

// 资金转换
export const createConvertAPI = (params: any) => {
  return api.post('/auth/wallets/convert/create', params, { showLoading: true } as any);
};

// 获取资金转换列表
export const convertListAPI = (params: any) => {
  return api.post('/auth/wallets/convert/index', params, { showLoading: true } as any);
};

// 获取资金转换信息
export const convertInfoAPI = (params: any) => {
  return api.post('/auth/wallets/convert/info', params, { showLoading: true } as any);
};

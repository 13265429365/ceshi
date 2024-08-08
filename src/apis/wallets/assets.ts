import { api } from 'boot/axios';

// 获取钱包资产列表
export const walletsAssetsListAPI = () => {
  return api.post('/auth/wallets/assets/assets', {}, { showLoading: true } as any);
};

// 获取用户资产列表
export const userAssetsListAPI = () => {
  return api.post('/auth/wallets/assets/index', {}, { showLoading: true } as any);
};

// 获取用户资产详情
export const userAssetsDetailsAPI = (params: any) => {
  return api.post('/auth/wallets/assets/details', params, { showLoading: true } as any);
};

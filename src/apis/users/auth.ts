import { api } from 'boot/axios';

// 用户实名
export const createUserAuthAPI = (params: any) => {
  return api.post('/auth/users/auth/create', params, { showLoading: true } as any);
};

// 获取实名信息
export const userAuthInfoAPI = () => {
  return api.post('/auth/users/auth/info', {}, { showLoading: true } as any);
};

import { api } from 'boot/axios';

// 获取会员等级信息
export const levelListAPI = () => {
  return api.post('/auth/users/level/index', {}, { showLoading: true } as any);
};

// 购买会员等级
export const createLevelAPI = (params: any) => {
  return api.post('/auth/users/level/create', params, { showLoading: true } as any);
};

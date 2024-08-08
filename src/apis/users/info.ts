import { api } from 'boot/axios';

// 获取用户信息
export const userInfoAPI = () => {
  return api.post('/auth/users/info', {});
};

// 更改用户信息
export const updateUserInfoAPI = (params: any) => {
  return api.post('/auth/users/update', params, { showLoading: true } as any);
};

// 更改用户密码
export const updatePasswordAPI = (params: any) => {
  return api.post('/auth/users/update/password', params, { showLoading: true } as any);
};

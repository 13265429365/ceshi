import { api } from 'boot/axios';

// 我的团队
export const teamInfoAPI = () => {
  return api.post('/auth/users/team/index', {}, { showLoading: true } as any);
};

// 团队收益
export const teamDetailsAPI = () => {
  return api.post('/auth/users/team/details', {}, { showLoading: true } as any);
};

// 获取邀请码
export const userInviteAPI = () => {
  return api.post('/auth/users/invite', {}, { showLoading: true } as any);
};

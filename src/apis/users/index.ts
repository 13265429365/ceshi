import { api } from 'boot/axios';

// 创建验证码
export const createCaptchaAPI = () =>{
  return api.get('/captcha/create', { showLoading: true } as any )
}

// 用户登录
export const userLoginAPI = (params: any) => {
  return api.post('/login', params, { showLoading: true } as any);
};

// 用户注册
export const userRegisterAPI = (params: any) => {
  return api.post('/register', params, { showLoading: true } as any);
};

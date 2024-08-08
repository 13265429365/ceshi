import { api } from 'boot/axios';

// 获取主页信息
export const homeAPI = () =>{
  return api.post('/home', {}, { showLoading: true } as any )
}

// 获取底部信息
export const footerAPI = () =>{
  return api.post('/footer', {}, { showLoading: true } as any )
}

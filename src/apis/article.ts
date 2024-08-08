import { api } from 'boot/axios';

// 获取文章
export const articleDetailsAPI = (params:any) =>{
  return api.post('/article/details', params, { showLoading: true } as any )
}

// 获取文章列表
export const articleListAPI = () =>{
  return api.post('/article/index', {}, { showLoading: true } as any )
}

import { api } from 'boot/axios'

// 添加访问记录
export const userAccessAPI = (params:any) =>{
  return api.post('/access', params )
}

// 获取语言包
export const translateAPI = () =>{
  return api.post('/translate', {}, { showLoading: true } as any )
}

// 文件上传
export const uploadAPI = (params:any) =>{
  return api.post('/auth/upload', params, { showLoading: true } as any )
}

// 获取下载信息
export const downloadInfoAPI = () =>{
  return api.post('/download', {}, { showLoading: true } as any )
}

// 客服信息
export const onlineInfoAPI = () => {
  return api.post('/online', {}, { showLoading: true } as any )
}

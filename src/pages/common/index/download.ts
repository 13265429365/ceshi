import { downloadInfoAPI } from 'src/apis';
import QRCode from 'qrcode-svg-ts';
import { reactive, toRefs } from 'vue';
import { imageSrc } from 'src/utils';

export const downloadCommon = () => {
  const state = reactive({
    // 下载信息
    downloadInfo: { android: '', ios: '' } as any,

    // 下载二维码
    downloadImage: '' as any,
  })

  // 获取下载信息
  const downloadInfoFunc = ()=>{
    downloadInfoAPI().then((res: any) => {
      const qrCode = new QRCode({
        content: window.location.href,
        width: 130,
        height: 130,
        color: '#000000',
        background: '#ffffff',
        ecl: 'M',
      });
      state.downloadImage = qrCode.toDataURL()
      state.downloadInfo = res
    })
  }

  // 跳转下载链接
  const downloadFunc = (url: string) => {
    if (url == '') {
      return
    }
    window.location.href = imageSrc(url)
  }

  return {
    ...toRefs(state),
    downloadInfoFunc,
    downloadFunc,
  }
}

import { reactive, toRefs } from 'vue';
import { userInviteAPI } from 'src/apis/users/team';
import { copyToClipboard } from 'quasar';
import { Notifying } from 'src/utils/prompt';
import QRCode from 'qrcode-svg-ts';
import { useI18n } from 'vue-i18n';

export const inviteCommon = () => {
  const $i18n = useI18n()

  const state = reactive({
    // 邀请码
    inviteCode: '',

    // 邀请网址
    inviteUrl: '',

    // 邀请二维码
    inviteImage: '',
  })

  // 获取邀请码
  const userInviteFunc = (()=>{
    userInviteAPI().then((res: any) => {
      state.inviteCode = res.code
      state.inviteUrl = location.origin + `/register?code=${res.code}`
      const qrCode = new QRCode({
        content: state.inviteUrl,
        padding: 0,
        width: 175,
        height: 175,
        color: '#000000',
        background: '#ffffff',
        ecl: 'M',
      });
      state.inviteImage = qrCode.toDataURL()
    })
  })

  // 复制邀请链接
  const copyToClipboardFunc = () => {
    copyToClipboard(state.inviteUrl)
      .then(() => {
        Notifying('positive',$i18n.t('success'))
      })
  };

  return {
    ...toRefs(state),
    userInviteFunc,
    copyToClipboardFunc,
  }
}

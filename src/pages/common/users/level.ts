import { reactive, ref, toRefs } from 'vue';
import { createLevelAPI, levelListAPI } from 'src/apis/users/level';
import { userStore } from 'stores/user';

export const levelCommon = () => {
  const $userStore = userStore()

  // 确认购买弹窗
  const buyDialogRef = ref(null) as any

  const state = reactive({
    // 用户信息
    userInfo: { levelInfo: {} as any } as any,

    // 会员列表
    levelList: [ {} as any ] as any,

    // 当前选择会员
    currentLevel: {} as any
  })

  // 获取会员列表
  const levelListFunc = ()=>{
    levelListAPI().then((res: any) => {
      state.userInfo = $userStore.userInfo
      state.levelList = res
    })
  }

  // 购买会员
  const createLevelFunc = ()=>{
    createLevelAPI({ id: state.currentLevel.id }).then(()=>{
      state.userInfo.levelInfo.symbol = state.currentLevel.symbol
      state.userInfo.levelInfo.name = state.currentLevel.name
      $userStore.updateUserInfo(state.userInfo)
    })
  }

  return {
    buyDialogRef,
    ...toRefs(state),
    levelListFunc,
    createLevelFunc,
  }
}

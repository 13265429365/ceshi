import { reactive, toRefs } from 'vue';
import { homeAPI } from 'src/apis/home';

export const homeCommon = () => {
  const state = reactive({
    // 首页数据
    homeData: {
      banner: [] as any,
      introduce: '' as any,
      notice: '' as any,
    }
  })

  // 获取主页数据
  const homeFunc = ()=>{
    homeAPI().then((res: any) => {
      state.homeData = res
    })
  }

  return {
    ...toRefs(state),
    homeFunc,
  }
}

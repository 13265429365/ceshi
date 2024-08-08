import { reactive, toRefs } from 'vue';
import { articleDetailsAPI, articleListAPI } from 'src/apis/article';
import { useRouter } from 'vue-router';

export const articleCommon = () => {
  const $router = useRouter();

  const state = reactive({
    // 文章列表
    articleList: [] as any,

    // 文章详情
    details: {} as any,
  });

  // 获取文章列表
  const articleListFunc = () => {
    articleListAPI().then((res: any) => {
      state.articleList = res;
    });
  };

  // 获取文章详情
  const articleDetailsFunc = () => {
    articleDetailsAPI({ id: Number($router.currentRoute.value.query.id) }).then((res: any) => {
      state.details = res
    });
  };

  return {
    ...toRefs(state),
    articleListFunc,
    articleDetailsFunc,
  };
};

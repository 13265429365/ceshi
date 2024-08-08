import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from 'src/router/routes';
import { userStore } from 'stores/user';

export const RouterHomeIndexName = 'HomeIndex'
export const RouterLoginName = 'Login'
export const RouterRegisterName = 'Register'

// 获取本地文件路径文件
const componentPathList = Object.assign(
  import.meta.glob('src/layouts/**/*.vue'),
  import.meta.glob('src/pages/**/*.vue')
);

export default route(function() {
  const createHistory = process.env.SERVER ? createMemoryHistory :
    (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  });

  const $userStore = userStore()

  //  路由守卫
  Router.beforeEach((to, form, next) => {
    if((to.name === RouterLoginName || to.name === RouterRegisterName) && $userStore.userToken.length > 0) {
      // 已经登录跳转到首页
      next({name: RouterHomeIndexName});
    } else if(to.matched.some((record) => record.meta.requireAuth) && $userStore.userToken.length == 0) {
      // 需要验证到路由, 没有登录跳转到登录页面
      next({name: RouterLoginName})
    } else {
      // 进入页面
      next()
    }
  });
  return Router;
});

// meta类型定义
export interface MetaInterface {
  requireAuth: boolean,
  header: boolean,
  footer: boolean,
  drawerLeft: boolean,
  drawerRight: boolean,
}

// 重组电脑端路由
export const PagesDesktopPath = (template: string, path:any) => {
  return `/src/pages/${template}/desktop/${path}`
};

// 重组手机端路由
export const PagesMobilePath = (template: string, path:any) => {
  return `/src/pages/${template}/mobile/${path}`
};

// 动态加载路由
export const DynamicRouterList = async (router: any, platform: any, routerList: any) => {
  router.removeRoute('ErrorNotFound')
  await routerList.forEach((parent: any) => {
    // 添加layouts布局文件
    router.addRoute({
        path: parent.path,
        name: parent.name,
        component: componentPathList[parent.component],
        meta: parent.meta
      });

    // 添加pages页面
    if (parent.children && parent.children.length > 0) {
      parent.children.forEach((child: any) => {
        router.addRoute(parent.name, {
          path: child.path,
          name: child.name,
          component: componentPathList[
            platform.is.mobile ? child.mobile.component : child.desktop.component
          ],
          meta: platform.is.mobile ? child.mobile.meta : child.desktop.meta
        });
      });
    }
  })

  // 加入一个404 页面
  router.addRoute({path: '/:catchAll(.*)*', name: 'ErrorNotFound', component: () => import('pages/404.vue')})

  // 重置当前路由
  router.replace({path: router.currentRoute.value.path, query: router.currentRoute.value.query});
}

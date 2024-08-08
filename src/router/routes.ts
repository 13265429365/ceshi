import { RouteRecordRaw } from 'vue-router';
import { DefaultTemplateName, defaultRouter } from 'src/router/defaultRouter';

export const routerList = new Map([
  [DefaultTemplateName, defaultRouter],
])

const routes: RouteRecordRaw[] = [
  {
    path: '/:catchAll(.*)*',
    name: 'ErrorNotFound',
    component: () => import('pages/index.vue')
  }, {
    path: '/errors',
    name: 'NetworkError',
    component: () => import('pages/errors.vue')
  }
];


export default routes;

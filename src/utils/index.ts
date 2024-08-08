import { initStore } from 'stores/init';

export const imageSrc = (url: string) => {
  const $initStore = initStore() as any;

  // 默认值
  if (url == '' || url == undefined)
    url = $initStore.config.logo == '' ? '/logo.png' : $initStore.config.logo;

  return new URL(<string>process.env.baseURL).origin + url;
};

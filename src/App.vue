<template>
  <router-view />
</template>

<script setup lang="ts">
import { Cookies, Loading, LocalStorage, Platform, useMeta } from 'quasar';
import { initStore } from 'stores/init';
import { userStore, userTokenKey, userLangKey, userInfoKey } from 'stores/user';
import { imageSrc } from 'src/utils';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { routerList } from 'src/router/routes';
import { DynamicRouterList } from 'src/router';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { setLanguageFunc } from 'src/boot/i18n';
import { userAccessAPI } from 'src/apis';

defineOptions({
  name: 'App',
  preFetch({store, ssrContext}) {
    Loading.show()
    const $initStore = initStore(store);
    const $userStore = userStore(store);
    const $cookies = Cookies.parseSSR(ssrContext);
    $userStore.userToken = $cookies.get(userTokenKey) ?? ''
    $userStore.userLang = $cookies.get(userLangKey) ?? '';
    return new Promise(resolve => {
      axios({
        method: 'get',
        url: process.env.baseURL + '/init',
        headers: {
          'lang': $userStore.userLang,
          'origin': 'http://'+ssrContext?.req.get('host')
        }
      }).then((res:any) => {
        const respData = res.data.data

        // 初始化数据
        $initStore.domainStatus = ''
        $initStore.config = respData.config
        $initStore.setting = respData.setting
        $initStore.countryList = respData.countryList
        $initStore.langList = respData.langList
        $initStore.translate = respData.translate
        $initStore.menuList = respData.menuList

        // 如果没有设置语言, 那么获取语言列表中第一个
        if ($userStore.userLang == '') {
          $userStore.userLang = respData.langList[0].symbol
        }
        resolve(true)
      }).catch((err: any) => {
        $initStore.domainStatus = err.hasOwnProperty('response') ? err.response.data : err.message
        resolve(false)
      })
      // axios.get(process.env.baseURL + `/init?domain=${ssrContext?.req.get('host')}&lang=${$userStore.userLang}`, {}).then((res: any) => {
      //   const respData = res.data.data
      //
      //   // 初始化数据
      //   $initStore.domainStatus = ''
      //   $initStore.config = respData.config
      //   $initStore.setting = respData.setting
      //   $initStore.countryList = respData.countryList
      //   $initStore.langList = respData.langList
      //   $initStore.translate = respData.translate
      //   $initStore.menuList = respData.menuList
      //
      //   // 如果没有设置语言, 那么获取语言列表中第一个
      //   if ($userStore.userLang == '') {
      //     $userStore.userLang = respData.langList[0].symbol
      //   }
      //   resolve(true)
      // }).catch((err: any) => {
      //   $initStore.domainStatus = err.hasOwnProperty('response') ? err.response.data : 'Network Error'
      //   resolve(false)
      // })
    }).then(() => {
      Loading.hide()
    })
  }
});

const $initStore = initStore();
const $router = useRouter()
const $userStore = userStore()
const $i18n = useI18n()

onMounted(async () => {
  if ($initStore.domainStatus != '') {
    void $router.push({name: 'NetworkError'})
    return
  }

  // 如果cookie 存在token 那么使用当前token
  const cookieUserToken = Cookies.get(userTokenKey)
  const cookieUserLang = Cookies.get(userLangKey)
  if (cookieUserToken) {
    $userStore.userToken = cookieUserToken
  }
  if (cookieUserLang) {
    $userStore.userLang = cookieUserLang
  }

  // 获取当前用户信息
  $userStore.userInfo = LocalStorage.getItem(userInfoKey) ? JSON.parse(<string>LocalStorage.getItem(userInfoKey)) : {}

  // 翻译当前语言
  setLanguageFunc($i18n, $initStore.translate, $userStore.userLang)

  // 动态加载路由
  const currentRouterList = routerList.get($initStore.config.template)
  await DynamicRouterList($router, Platform, currentRouterList)

  // 访问记录
  userAccessAPI({name: 'init', type: 1}).catch(()=>{})
})


// 设置客户端Meta信息
const metaData = {
  title: $initStore.config.name,
  meta: {
    description: {
      name: 'description',
      content: $initStore.config.name
    }
  },
  link: {
    material: {
      rel: 'icon',
      href: imageSrc($initStore.config.logo),
      type: 'image/png'
    }
  }
};

if ($initStore.domainStatus == '') {
  useMeta(() => {
    return metaData;
  });
}
</script>

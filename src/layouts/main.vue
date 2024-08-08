<template>
  <!--  电脑端布局  -->
  <q-layout v-if="$q.platform.is.desktop" view="hHh lpr fff">
    <desktopHeader :key="$route.fullPath"></desktopHeader>

    <desktopDrawerLeft v-if="$route.meta.hasOwnProperty('drawerLeft')&&$route.meta.drawerLeft"></desktopDrawerLeft>
    <desktopDrawerRight
      v-if="$route.meta.hasOwnProperty('drawerRight')&&$route.meta.drawerRight"></desktopDrawerRight>
    <q-page-container>
      <router-view :key="$route.fullPath" style="min-height: 1000px"></router-view>
    </q-page-container>

    <desktopFooter></desktopFooter>
  </q-layout>

  <!--  手机端布局  -->
  <q-layout v-if="$q.platform.is.mobile" view="hHh lpr fff">
    <mobileHeader v-if="$route.meta.hasOwnProperty('header')&&$route.meta.header" :content="content"></mobileHeader>

    <mobileDrawerLeft v-if="$route.meta.hasOwnProperty('drawerLeft')&&$route.meta.drawerLeft"></mobileDrawerLeft>
    <mobileDrawerRight v-if="$route.meta.hasOwnProperty('drawerRight')&&$route.meta.drawerRight"></mobileDrawerRight>
    <q-page-container>
      <router-view @update="update" :key="$route.fullPath"></router-view>
    </q-page-container>

    <mobileFooter v-if="$route.meta.hasOwnProperty('footer')&&$route.meta.footer"></mobileFooter>
  </q-layout>
</template>

<script setup lang="ts">
// 电脑
import desktopHeader from 'src/layouts/desktop/header.vue';
import desktopFooter from 'src/layouts/desktop/footer.vue';
import desktopDrawerLeft from 'src/layouts/desktop/drawer-left.vue';
import desktopDrawerRight from 'src/layouts/desktop/drawer-right.vue';
// 手机
import mobileHeader from 'src/layouts/mobile/header.vue';
import mobileFooter from 'src/layouts/mobile/footer.vue';
import mobileDrawerLeft from 'src/layouts/mobile/drawer-left.vue';
import mobileDrawerRight from 'src/layouts/mobile/drawer-right.vue';
import { ref } from 'vue';

const content = ref({
  left: {
    callback: () => {
    },
    icon: 'arrow_back'
  },
  title: '',
  right: {
    callback: () => {
    },
    icon: ''
  }
});

const update = (contentValue: any) => {
  Object.assign(content.value, contentValue);
};

defineOptions({
  name: 'MainLayout'
});
</script>

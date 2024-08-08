<template>
  <q-page>
    <div>home</div>

    <!-- 客服 -->
    <onlineComponents v-if="$initStore.setting.home.showOnline"></onlineComponents>

    <!-- 公告 -->
    <noticeComponents :content="homeData.notice"></noticeComponents>
  </q-page>
</template>

<script setup lang="ts">
import { homeCommon } from 'pages/common/index/home';
import onlineComponents from 'components/online.vue'
import noticeComponents from 'components/notice.vue'
import { initStore } from 'stores/init';
import { onMounted } from 'vue';

const $initStore = initStore()
const { homeData, homeFunc } = homeCommon();

onMounted(()=>{
  // 获取主页数据
  homeFunc()
})

defineOptions({
  name: 'HomeIndex'
});
</script>

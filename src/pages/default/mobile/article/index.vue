<template>
  <div class="q-pa-lg">
    <div class="text-h5 text-weight-bold text-center q-mb-lg">{{ details.name }}</div>
    <div v-html="details.Content"></div>
  </div>
</template>

<script setup lang="ts">
import { articleCommon } from 'pages/common/index/article';
import { onMounted, watch } from 'vue';
import { userStore } from 'stores/user';

const $userStore = userStore()
const { details, articleDetailsFunc } = articleCommon()

// 切换语言更新文章详情
watch($userStore, () => {
  articleDetailsFunc();
});

onMounted(()=>{
  // 获取文章详情
  articleDetailsFunc()
})

defineOptions({
  name: 'ArticleIndex'
});
</script>




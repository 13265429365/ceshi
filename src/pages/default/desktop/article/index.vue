<template>
  <div style="padding: 80px 108px">
    <div class="text-h5 text-weight-bold text-center q-mb-lg">{{ details.name }}</div>
    <div v-html="details.content"></div>
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




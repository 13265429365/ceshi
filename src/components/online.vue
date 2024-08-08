<template>
  <div>
    <div @click="hrefOnlineFunc">
      <q-avatar size="48px" class="fixed-bottom-right q-mr-lg cursor-pointer shadow-1 z-top" style="bottom: 80px">
        <img :src="imageSrc(onlineInfo.icon)" alt="">
      </q-avatar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onlineInfoAPI } from 'src/apis';
import { imageSrc } from 'src/utils';
import { onMounted, ref } from 'vue';

// 客服信息
const onlineInfo = ref({ icon: '', link: '' })

onMounted(() => {
  onlineInfoFunc()
})

// 获取客服信息
const onlineInfoFunc = () => {
  onlineInfoAPI().then((res: any) => {
    onlineInfo.value = res
  })
}

// 跳转客服地址
const hrefOnlineFunc = () => {
  window.location.href = onlineInfo.value.link
}

defineOptions({
  name: 'OnlineChat'
})
</script>


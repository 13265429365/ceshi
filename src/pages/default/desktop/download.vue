<template>
  <div>
    <div style="padding: 80px 0 260px">
      <div class="row justify-center items-center">
        <div class="col text-right">
          <q-img no-spinner class="q-mr-xl" width="300px" src="/src/assets/default/download-bg.svg"></q-img>
        </div>
        <div class="col-1"></div>
        <div class="col">
          <div class="text-h3 text-bold">{{ $initStore.config.name }}</div>
          <div class="text-h6 text-grey q-mt-sm">{{ $t('downloadSmall') }}</div>

          <div class="row no-wrap" style="margin-top: 60px">
            <div>
              <div class="text-body1 text-bold q-mb-xs">IOS</div>
              <img style="width: 150px;" class="cursor-pointer" src="/src/assets/default/ios.svg" alt=""
                @click="downloadFunc(downloadInfo.ios)">
              <div class="text-body1 text-bold q-mt-lg q-mb-xs">Android</div>
              <img style="width: 150px;" class="cursor-pointer" src="/src/assets/default/android.svg" alt=""
                @click="downloadFunc(downloadInfo.android)">
            </div>
            <div class="q-ml-xl row items-end">
              <div class="q-pa-lg rounded-borders" style="border: 1px solid rgba(0,20,42,0.12)">
                <img :src="downloadImage" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { downloadCommon } from 'pages/common/index/download';
import { initStore } from 'stores/init';
import { onMounted } from 'vue';

const $initStore = initStore()
const { downloadInfo, downloadImage, downloadFunc, downloadInfoFunc } = downloadCommon()

onMounted(()=>{
  // 获取下载信息
  downloadInfoFunc()
})

defineOptions({
  name: 'DownloadIndex'
})
</script>

<template>
  <div class="column bg-white window-height">
    <div class="col">
      <div class="column justify-between items-center">
        <div class="q-mt-xl" style="width: 80px;height: 80px;border-radius: 15px;">
          <q-avatar size="88px" class="bg-grey-2">
            <q-img no-spinner class="self-center" :src="imageSrc($initStore.config.logo)" width="56px" height="56px" />
          </q-avatar>
        </div>
        <div class="text-h6 text-weight-bold q-mt-lg">{{ $initStore.config.name }}</div>
        <div class="q-mt-xl full-width">
          <div class="row no-wrap justify-center">
            <img style="width: 120px;" class="cursor-pointer q-mx-sm" src="/src/assets/default/ios.svg" alt=""
                 @click="downloadFunc(downloadInfo.ios)">
            <img style="width: 120px;" class="cursor-pointer q-mx-sm" src="/src/assets/default/android.svg" alt=""
                 @click="downloadFunc(downloadInfo.android)">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { downloadCommon } from 'pages/common/index/download';
import { imageSrc } from 'src/utils';
import { initStore } from 'stores/init';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const $initStore = initStore()
const { downloadInfo, downloadFunc, downloadInfoFunc } = downloadCommon()

onMounted(()=>{
  // 获取下载信息
  downloadInfoFunc()
})

const $i18n = useI18n()
const emit = defineEmits(['update'])
emit('update', {
  title: $i18n.t('download'),
  right: {
    callback: () => {},
    icon: ''
  },
})

defineOptions({
  name: 'DownloadIndex'
})
</script>

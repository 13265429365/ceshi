<template>
  <q-uploader ref="" flat @added="upload" :url="baseURL + '/upload'" :field-name="name"
              :style="uploaderStyle" :accept="accept"
              style="width: 100%;background: transparent;" :multiple="false" @start="uploaderStartFunc"
              @finish="uploaderFinishFunc" @rejected="uploaderRejectedFunc">
    <template v-slot:header></template>
    <template v-slot:list="scope">
      <div @click="scope.pickFiles">
        <div v-if="!$slots.default" class="text-center">
          <q-uploader-add-trigger />
          <img :src="imageSrc(respValue)" alt="">
        </div>
        <slot name="default"></slot>
      </div>
    </template>
  </q-uploader>
</template>

<script setup lang="ts">

defineOptions({
  name: 'uploaderIndex'
});
import { ref } from 'vue';
import { imageSrc } from 'src/utils';
import { Loading, QSpinnerBars } from 'quasar';
import { Notifying } from 'src/utils/prompt';
import { useI18n } from 'vue-i18n';
import * as Compressor from 'compressorjs';
import { uploadAPI } from 'src/apis';

const props = defineProps({
  name: { type: String, default: 'file' },// 上传名称
  respValue: { type: String, default: '' },// 图片路径
  uploaderStyle: { type: Object, default: null },// uploader 自定义样式
  accept: { type: String, default: '.jpg,.png,.gif,image/*' }// 上传文件的类型
});
const uploaderRef = ref(null) as any;
const $i18n = useI18n();
const baseURL = process.env.baseURL;
const emit = defineEmits(['uploaded']);
const respValue = ref(props.respValue);

const upload = (e: any) => {
  const file = e[0];
  if (!file) {
    return;
  }
  new Compressor.default(file, {
    quality: 0.1,
    success(result: any) {
      const formData = new FormData();
      formData.append('file', result, result.name);
      uploadAPI(formData).then((res: any) => {
        respValue.value = res[0];
        emit('uploaded', respValue.value);
      });
    }
  });
};

// 打开选择器
const uploaderPickFiles = () => {
  uploaderRef.value.pickFiles();
};

// 开始上传
const uploaderStartFunc = () => {
  Loading.show({
    spinner: QSpinnerBars,
    spinnerColor: 'secondary',
    spinnerSize: 50,
    message: 'Some important process is in progress. Hang on...'
  });
};

// 上传完成
const uploaderFinishFunc = () => {
  Loading.hide();
};

// 检查格式是否正确
const uploaderRejectedFunc = () => {
  Notifying('negative',$i18n.t('refuse'));
};

defineExpose({
  upload,
  uploaderPickFiles
});

</script>

<style scoped lang="scss"></style>

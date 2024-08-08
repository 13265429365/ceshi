<template>
  <q-dialog v-model="isVisible" @hide="hideFunc">
    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="text-h6">
          <slot name="title">{{ title }}</slot>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none q-pb-md">
        <slot>
          {{ message }}
        </slot>
      </q-card-section>

      <q-card-actions align="right">
        <slot name="btn">
          <q-btn flat :label="$t('cancel')" color="negative" @click="cancelFunc" />
          <q-btn flat :label="$t('confirm')" color="primary" @click="confirmFunc" />
        </slot>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
    required: true,
  },
  message: {
    type: String,
    default: ''
  },
  onCancelCallback: {
    type: Function,
    default: () => {}
  },
  onConfirmCallback: {
    type: Function,
    default: () => {}
  }
});

const isVisible = ref(false) as any;

// 点击取消
const cancelFunc = () => {
  props.onCancelCallback();
  isVisible.value = false;
};

// 点击确认
const confirmFunc = () => {
  props.onConfirmCallback();
  isVisible.value = false;
};

// 关闭弹窗
const hideFunc = () => {
  isVisible.value = false
};

// 打开弹窗
const openFunc = () => {
  isVisible.value = true
};

defineExpose({
  openFunc, hideFunc
})

defineOptions({
  name: 'GlobalDialog'
});
</script>

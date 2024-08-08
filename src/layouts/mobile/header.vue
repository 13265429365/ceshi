<template>
  <q-header bordered class="bg-white">
    <q-toolbar class="relative-position justify-between text-black">
      <q-btn @click="$router.back()" color="grey-7" dense flat round :icon="content.left.icon" />
      <q-toolbar-title class="absolute-center text-center text-body2 q-pa-none">
        {{ content.title }}
      </q-toolbar-title>
      <q-btn v-if="content.right.icon" @click="content.right.callback()" color="grey-7" dense flat round :icon="content.right.icon" />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
defineProps({
  content: {
    left: {
      callback: () => {
      },
      icon: 'arrow_back'
    } as any,
    title: '',
    right: {
      callback: () => {
      },
      icon: ''
    } as any
  }
});

defineOptions({
  name: 'HeaderLayouts'
});
</script>

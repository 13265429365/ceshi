<template>
  <div class="noData">
    <slot>
      <div class="full-width column items-center justify-center q-my-xl">
        <q-img width="100px" height="80px" src="/src/assets/default/no-data.png" no-spinner alt="" />
        <div class="text-accent">
          {{ $t('noData') }}
        </div>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">

defineOptions({
  name: 'noDataIndex'
});
</script>


<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        500
      </div>

      <div class="text-h2" style="opacity:.4">
        {{ $initStore.domainStatus }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { initStore } from 'stores/init';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const $initStore = initStore()
const $router = useRouter()
defineOptions({
  name: 'ServerError'
});

onMounted(() => {
  if ($initStore.domainStatus == undefined || $initStore.domainStatus == '') {
    setTimeout(() => {
      void $router.push('/')
    }, 100)
  }
})

</script>

<template>
  <q-footer>
    <div style="padding: 30px" class="text-white column items-center">
      <div class="row full-width" style="max-width: 1200px; padding: 60px 0">
        <div class="col-10">
          <div class="row justify-center">
            <div v-for="(footer, footerIndex) in footerList" :key="footerIndex"
                 style="min-width: 160px;" class="col-3">
              <div v-text="$t(footer.label)" class="text-body1 text-bold text-grey-2 q-mb-md"></div>
              <div v-for="item in footer.items" :key="item" class="row" @click="item.link != '' ? externalLink(item.link) : $router.push({ name: 'ArticleIndex', query: { id: item.id } })">
                <div v-if="item.Image != ''" class="q-mr-sm">
                  <img :src="imageSrc(item.image)" alt="" width="16" height="16">
                </div>
                <div v-text="$t(item.name)" class="text-body2 q-mb-sm col"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-2">
          <div v-text="$t(socialInfo.label)" class="text-body1 text-bold text-grey-2 q-mb-md"></div>
          <div class="row items-center q-gutter-xs justify-start">
            <div v-for="(item, itemIndex) in socialInfo.items" :key="itemIndex">
              <q-avatar size="36px" @click="externalLink(item.link)" class="cursor-pointer">
                <q-img no-spinner :src="imageSrc(item.image)" width="36px" height="36px"></q-img>
              </q-avatar>
            </div>
          </div>
        </div>
      </div>

      <div class="q-mt-xl text-center">
        <div>
          {{ $initStore.config.name }}
          <q-icon name="copyright" size="xs"></q-icon>
          <span>2023</span>
          <span>Cookie settings</span>
        </div>
      </div>
    </div>
  </q-footer>
</template>

<script setup lang="ts">
import { footerAPI } from 'src/apis/home';
import { initStore } from 'stores/init';
import { onMounted, ref } from 'vue';
import {imageSrc} from 'src/utils';

const $initStore = initStore();
const footerList = ref([]) as any
const socialInfo = ref({label: '', items: [] as any}) as any

onMounted(() => {
  footerAPI().then((res: any) => {
    footerList.value = res.slice(0, -1)
    socialInfo.value = res.slice(-1)[0]
  });
})

const externalLink = (link: string) => {
  window.location.href = link
}

defineOptions({
  name: 'FooterLayouts'
});
</script>

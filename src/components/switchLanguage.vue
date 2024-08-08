<template>
  <q-menu>
    <q-list class="q-ma-sm">
      <q-item @click="switchLang(lang)" :active="$userStore.userLang == lang.symbol" class="rounded-borders"
              v-for="(lang, langIndex) in $initStore.langList" :key="langIndex" clickable v-close-popup aria-hidden="true">
        <q-item-section avatar>
          <q-img no-spinner width="24px" height="24px" :src="imageSrc(lang.icon)" />
        </q-item-section>
        <q-item-section>{{ lang.name }}</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script setup lang="ts">
import { imageSrc } from 'src/utils';
import { initStore } from 'src/stores/init';
import { userStore } from 'src/stores/user';
import { translateAPI } from 'src/apis';
import { setLanguageFunc } from 'src/boot/i18n';
import { useI18n } from 'vue-i18n';

const $initStore = initStore()
const $userStore = userStore()
const $i18n = useI18n()

const switchLang = async (lang: any) => {
  $userStore.updateLang(lang.symbol)
  translateAPI().then((res:any)=>{
    $initStore.updateTranslate(res)
    setLanguageFunc($i18n, res, lang.symbol);
  })
}
</script>

<style lang="scss" scoped></style>

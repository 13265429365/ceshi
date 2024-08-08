<template>
  <div>
    <q-list separator>
      <q-item v-for="(lang, langIndex) in $initStore.langList" clickable :key="langIndex" @click="switchLang(lang)">
        <q-item-section avatar>
          <q-avatar>
            <q-img no-spinner :src="imageSrc(lang.icon)"></q-img>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <div v-text="lang.name"></div>
        </q-item-section>
        <q-item-section side>
          <q-checkbox v-model="lang.symbol" v-if="lang.symbol == $userStore.userLang" :true-value="$userStore.userLang"
                      checked-icon="task_alt" unchecked-icon="highlight_off"></q-checkbox>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { initStore } from 'stores/init';
import { imageSrc } from 'src/utils';
import { userStore } from 'stores/user';
import { setLanguageFunc } from 'src/boot/i18n';
import { useI18n } from 'vue-i18n';
import { translateAPI } from 'src/apis';

const $initStore = initStore();
const $userStore = userStore();
const $i18n = useI18n();

const switchLang = (lang: any) => {
  $userStore.updateLang(lang.symbol);
  translateAPI().then((res: any) => {
    setLanguageFunc($i18n, res, lang.symbol);
  });
};

const emit = defineEmits(['update'])
emit('update', {
  title: $i18n.t('switchLang'),
  right: {
    callback: () => {},
    icon: ''
  },
})

defineOptions({
  name: 'HomeLang'
});
</script>

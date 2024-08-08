<template>
  <div>
    <q-list class="q-mb-md">
      <div v-for="(item, i) in settingList" :key="i" class="bg-white">
        <q-item @click="$router.push(item.route)" class="q-pa-md" clickable>
          <q-item-section avatar style="padding-right: 11px;min-width: 0;">
            <q-img no-spinner width="20px" height="20px" :src="item.icon"></q-img>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold">{{ $t(item.name) }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="row no-wrap items-center">
              <div v-if="item.version">{{ item.version }}</div>
              <q-toggle v-if="item.toggle" size="sm" v-model="toggle" val="lg" />
              <q-icon v-else name="chevron_right" size="20px" />
            </div>
          </q-item-section>
        </q-item>
        <q-separator style="background: #F4F5FD;" inset />
      </div>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const toggle = ref(false) as any
const settingList = [
  {
    name: 'userSettings',
    icon: '/src/assets/default/icons/username.png',
    route: '/users/setting'
  }, {
    name: 'updatePassword',
    icon: '/src/assets/default/icons/password.png',
    route: '/users/setting/update/password',
  },{
    name: 'updateSecretKey',
    icon: '/src/assets/default/icons/key.png',
    route: '/users/setting/update/secret'
  },{
    name: 'switchLang',
    icon: '/src/assets/default/icons/language.png',
    route: '/lang'
  }, {
    name: 'version',
    icon: '/src/assets/default/icons/version.png',
    version: 'v2.23.0',
    route: ''
  }, {
    name: 'notice',
    icon: '/src/assets/default/icons/notice.png',
    toggle: true,
    route: ''
  },
] as any

const $i18n = useI18n()
const emit = defineEmits(['update'])
emit('update', {
  title: $i18n.t('settings'),
  right: {
    callback: () => {},
    icon: ''
  },
})

defineOptions({
  name: 'SettingsIndex'
})
</script>

<style scoped></style>

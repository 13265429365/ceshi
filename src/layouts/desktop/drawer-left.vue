<template>
  <q-drawer show-if-above side="left" bordered>
    <div class="q-ml-xl q-mt-xl q-mr-md" style="min-width: 220px;width: 220px">
      <template v-for="setting in $initStore.menuList.setting" :key="setting">
        <q-expansion-item :header-style="{ borderRadius: '4px' }" default-opened dense>
          <template v-slot:header>
            <q-item class="rounded-borders full-width">
              <q-item-section avatar style="min-width: 0;" v-if="setting.icon != ''">
                <q-img no-spinner :src="imageSrc(setting.icon)" width="24px" height="24px"></q-img>
              </q-item-section>
              <q-item-section>
                <div>{{ $t(setting.name) }}</div>
              </q-item-section>
            </q-item>
          </template>

          <q-list>
            <q-item class="rounded-borders" :to="children.route" v-for="(children, childrenIndex) in setting.children" :key="childrenIndex">
              <q-item-section avatar style="min-width: 0;margin-left: 24px">
                <q-img no-spinner v-if="children.icon != ''" :src="imageSrc(children.icon)" width="24px" height="24px"></q-img>
              </q-item-section>
              <q-item-section>
                <div>{{ $t(children.name) }}</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </template>
    </div>
  </q-drawer>
</template>

<script setup lang="ts">
defineOptions({
  name: 'drawerLeftLayouts'
});
import { imageSrc } from 'src/utils';
import { initStore } from 'stores/init';

const $initStore = initStore()
</script>

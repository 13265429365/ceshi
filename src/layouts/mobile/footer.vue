<template>
  <q-footer reveal bordered class="bg-white text-black text-caption">
    <q-tabs v-model="currentTab" dense indicator-color="transparent" active-color="primary">
      <template v-for="navigation in $initStore.menuList.navigation" :key="navigation">
        <q-route-tab  :name="navigation.route" v-if="navigation.isMobile == 1"
                      :icon="'img:' + imageSrc(navigation.route == currentTab ? navigation.activeIcon : navigation.icon)" :ripple="false" :to="navigation.route">
          <template v-slot:default>
            <div class="text-caption">{{ $t(navigation.name) }}</div>
          </template>
        </q-route-tab>
      </template>
    </q-tabs>
  </q-footer>
</template>

<script setup lang="ts">
defineOptions({
  name: 'FooterLayouts'
});
import { imageSrc } from 'src/utils';
import { useRouter } from 'vue-router';
import { initStore } from 'src/stores/init';
import { onMounted, ref } from 'vue';

const $initStore = initStore()
const $router = useRouter()
const currentTab = ref('/');
onMounted(() => {
  currentTab.value = $router.currentRoute.value.path;
});
</script>

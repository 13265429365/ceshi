<template>
  <div class="q-pa-xl">
    <q-list bordered class="rounded-borders q-pa-md q-mt-lg">
      <div class="row no-wrap justify-end items-center q-mb-lg">
        <q-btn class="bg-grey-1 text-grey" no-caps unelevated rounded>
          {{ params.createdAt ? params.createdAt.from : '' }}
          -
          {{ params.createdAt ? params.createdAt.to : '' }}
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="params.createdAt" @update:model-value="convertListFunc" range></q-date>
          </q-popup-proxy>
        </q-btn>
      </div>

      <paging ref="pagination" :params="params" :request="convertListAPI">
        <template v-slot:default="data">
          <!-- 钱包订单 -->
          <div v-for="(convert, convertIndex) in data.itemList" :key="convertIndex">
            <q-expansion-item hide-expand-icon
                              :header-style="{ borderRadius: '4px', height: '68px', lineHeight: '54px' }">
              <template v-slot:header>
                <q-item-section>
                  <div class="col">
                    {{ date.formatDate(convert.createdAt, 'YYYY/MM/DD HH:mm:SS') }}
                  </div>
                </q-item-section>
                <q-item-section>
                  <div class="text-center">
                    <span>-{{ convert.assetsInfo.id == 0 ? $t('currency') : ''
                      }}</span>{{ Number(convert.money).toFixed(2) }}
                    {{ convert.assetsInfo.name != '' ? convert.assetsInfo.name : '' }}
                  </div>
                </q-item-section>
                <q-item-section>
                  <div class="text-center">
                    <q-icon class="q-mx-md" size="20px" color="blue" name="arrow_right_alt"></q-icon>
                  </div>
                </q-item-section>
                <q-item-section>
                  <div class="text-green text-bold text-right">
                    <span>+{{ convert.toAssetsInfo.id == 0 ? $t('currency') : ''
                      }}</span>{{ Number(convert.nums).toFixed(2) }}
                    {{ convert.toAssetsInfo.name != '' ? convert.toAssetsInfo.name : '' }}
                  </div>
                </q-item-section>
              </template>
              <div v-if="convert.status == -1" class="text-red text-caption q-pa-md bg-grey-1">
                {{ convert.data }}
              </div>
            </q-expansion-item>
            <q-separator />
          </div>
        </template>
      </paging>
    </q-list>
  </div>

</template>

<script setup lang="ts">
import { convertCommon } from 'pages/common/wallets/convert';
import paging from 'src/components/dsektop/pagination.vue';
import { date } from 'quasar';
import { onMounted } from 'vue';
import { convertListAPI } from 'src/apis/wallets/convert';

const { params, pagination } = convertCommon();

onMounted(() => {
  // 获取转换列表
  convertListFunc();
});

const convertListFunc = ()=>{
  params.value.pagination.page = 1;
  pagination.value?.initData()
}

defineOptions({
  name: 'WalletsConvertRecord'
});
</script>

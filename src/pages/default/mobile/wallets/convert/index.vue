<template>
  <div>
    <infinite ref="pagination" :params="params" @updatePage="updatePage" :request="convertListAPI"
              :height="$q.screen.height + 30" class="q-pa-md bg-grey-2">
      <template v-slot:default="data">
        <q-item
          v-for="(convert, convertIndex) in data.itemList"
          :key="convertIndex"
          class="bg-white rounded-borders q-mb-sm q-py-md"
        >
          <div class="full-width">
            <div>
              <div class="row items-center text-body1 text-weight-medium justify-between">
                <div class="col">
                  {{ Number(convert.money).toFixed(2) }}
                  {{ convert.assetsInfo.name != '' ? convert.assetsInfo.name : $t('balance') }}
                </div>
                <q-icon class="q-mx-md" size="20px" color="blue" name="arrow_right_alt"></q-icon>
                <div class="col text-right text-green">
                  {{ Number(convert.nums).toFixed(4) }}
                  {{ convert.toAssetsInfo.name != '' ? convert.toAssetsInfo.name : $t('balance') }}
                </div>
              </div>
              <div class="text-grey q-mt-sm text-right text-caption">
                {{ date.formatDate(convert.createdAt, 'YYYY-MM-DD HH:mm:ss') }}
              </div>
            </div>
          </div>
        </q-item>
        <noData v-if="data.itemList.length<=0"></noData>
      </template>
    </infinite>

    <q-drawer v-model="filterStatus" side="right" bordered>
      <!-- drawer content -->
      <q-card flat class="column justify-between full-width">

        <q-card-section>
          <!-- 时间范围 -->
          <div class="text-weight-medium q-mb-sm q-mt-xl">{{ $t('betweenTime') }}</div>
          <div class="row no-wrap justify-between items-center">
            <q-btn class="bg-grey-1 rounded-borders col-5" unelevated no-caps
                   style="border: 1px solid #DDDDDD;height: 32px;">
              <div class="row items-center">
                <div class="q-mr-xs text-caption">{{ params.createdAt ? params.createdAt.from : '' }}</div>
              </div>
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="params.createdAt.from"></q-date>
              </q-popup-proxy>
            </q-btn>

            <q-separator style="width: 11px;" />
            <q-btn class="bg-grey-1 rounded-borders col-5" unelevated no-caps rounded
                   style="border: 1px solid #DDDDDD;height: 32px;">
              <div class="row items-center">
                <div class="q-mr-xs text-caption">{{ params.createdAt ? params.createdAt.to : '' }}</div>
              </div>
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="params.createdAt.to"></q-date>
              </q-popup-proxy>
            </q-btn>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-x-md justify-between no-wrap">
            <div class="col-6">
              <q-btn @click="filterStatus = false" unelevated rounded no-caps
                     style="height: 44px;" class="bg-grey-2 full-width" :label="$t('cancel')" />
            </div>
            <div class="col-6">
              <q-btn @click="convertListFunc() ;filterStatus = false" unelevated rounded no-caps
                     style="height: 44px;" class="full-width"
                     color="primary" :label="$t('confirm')" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-drawer>
  </div>
</template>

<script setup lang="ts">
import { convertCommon } from 'pages/common/wallets/convert';
import infinite from 'components/mobile/infinite.vue';
import noData from 'components/noData.vue';
import { date } from 'quasar';
import { onMounted, ref } from 'vue';
import { convertListAPI } from 'src/apis/wallets/convert';
import { useI18n } from 'vue-i18n';

// 资金转换类型弹窗
const filterStatus = ref(false) as any;

// 资金转换模块
const { params, pagination } = convertCommon();

onMounted(() => {
  // 获取转换列表
  convertListFunc();
});

// 获取转换列表
const convertListFunc = () => {
  pagination.value?.initData();
};

// 设置页数
const updatePage = (page: any) => {
  params.value.pagination.page = Number(page);
};

const $i18n = useI18n()
const emit = defineEmits(['update'])
emit('update', {
  title: $i18n.t('convertRecord'),
  right: {
    callback: () => {
      filterStatus.value = true
    },
    icon: 'view_headline'
  },
})

defineOptions({
  name: 'WalletsConvertRecord'
});
</script>

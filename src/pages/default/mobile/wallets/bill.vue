<template>
  <!-- 钱包订单 -->
  <infinite ref="pagination" :params="params" @updatePage="updatePage" :request="walletsBillListAPI"
            :height="$q.screen.height + 30" class="q-pa-md bg-grey-2">
    <template v-slot:default="data">
      <q-item
        v-for="(bill, billIndex) in data.itemList"
        :key="billIndex"
        class="bg-white rounded-borders q-mb-sm q-py-md"
      >
        <div class="row justify-between full-width">
          <div>
            <div class="text-body1 text-weight-medium">
              {{ ($t(bill.name)) }} {{ bill.AssetsInfo.name }}
            </div>
            <div class="text-grey">{{ date.formatDate(bill.createdAt, 'YYYY-MM-DD HH:mm:ss') }}</div>
          </div>
          <div :class="[
                'text-right',
                { 'text-red': bill.type < 0 },
                { 'text-green': bill.type >= 0 },
              ]">
            <div class="text-body1 text-weight-medium">
              <span v-if="bill.type >= 0">+</span>
              <span v-if="bill.type < 0">-</span>
              {{ bill.money.toFixed(2) }}
            </div>
            <div class="text-caption text-grey">
              {{ $t('balance') }}:{{ (bill.Balance.toFixed(2)).toLocaleString() }}
            </div>
          </div>
        </div>
      </q-item>
      <noData v-if="data.itemList.length<=0"></noData>
    </template>
  </infinite>

  <!-- 账单筛选 -->
  <q-drawer v-model="filterStatus" side="right" bordered>
    <!-- drawer content -->
    <q-card flat class="column justify-between full-width">
      <q-card-section>
        <div class="text-weight-bold q-mb-md">{{ $t('filter') }}</div>
        <!-- 类型列表 -->
        <div class="row q-mb-md">
          <div v-for="(billType, billTypeIndex) in billOptionList" :key="billTypeIndex" class="col-6">
            <div class="q-ma-xs">
              <q-btn outline rounded no-caps
                     :class="params.types.indexOf(billType.value) > -1 ? 'bg-primary text-white' : 'text-grey'"
                     @click="selectBillTypeFunc(billType.value)" class="full-width ellipsis "
                     :label="$t(billType.label)"></q-btn>
            </div>
          </div>
        </div>

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
            <q-btn @click="walletsBillFunc() ;filterStatus = false" unelevated rounded no-caps
                   style="height: 44px;" class="full-width"
                   color="primary" :label="$t('confirm')" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-drawer>

</template>
<script setup lang="ts">
import { commonAssets, walletsBillCommon } from 'pages/common/wallets/bill';
import infinite from 'components/mobile/infinite.vue';
import noData from 'components/noData.vue';
import { onMounted, ref } from 'vue';
import { date } from 'quasar';
import { walletsBillListAPI } from 'src/apis/wallets';
import { useI18n } from 'vue-i18n';

const filterStatus = ref(false);
const { pagination, params, billOptionList, walletsBillOptionListFunc, selectBillTypeFunc } = walletsBillCommon();

onMounted(async () => {
  // 获取账单类型列表
  walletsBillOptionListFunc();

  // 获取账单列表
  await walletsBillFunc();
});

// 获取账单列表
const walletsBillFunc = () => {
  pagination.value?.initData();
};

// 设置页数
const updatePage = (page: any) => {
  params.value.pagination.page = Number(page);
};

const $i18n = useI18n();
const emit = defineEmits(['update']);
emit('update', {
  title: params.value.mode == commonAssets ? $i18n.t('assetsBill') : $i18n.t('balanceBill'),
  right: {
    callback: () => {
      filterStatus.value = true;
    },
    icon: 'view_headline'
  }
});

defineOptions({
  name: 'WalletsBill'
});
</script>

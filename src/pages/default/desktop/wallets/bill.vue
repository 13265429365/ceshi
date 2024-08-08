<template>
  <div class="q-pa-xl">
    <q-list bordered class="rounded-borders q-pa-md">
      <div class="row justify-between items-center">
        <q-tabs
          v-model="params.mode"
          @update:model-value="switchBill"
          align="left"
          narrow-indicator
          class="q-mb-lg"
          active-color="primary"
        >
          <q-tab :name="commonBalance" :label="$t('balanceBill')" />
          <q-tab :name="commonAssets" :label="$t('assetsBill')" />
        </q-tabs>

        <div>
          <q-btn class="bg-grey-1 text-grey" no-caps unelevated rounded style="height: 30px">
            {{ params.createdAt ? params.createdAt.from : '' }}
            -
            {{ params.createdAt ? params.createdAt.to : '' }}
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="params.createdAt" @update:model-value="walletsBillFunc" range></q-date>
            </q-popup-proxy>
          </q-btn>
          <q-btn-dropdown class="bg-grey-1 text-grey q-ml-md" no-caps unelevated rounded :label="$t('filter')">
            <q-list class="q-pa-md" style="width: 400px">
              <div class="row q-mb-md">
                <div v-for="(billType, billTypeIndex) in billOptionList" :key="billTypeIndex" class="col-4">
                  <div class="q-ma-xs">
                    <q-btn outline rounded no-caps
                           :class="params.types.indexOf(billType.value) > -1 ? 'bg-primary text-white' : 'text-grey'"
                           @click="selectBillTypeFunc(billType.value)" class="full-width ellipsis "
                           :label="$t(billType.label)"></q-btn>
                  </div>
                </div>
              </div>
              <div class="row q-col-gutter-x-md justify-between no-wrap">
                <div class="col-6">
                  <q-btn unelevated rounded no-caps
                         style="height: 44px;" class="bg-grey-2 full-width" :label="$t('cancel')" />
                </div>
                <div class="col-6">
                  <q-btn @click="walletsBillFunc" v-close-popup unelevated rounded no-caps
                         style="height: 44px;" class="full-width"
                         color="primary" :label="$t('confirm')" />
                </div>
              </div>
            </q-list>

          </q-btn-dropdown>
        </div>
      </div>

      <paging ref="pagination" :params="params" :request="walletsBillListAPI">
        <template v-slot:default="data">
          <!-- 账单 -->
          <div v-for="(bill, billIndex) in data.itemList" :key="billIndex">
            <q-expansion-item default-opened :expand-icon-class="bill.status != -1 ? 'text-transparent' : ''"
                              :header-style="{ borderRadius: '4px', height: '68px', lineHeight: '54px' }">
              <template v-slot:header>
                <q-item-section>
                  <div class="col">
                    {{ date.formatDate(bill.createdAt, 'YYYY/MM/DD HH:mm:SS') }}
                  </div>
                </q-item-section>
                <q-item-section>
                  <div class="text-center">
                    {{ ($t(bill.name)) }}
                  </div>
                </q-item-section>
                <q-item-section>
                  <div class="text-center text-body1 text-bold">
                  <span v-if="bill.type > 0" class="text-green">
                    +{{ Number(bill.money).toFixed(2) }}
                  </span>
                    <span v-else class="text-red">
                    -{{ Number(bill.money).toFixed(2) }}
                  </span>
                  </div>
                </q-item-section>
                <q-item-section>
                  <div class="text-right">
                    {{ bill.balance.toFixed(2) }} <span class="text-grey text-caption">{{ $t('balance') }}</span>
                  </div>
                </q-item-section>
              </template>
              <div v-if="bill.status == -1" class="text-red text-caption q-pa-md bg-grey-1">
                {{ bill.data }}
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
import { walletsBillCommon } from 'pages/common/wallets/bill';
import { commonBalance, commonAssets } from 'src/pages/common/wallets/bill';
import paging from 'src/components/dsektop/pagination.vue';
import { onMounted } from 'vue';
import { date } from 'quasar';
import { walletsBillListAPI } from 'src/apis/wallets';

// 账单模块
const {
  pagination,
  params,
  billOptionList,
  walletsBillOptionListFunc,
  selectBillTypeFunc,
  switchBill
} = walletsBillCommon();

onMounted(() => {
  // 获取账单类型列表
  walletsBillOptionListFunc();

  // 获取账单列表
  walletsBillFunc();
});

const walletsBillFunc = () => {
  params.value.pagination.page = 1;
  pagination.value?.initData();
};

defineOptions({
  name: 'WalletsBill'
});
</script>

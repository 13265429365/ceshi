<template>
  <div class="q-pa-xl">
    <q-tabs
      v-model="params.type"
      @update:model-value="transferListFunc"
      align="left"
      narrow-indicator
      active-color="primary"
    >
      <q-tab :name="balanceTransferType" :label="$t('balanceTransfer')" />
      <q-tab :name="assetsTransferType" :label="$t('assetsTransfer')" />
    </q-tabs>
    <q-list bordered class="rounded-borders q-pa-md q-mt-lg">
      <div class="row no-wrap justify-end items-center q-mb-lg">
        <q-btn class="bg-grey-1 text-grey" no-caps unelevated rounded>
          {{ params.createdAt ? params.createdAt.from : '' }}
          -
          {{ params.createdAt ? params.createdAt.to : '' }}
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="params.createdAt" @update:model-value="transferListFunc" range></q-date>
          </q-popup-proxy>
        </q-btn>
      </div>

      <paging ref="pagination" :params="params" :request="transferListAPI">
        <template v-slot:default="data">
          <div v-for="(transfer, transferIndex) in data.itemList" :key="transferIndex">
            <q-expansion-item hide-expand-icon
                              :header-style="{ borderRadius: '4px', height: '68px', lineHeight: '54px' }">
              <template v-slot:header>
                <q-item-section>
                  <div>
                    <div v-text="date.formatDate(transfer.createdAt, 'YYYY-MM-DD HH:mm:ss')"></div>
                  </div>
                </q-item-section>
                <q-item-section>
                  <div class="text-center" v-text="$t('transferUserName') + ' ' + transfer.ReceiverInfo.UserName"></div>
                </q-item-section>
                <q-item-section>
                  <div class="text-body1 text-weight-medium text-right">
                    <div class="text-h6 text-red"
                         v-text="'-' + (transfer.AssetsInfo.id == 0 ? $t('currency') : '') + transfer.money.toFixed(2)"></div>
                    <div v-text="transfer.AssetsInfo.name" class="text-caption text-grey"></div>
                  </div>
                </q-item-section>
              </template>
              <div v-if="transfer.status == -1" class="text-red text-caption q-pa-md bg-grey-1">
                {{ transfer.data }}
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
import { balanceTransferType, assetsTransferType, transferCommon } from 'pages/common/wallets/transfer';
import paging from 'src/components/dsektop/pagination.vue';
import { date } from 'quasar';
import { onMounted } from 'vue';
import { transferListAPI } from 'src/apis/wallets/transfer';

// 资金转移模块
const { params, pagination } = transferCommon();

onMounted(() => {
  // 获取资金转移列表
  transferListFunc();
});

const transferListFunc = ()=>{
  params.value.pagination.page = 1;
  pagination.value?.initData();
}

defineOptions({
  name: 'WalletsTransferRecord'
});
</script>

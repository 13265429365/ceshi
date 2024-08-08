<template>
  <div>
    <q-tabs
      v-model="params.type"
      @update:model-value="console.log(111);transferListFunc()"
      align="left"
      narrow-indicator
      active-color="primary"
    >
      <q-tab :name="balanceTransferType" :label="$t('balanceTransfer')" />
      <q-tab :name="assetsTransferType" :label="$t('assetsTransfer')" />
    </q-tabs>
    <infinite ref="pagination" :params="params" @updatePage="updatePage" :request="transferListAPI"
              :height="$q.screen.height - 50 - 30"
              class="q-pa-md bg-grey-2">
      <template v-slot:default="data">
        <q-item
          v-for="(transfer, transferIndex) in data.itemList"
          :key="transferIndex"
          class="bg-white rounded-borders q-mb-sm q-py-md"
        >
          <q-item-section>
            <div>
              <div class="text-body1 text-bold"
                   v-text="$t('transferUserName') + ' ' + transfer.receiverInfo.userName"></div>
              <div class="text-caption text-grey"
                   v-text="date.formatDate(transfer.createdAt, 'YYYY-MM-DD HH:mm:ss')"></div>
            </div>
          </q-item-section>

          <q-item-section side>
            <div class="text-h6 text-red"
                 v-text="'-' + (transfer.assetsInfo.id == 0 ? $t('currency') : '') + transfer.money.toFixed(2)"></div>
            <div v-text="transfer.assetsInfo.name" class="text-caption text-grey"></div>
          </q-item-section>
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
              <q-btn @click="transferListFunc() ;filterStatus = false" unelevated rounded no-caps
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
import { balanceTransferType, assetsTransferType, transferCommon } from 'pages/common/wallets/transfer';
import infinite from 'components/mobile/infinite.vue';
import noData from 'components/noData.vue';
import { date } from 'quasar';
import { onMounted, ref } from 'vue';
import { transferListAPI } from 'src/apis/wallets/transfer';
import { useI18n } from 'vue-i18n';

// 资金转移类型弹窗
const filterStatus = ref(false) as any;

// 资金转移模块
const { params, pagination } = transferCommon();

onMounted(() => {
  // 获取资金转移列表
  transferListFunc();
});

const transferListFunc = () => {
  pagination.value?.initData();
};

// 设置页数
const updatePage = (page: any) => {
  params.value.pagination.page = Number(page);
};

const $i18n = useI18n()
const emit = defineEmits(['update'])
emit('update', {
  title: $i18n.t('transfer'),
  right: {
    callback: () => {
      filterStatus.value = true
    },
    icon: 'view_headline'
  },
})

defineOptions({
  name: 'WalletsTransferRecord'
});

</script>

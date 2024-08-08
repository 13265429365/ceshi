<template>
  <div class="q-pa-xl">
    <!-- 余额 -->
    <div class="row items-center justify-between rounded-borders q-pa-lg q-pr-xl"
         style="background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);">
      <div class="row">
        <q-img no-spinner :src="imageSrc(userAssetsInfo.icon)" class="self-center" width="53px" height="53px" />
        <div class="q-pt-sm q-ml-md">
          <div class="row items-center">
            <div class="text-white text-body2 q-mr-xs">{{ $t('assets') }}</div>
            <q-icon @click="showMoney = !showMoney" class="cursor-pointer" color="white" size="16px"
                    :name="showMoney ? 'o_visibility' : 'o_visibility_off'"></q-icon>
          </div>
          <div class="text-h6 text-white text-weight-bold q-mt-xs">
            <div v-if="showMoney" class="row items-center">
            <span class="text-weight-medium q-mr-xs">
              {{ Number(userAssetsInfo.userAssets.money).toFixed(4) }} <span class="text-body2">{{ userAssetsInfo.name
              }}</span>
            </span>
              <span class="text-caption q-mx-xs">≈</span>
              <span class="text-caption q-mr-xs">
              {{ $t('currency') }}{{ (userAssetsInfo.userAssets.money * userAssetsInfo.rate).toFixed(2) }}
            </span>
            </div>
            <div v-else>
              ******
            </div>
          </div>
        </div>
      </div>

      <!-- 充值、提现 -->
      <div class="row">
        <q-btn
          @click="$router.push({ name: 'WalletsDeposit', query: { mode: assetsDepositMode, assetsId: userAssetsInfo.id } })"
          unelevated
          class="text-primary bg-white" rounded no-caps style="width: 90px" :label="$t('assetsDeposit')"></q-btn>
        <q-btn
          @click="$router.push({ name: 'WalletsWithdraw', query: { mode: assetsDepositMode, id: userAssetsInfo.id } })"
          unelevated
          class="text-primary bg-white q-ml-md" rounded style="width: 90px" no-caps
          :label="$t('assetsWithdraw')"></q-btn>
      </div>
    </div>

    <paging ref="pagination" :params="params" :request="walletsOrderListAPI">
      <template v-slot:default="data">
        <!-- 钱包订单 -->
        <div v-for="(order, orderIndex) in data.itemList" :key="orderIndex">
          <q-expansion-item default-opened :expand-icon-class="order.status != -1 ? 'text-transparent' : ''"
                            :header-style="{ borderRadius: '4px', height: '68px', lineHeight: '54px' }">
            <template v-slot:header>
              <q-item-section>
                <div class="col text-grey">
                  {{ date.formatDate(order.createdAt, 'YYYY/MM/DD HH:mm:SS') }}
                </div>
              </q-item-section>
              <q-item-section>
                <div class="text-center">
                  <span v-if="order.type==assetsDepositMode">{{ $t('assetsDeposit') }}</span>
                  <span v-if="order.type==assetsWithdrawalMode">{{ $t('assetsWithdraw') }}</span>
                </div>
              </q-item-section>
              <q-item-section>
                <div :class="[
                  'text-center text-body1',
                  { 'text-red': order.status == orderRefuseStatus },
                  { 'text-primary': order.status == orderPendingStatus },
                  { 'text-green': order.status == orderSuccessStatus },
                ]">
                  <span v-if="order.type==assetsDepositMode">+</span>
                  <span v-if="order.type==assetsWithdrawalMode">-</span>
                  {{ Number(order.money).toFixed(2) }}
                </div>
              </q-item-section>
              <q-item-section>
                <div class="text-right">
                  <div v-if="order.status == orderRefuseStatus" class="text-red">
                    {{ $t('refuse') }}
                  </div>
                  <div v-if="order.status == orderPendingStatus" class="text-primary">
                    {{ $t('pending') }}
                  </div>
                  <div v-if="order.status == orderSuccessStatus" class="text-grey">
                    {{ $t('complete') }}
                  </div>
                </div>
              </q-item-section>
            </template>
            <div v-if="order.status == -1" class="text-red text-caption q-pa-md bg-grey-1">
              {{ order.data }}
            </div>
          </q-expansion-item>
          <q-separator />
        </div>
      </template>
    </paging>
  </div>
</template>

<script setup lang="ts">
import { assetsDepositMode, assetsWithdrawalMode, userAssetsCommon } from 'src/pages/common/wallets/assets';
import { orderPendingStatus, orderRefuseStatus, orderSuccessStatus, orderCommon } from 'src/pages/common/wallets/order';
import paging from 'src/components/dsektop/pagination.vue';
import { useRouter, useRoute } from 'vue-router';
import { imageSrc } from 'src/utils';
import { onMounted } from 'vue';
import { date } from 'quasar';
import { walletsOrderListAPI } from 'src/apis/wallets';

const $router = useRouter();
const $route = useRoute();

// 资产模块
const { userAssetsInfo, showMoney, userAssetsDetailsFunc } = userAssetsCommon();

// 订单模块
const { params, pagination } = orderCommon();

onMounted(() => {
  // 获取用户资产详情
  userAssetsDetailsFunc();

  // 获取资产订单列表
  params.value.mode = assetsDepositMode;
  params.value.assetsId = Number($route.query.id);
  params.value.pagination.page = 1;
  orderFunc();
});

const orderFunc = ()=>{
  pagination.value?.initData();
}

defineOptions({
  name: 'WalletsAssetsDetails'
});
</script>

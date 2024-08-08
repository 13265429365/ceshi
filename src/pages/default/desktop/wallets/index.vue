<template>
  <div class="full-width q-pa-xl">
    <!-- 余额 -->
    <div class="row items-center justify-between rounded-borders q-pa-lg q-pr-xl"
         style="background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);">
      <div class="row">
        <q-img no-spinner class="q-mr-lg" src="/src/assets/default/wallets.png" width="66px" height="66px"></q-img>
        <div class="q-pt-sm">
          <div class="row items-center">
            <div class="text-white text-h6 q-mr-xs">{{ $t('balance') }}</div>
            <q-icon @click="showMoney = !showMoney" class="cursor-pointer" color="white" size="16px"
                    :name="showMoney ? 'o_visibility' : 'o_visibility_off'"></q-icon>
          </div>
          <div class="text-h6 text-white text-weight-bold q-mt-xs">
            <div v-if="showMoney">
              <span class="text-caption q-mr-xs">{{ $t('currency') }}</span>{{ Number(userInfo.money).toFixed(2) }}
            </div>
            <div v-else>
              ******
            </div>
          </div>
        </div>
      </div>

      <!-- 充值、提现 -->
      <div class="row">
        <q-btn @click="$router.push({ name: 'WalletsDeposit', query: { mode: balanceDepositMode } })" unelevated
               class="text-primary bg-white" rounded no-caps style="width: 90px" :label="$t('deposit')"></q-btn>
        <q-btn @click="$router.push({ name: 'WalletsWithdraw', query: { mode: balanceDepositMode } })" unelevated
               class="text-primary bg-white q-ml-md" rounded style="width: 90px" no-caps
               :label="$t('withdraw')"></q-btn>
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
                  <div class="col">
                    {{ date.formatDate(order.createdAt, 'YYYY/MM/DD HH:mm:ss') }}
                  </div>
                </q-item-section>
                <q-item-section>
                  <div class="text-center text-body2">
                  <span v-if="order.type==balanceDepositMode">
                    {{ $t('deposit') }} <span
                    class="text-body2 text-grey">{{ order.paymentInfo.name }} +{{ order.money }}</span>
                  </span>
                    <span v-if="order.type==balanceWithdrawalMode">
                    {{ $t('withdraw') }}
                  </span>
                  </div>
                </q-item-section>
                <q-item-section>
                  <div :class="[
                  'text-center text-body1 text-bold',
                  { 'text-red': order.status == orderRefuseStatus },
                  { 'text-primary': order.status == orderPendingStatus },
                  { 'text-green': order.status == orderSuccessStatus },
                ]">
                  <span v-if="order.type==balanceDepositMode">
                    +{{ Number(order.money * order.paymentInfo.rate).toFixed(2) }}
                  </span>
                    <span v-if="order.type==balanceWithdrawalMode">
                    -{{ Number(order.money).toFixed(2) }}
                  </span>

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
import { orderPendingStatus, orderRefuseStatus, orderSuccessStatus } from 'src/pages/common/wallets/order';
import { balanceDepositMode, balanceWithdrawalMode, orderCommon } from 'src/pages/common/wallets/order';
import { userInfoCommon } from 'pages/common/users/info';
import paging from 'src/components/dsektop/pagination.vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { date } from 'quasar';
import { walletsOrderListAPI } from 'src/apis/wallets';

const $router = useRouter();

// 订单模块
const { params, showMoney, pagination } = orderCommon();

// 用户模块
const { userInfo, userInfoFunc } = userInfoCommon();

onMounted(() => {
  // 获取用户余额
  userInfoFunc();

  // 获取钱包订单列表
  orderFunc();
});

// 获取钱包订单列表
const orderFunc = () => {
  params.value.mode = balanceDepositMode;
  params.value.pagination.page = 1;
  pagination.value?.initData();
};


defineOptions({
  name: 'WalletsIndex'
});
</script>

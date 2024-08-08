<template>
  <div class="full-width bg-grey-2">
    <div class="col q-pa-md full-width">
      <!-- 余额 -->
      <div style="height: 112px;background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);padding: 0 20px;"
           class="row justify-between rounded-borders q-mb-md">
        <div class="column justify-center text-white">
          <div class="row items-center">
            <div class="text-white text-body2 q-mr-xs">{{ $t('balance') }}</div>
            <q-icon @click="showMoney = !showMoney" class="cursor-pointer" color="white" size="16px"
                    :name="showMoney ? 'o_visibility' : 'o_visibility_off'"></q-icon>
          </div>
          <!-- 点击显示、隐藏金额 -->
          <div class="text-h6 text-white text-weight-bold">
            <div v-if="showMoney">
              <span class="text-caption q-mr-xs">{{ $t('currency') }}</span>{{ Number(userInfo.money).toFixed(2) }}
            </div>
            <div v-else>
              ******
            </div>
          </div>
        </div>
        <q-img no-spinner src="/src/assets/default/wallets.png" class="self-center" width="68px" height="53.83px" />
      </div>

      <!-- more菜单 -->
      <moreMenu :mode="balanceDepositMode"></moreMenu>

      <!-- 钱包订单 -->
      <infinite ref="pagination" @updatePage="updatePage" :request="walletsOrderListAPI" :params="params"
                :height="$q.screen.height - 292" class="bg-grey-2">
        <template v-slot:default="data">
          <q-item
            v-for="(order, orderIndex) in data.itemList"
            :key="orderIndex"
            class="bg-white rounded-borders q-mb-sm q-py-md column"
          >
            <div class="row justify-between full-width">
              <div>
                <div class="text-body1 text-weight-medium">
                <span v-if="order.type==balanceDepositMode">
                  {{ $t('deposit') }} <span
                  class="text-body2 text-grey">{{ order.paymentInfo.name }} +{{ order.money }}</span>
                </span>
                  <span v-if="order.type==balanceWithdrawalMode">
                  {{ $t('withdraw') }}
                </span>
                </div>
                <div class="text-grey">{{ date.formatDate(order.createdAt, 'YYYY-MM-DD HH:mm:ss') }}</div>
              </div>
              <div :class="[
                'text-right',
                { 'text-red': order.status == orderRefuseStatus },
                { 'text-primary': order.status == orderPendingStatus },
                { 'text-green': order.status == orderSuccessStatus },
              ]">
                <div class="text-body1 text-weight-medium">
                <span v-if="order.type==balanceDepositMode">
                  +{{ Number(order.money * order.paymentInfo.rate).toFixed(2) }}
                </span>
                  <span v-if="order.type==balanceWithdrawalMode">
                  -{{ Number(order.money).toFixed(2) }}
                </span>

                </div>
                <div>
                  <span v-if="order.status==orderRefuseStatus">{{ $t('refuse') }}</span>
                  <span v-if="order.status==orderPendingStatus">{{ $t('pending') }}</span>
                  <span v-if="order.status==orderSuccessStatus">{{ $t('success') }}</span>
                </div>
              </div>
            </div>
            <div v-if="order.status==orderRefuseStatus" class="text-red q-mt-sm">{{ order.data }}</div>
          </q-item>
          <noData v-if="data.itemList.length<=0"></noData>
        </template>
      </infinite>
    </div>
  </div>
</template>

<script setup lang="ts">
import { balanceDepositMode, balanceWithdrawalMode, orderCommon } from 'src/pages/common/wallets/order';
import { orderPendingStatus, orderRefuseStatus, orderSuccessStatus } from 'src/pages/common/wallets/order';
import { userInfoCommon } from 'pages/common/users/info';
import moreMenu from 'components/mobile/moreMenu.vue';
import infinite from 'components/mobile/infinite.vue';
import noData from 'components/noData.vue';
import { date } from 'quasar';
import { onMounted } from 'vue';
import { walletsOrderListAPI } from 'src/apis/wallets';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const $router = useRouter()

// 订单模块
const { params, showMoney, pagination } = orderCommon();

// 用户模块
const { userInfo, userInfoFunc } = userInfoCommon();

onMounted(() => {
  // 获取用户余额
  userInfoFunc();

  // 获取钱包订单列表（infinite组件内执行）
  pagination.value?.initData()
});

// 设置页数
const updatePage = (page: any) => {
  params.value.pagination.page = Number(page);
};

const $i18n = useI18n()
const emit = defineEmits(['update'])
emit('update', {
  title: $i18n.t('userWallets'),
  right: {
    callback: () => {
      $router.push({ name: 'WalletsBill' });
    },
    icon: 'o_wysiwyg'
  },
})

defineOptions({
  name: 'WalletsIndex'
});
</script>

<template>
  <div class="full-width bg-grey-2">
    <div class="col q-pa-md full-width">
      <!-- 余额 -->
      <div style="height: 112px;background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);padding: 0 20px;"
           class="row justify-between rounded-borders q-mb-md">
        <div class="column justify-center text-white">
          <div class="row items-center">
            <div class="text-white text-body2 q-mr-xs">{{ $t('assets') }}</div>
            <q-icon @click="showMoney = !showMoney" class="cursor-pointer" color="white" size="16px"
                    :name="showMoney ? 'o_visibility' : 'o_visibility_off'"></q-icon>
          </div>
          <!-- 点击显示、隐藏金额 -->
          <div class="text-h6 text-white text-weight-bold">
            <div v-if="showMoney" class="row items-center">
              <span class="text-weight-medium q-mr-xs"
                    v-text="Number(userAssetsInfo.userAssets.money).toFixed(2)"></span>
              <span class="text-caption q-mx-xs">≈</span>
              <span class="text-caption q-mr-xs">
              {{ $t('currency') }}
              <span v-text="(userAssetsInfo.userAssets.money * userAssetsInfo.rate).toFixed(2)"></span>
            </span>
            </div>
            <div v-else>
              ******
            </div>
          </div>
        </div>
        <q-img no-spinner :src="imageSrc(userAssetsInfo.icon)" class="self-center" width="53px" height="53px" />
      </div>

      <!-- more菜单 -->
      <moreMenu :mode="assetsDepositMode" :assetsId="userAssetsInfo.id"></moreMenu>

      <!-- 钱包订单 -->
      <infinite ref="pagination" :params="params" @updatePage="updatePage" :request="walletsOrderListAPI"
                :height="$q.screen.height" class="bg-grey-2">
        <template v-slot:default="data">
          <q-item
            v-for="(order, orderIndex) in data.itemList"
            :key="orderIndex"
            class="bg-white rounded-borders q-mb-sm q-py-md column"
          >
            <div class="row justify-between full-width">
              <div>
                <div class="text-body1 text-weight-medium">
                  <span v-if="order.type==assetsDepositMode">{{ $t('assetsDeposit') }}</span>
                  <span v-if="order.type==assetsWithdrawalMode">{{ $t('assetsWithdraw') }}</span>
                </div>
                <div class="text-grey" v-text="date.formatDate(order.createdAt,'YYYY-MM-DD HH:mm:ss')"></div>
              </div>
              <div :class="[
              'text-right',
              { 'text-red': order.status == orderRefuseStatus },
              { 'text-primary': order.status == orderPendingStatus },
              { 'text-green': order.status == orderSuccessStatus },
            ]">
                <div class="text-body1 text-weight-medium">
                  <span v-if="order.type==assetsDepositMode">+</span>
                  <span v-if="order.type==assetsWithdrawalMode">-</span>
                  <span v-text="order.money.toFixed(2)"></span>
                </div>
                <div>
                  <span v-if="order.status==orderRefuseStatus">{{ $t('refuse') }}</span>
                  <span v-if="order.status==orderPendingStatus">{{ $t('pending') }}</span>
                  <span v-if="order.status==orderSuccessStatus">{{ $t('success') }}</span>
                </div>
              </div>
            </div>
            <div v-if="order.status==orderRefuseStatus" class="text-red q-mt-sm" v-text="order.data"></div>
          </q-item>
          <noData v-if="data.itemList.length<=0"></noData>
        </template>
      </infinite>
    </div>
  </div>
</template>

<script setup lang="ts">
import { assetsDepositMode, assetsWithdrawalMode, userAssetsCommon } from 'src/pages/common/wallets/assets';
import { orderPendingStatus, orderRefuseStatus, orderSuccessStatus, orderCommon } from 'src/pages/common/wallets/order';
import moreMenu from 'components/mobile/moreMenu.vue';
import infinite from 'components/mobile/infinite.vue';
import noData from 'components/noData.vue';
import { imageSrc } from 'src/utils';
import { onMounted } from 'vue';
import { date } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import { walletsOrderListAPI } from 'src/apis/wallets';
import { useI18n } from 'vue-i18n';
import { commonAssets } from 'pages/common/wallets/bill';

const $route = useRoute();
const $router = useRouter();

// 用户资产模块
const { userAssetsInfo, showMoney, userAssetsDetailsFunc } = userAssetsCommon();

// 订单模块
const { params, pagination } = orderCommon();


onMounted(async () => {
  // 获取用户资产详情
  await userAssetsDetailsFunc();

  // 获取资产订单列表
  params.value.mode = assetsDepositMode;
  params.value.assetsId = Number($route.query.id);
  pagination.value?.initData()


});

// 设置页数
const updatePage = (page: any) => {
  params.value.pagination.page = Number(page);
};

const $i18n = useI18n()
const emit = defineEmits(['update'])
emit('update', {
  title: $i18n.t('userAssets'),
  right: {
    callback: () => {
      $router.push({ name: 'WalletsBill', query: { mode: commonAssets } });
    },
    icon: 'o_wysiwyg'
  },
})

defineOptions({
  name: 'WalletsAssetsDetails'
});
</script>

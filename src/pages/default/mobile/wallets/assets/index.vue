<template>
  <div class="full-width bg-grey-2 q-pa-md">
    <!-- 余额 -->
    <div style="height: 112px;background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);padding: 0 20px;"
         class="row justify-between rounded-borders q-mb-md">
      <div class="column justify-center text-white">
        <div class="row items-center">
          <div class="text-white text-body2 q-mr-xs">{{ $t('totalAssets') }}</div>
          <q-icon @click="showMoney = !showMoney" class="cursor-pointer" color="white" size="16px"
                  :name="showMoney ? 'o_visibility' : 'o_visibility_off'"></q-icon>
        </div>
        <!-- 点击显示、隐藏金额 -->
        <div class="text-h6 text-white text-weight-bold">
          <div v-if="showMoney" class="row items-center">
            <span class="text-weight-medium q-mr-xs text-h5">
              {{ $t('currency') }} <span v-text="userAssetsList.sumMoney.toFixed(2)"></span>
            </span>
          </div>
          <div v-else>
            ******
          </div>
        </div>
      </div>
    </div>

    <!-- more菜单 -->
    <moreMenu :mode="assetsDepositMode" :assetsId="userAssetsList.assetsList[0].id"></moreMenu>

    <!-- eCharts -->
    <div class="bg-white q-pa-md rounded-borders" v-show="userAssetsList.assetsList.length > 0">
      <div class="text-weight-bold q-mb-lg">{{ $t('assetsBlock') }}
      </div>
      <div class="row justify-center">
        <div v-for="(item, index) in [$t('pieChart'), $t('lineChart')]" :key="index"
             :class="['q-mx-xs q-px-md q-py-xs', {
               'text-white': index == currentChartIndex,
               'bg-primary': index == currentChartIndex,
               'text-grey-8': index != currentChartIndex,
               'bg-grey-3': index != currentChartIndex,
               }]"
             style="border-radius: 18px;">
          <div @click="currentChartIndex = index">{{ item }}</div>
        </div>
      </div>

      <div v-show="currentChartIndex==0" class="q-mt-lg">
        <!-- 饼状图 -->
        <div class="row justify-center q-mb-sm">
          <div :id="echartsPieId" style="height: 200px; width: 200px"></div>
        </div>

        <!-- 资产账户列表 -->
        <div>
          <div v-for="(assets, assetsIndex) in userAssetsList.assetsList" :key="assetsIndex">
            <div class="row justify-between items-center justify-start"
                 @click="$router.push({ name: 'WalletsAssetsDetails', query: { id: assets.id } })">
              <div class="row items-center">
                <q-separator vertical class="q-mr-xs q-mt-xs" style="width: 2px;
                    height: 12px;
                    border-radius: 2px;" :style="{ background: colorList[assetsIndex] }" />
                <div class="q-mr-md text-grey-7" style="min-width: 40px" v-text="assets.name"></div>
                <div
                  v-text="'-' + (userAssetsList.sumMoney == 0 ? '0.00' : (assets.userAssets.money * assets.rate / userAssetsList.sumMoney * 100).toFixed(2)) + '%'"></div>
              </div>
              <div class="text-weight-bold">{{ $t('currency') }}<span
                v-text="Number(assets.userAssets.money * assets.rate).toFixed(2)"></span></div>
            </div>
            <q-separator v-if="assetsIndex < userAssetsList.assetsList.length - 1" class="q-my-xs"
                         style="background: #F4F5FD" />
          </div>
        </div>
      </div>

      <!-- 折线图 -->
      <div v-show="currentChartIndex == 1">
        <div class="row justify-center q-mt-sm full-width">
          <div :id="echartsLineId" :style="{ height: '260px', width: $q.screen.width-70+'px' }"></div>
        </div>
      </div>

    </div>

    <div class="q-mt-md q-mb-sm text-weight-bold">{{ $t('assets') }}</div>
    <div @click="$router.push({ name: 'WalletsAssetsDetails', query: { id: assets.id } })"
         v-for="(assets, assetsIndex) in userAssetsList.assetsList" :key="assetsIndex"
         class="row justify-between items-center bg-white q-py-sm q-px-md q-mb-sm rounded-borders">
      <div class="row items-center">
        <q-img no-spinner class="q-mr-sm" width="26px" height="26px" :src="imageSrc(assets.icon)" />
        <div class="text-weight-bold" v-text="assets.name"></div>
      </div>
      <div>
        <div class="text-weight-bold text-right" style="font-size: 16px;"
             v-text="Number(assets.userAssets.money).toFixed(2)"></div>
        <div class="text-right text-grey-5" style="font-size: 12px;">
          ≈{{ $t('currency') }}
          <span v-text="(assets.rate * assets.userAssets.money).toFixed(2)"></span>
        </div>
      </div>
    </div>

    <noData v-if="userAssetsList.assetsList.length<=0"></noData>
  </div>
</template>

<script setup lang="ts">
import { userAssetsCommon } from 'pages/common/wallets/assets';
import moreMenu from 'src/components/mobile/moreMenu.vue';
import noData from 'src/components/noData.vue';
import { assetsDepositMode } from 'src/pages/common/wallets/assets';
import { imageSrc } from 'src/utils';
import { onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const currentChartIndex = ref(0) as any;
const {
  colorList,
  echartsPieId,
  echartsLineId,
  userAssetsList,
  showMoney,
  userAssetsListFunc,
  delCharts
} = userAssetsCommon();

onMounted(() => {
  // 获取用户资产列表
  userAssetsListFunc();
});

onUnmounted(() => {
  // 销毁echarts实例
  delCharts();
});

const $i18n = useI18n()
const emit = defineEmits(['update'])
emit('update', {
  title: $i18n.t('userAssets'),
  right: {
    callback: () => {},
    icon: ''
  },
})

defineOptions({
  name: 'WalletsAssets'
});
</script>

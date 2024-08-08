<template>
  <div class="q-pa-xl">
    <div class="row">
      <div style="width: 300px;">
        <!-- 总资产 -->
        <q-card flat class="full-width" style="background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%)">
          <q-card-section style="padding: 16px 16px 8px">
            <div class="row items-center">
              <div class="text-body1 text-bold text-white q-mr-xs">{{ $t('totalAssets') }}</div>
              <q-icon color="white" @click="showMoney = !showMoney"
                      :name="showMoney ? 'o_visibility' : 'o_visibility_off'" class="cursor-pointer"
                      size="16px"></q-icon>
            </div>
          </q-card-section>
          <q-card-section style="padding: 8px 16px">
            <div class="text-white" v-if="showMoney">
              <div class="text-h6">{{ $t('currency') }}{{ Number(userAssetsList.sumMoney).toFixed(2) }}</div>
              <div>&nbsp;</div>
            </div>
            <div style="height: 52px" class="text-white text-h5" v-else>
              ******
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn @click="$router.push({ name: 'WalletsDeposit', query: { mode: assetsDepositMode } })" flat
                   rounded
                   class="bg-white text-primary" size="sm" style="padding: 6px 18px">
              <div>{{ $t('assetsDeposit') }}</div>
            </q-btn>
            <q-btn
              @click="$router.push({ name: 'WalletsWithdraw', query: { mode: assetsDepositMode, id: userAssetsList.assetsList[0].id } })"
              flat rounded class="bg-white text-primary" size="sm" style="padding: 6px 18px">
              <div>{{ $t('assetsWithdraw') }}</div>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <!-- 单个资产 -->
      <div class="col q-ml-sm">
        <q-scroll-area style="height: 166px;width: 100%;" :thumb-style="{ display: 'none' }">
          <div class="row no-wrap q-gutter-sm">
            <q-card bordered flat @click="$router.push({ name: 'WalletsAssetsDetails', query: { id: assets.id } })"
                    style="width: 278px; background: linear-gradient(180deg, rgba(3,179,107,0.14) 0%, rgba(255,255,255,0) 100%)"
                    class="cursor-pointer"
                    v-for="(assets, assetsIndex) in userAssetsList.assetsList" :key="assetsIndex">
              <q-card-section style="padding: 16px 16px 0">
                <div class="row justify-between items-center">
                  <div class="text-h6">{{ assets.name }}</div>
                  <div>
                    <q-img :src="imageSrc(assets.icon)" width="44px" height="44px" no-spinner></q-img>
                  </div>
                </div>
              </q-card-section>
              <q-card-section style="padding: 4px 16px 0">
                <div class="text-black">
                  <div class="text-h6">{{ Number(assets.userAssets.money).toFixed(2) }}</div>
                  <div class="text-caption text-grey">
                    ≈{{ $t('currency') }}{{ (assets.rate * assets.userAssets.money).toFixed(2) }}
                  </div>
                </div>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat rounded class="bg-green-1 text-primary" size="sm" style="padding: 6px 18px">
                  <div>{{ $t('views') }}</div>
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </q-scroll-area>
      </div>
    </div>

    <!-- eCharts -->
    <q-list bordered class="bg-white q-pa-md rounded-borders q-mt-lg" v-show="userAssetsList.assetsList.length > 0">
      <div class="text-weight-bold q-mb-lg">{{ $t('assetsBlock') }}</div>

      <div class="row justify-center items-center q-mb-sm">
        <div :id="echartsPieId" style="height: 300px; width: 300px" class="q-mr-lg"></div>

        <div v-if="userAssetsList.assetsList.length > 0" class="q-ml-lg">
          <div v-for="(assets, assetsIndex) in userAssetsList.assetsList" :key="assetsIndex">
            <div class="row justify-between items-center justify-start"
                 @click="$router.push({ name: 'WalletsAssetsDetails', query: { id: assets.id } })">
              <div class="row items-center">
                <q-separator vertical class="q-mr-xs q-mt-xs" style="width: 2px;
                    height: 12px;
                    border-radius: 2px;" :style="{ background: colorList[assetsIndex] }" />
                <div class="q-mr-md text-grey-7" style="min-width: 40px">{{ assets.name }}</div>
                <div>-
                  {{ userAssetsList.sumMoney == 0 ? '0.00' : (assets.userAssets.money * assets.rate / userAssetsList.sumMoney * 100).toFixed(2)
                  }}%
                </div>
              </div>
              <div class="text-weight-bold">{{ $t('currency')
                }}{{ Number(assets.userAssets.money * assets.rate).toFixed(2) }}
              </div>
            </div>
            <q-separator v-if="assetsIndex < userAssetsList.assetsList.length - 1" class="q-my-xs"
                         style="background: #F4F5FD" />
          </div>
        </div>

        <div class="row justify-center q-mb-sm full-width q-mt-xl">
          <div :id="echartsLineId" :style="{height: '460px', width: $q.screen.width-300-96-32 +'%'}"></div>
        </div>
      </div>
    </q-list>

    <noData v-if="userAssetsList.assetsList.length<=0"></noData>
  </div>
</template>

<script setup lang="ts">
import { assetsDepositMode } from 'src/pages/common/wallets/assets'
import { userAssetsCommon } from 'pages/common/wallets/assets';
import noData from 'src/components/noData.vue';
import { imageSrc } from 'src/utils';
import { onMounted, onUnmounted } from 'vue';

const {
  echartsPieId,
  echartsLineId,
  colorList,
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


defineOptions({
  name: 'WalletsAssets'
});
</script>

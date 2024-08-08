<template>
  <div>
    <div class="row justify-end q-my-xl q-px-xl">
      <q-btn @click="$router.push({name:'WalletsTransferRecord'})" class="bg-grey-2" :label="$t('transferRecord')"
             unelevated></q-btn>
    </div>
    <div class="row justify-center q-pa-xl">
      <div class="bg-white q-gutter-y-md col-5">
        <!-- 输入账号 -->
        <div>
          <div class="text-weight-bold q-mb-sm">{{ $t('transferUserName') }}</div>
          <q-input type="text" outlined v-model="transferParams.UserName" :placeholder="$t('enterUserName')" />
        </div>

        <!-- 选择资产 -->
        <div>
          <div class="text-weight-bold q-mb-sm">{{ $t('assets') }}</div>
          <q-select
            v-model="assetsInfo"
            @update:model-value="transferParams.assetsId = assetsInfo.id"
            outlined
            :options="assetsList"
            option-value="id"
            option-label="name"
            dropdown-icon="expand_more"
          />
        </div>

        <!-- 可用余额 -->
        <div>
          <div class="text-weight-bold q-mb-sm">{{ $t('money') }}</div>
          <q-input type="number" outlined v-model.number="transferParams.money" :placeholder="$t('enterMoney')">
            <template v-slot:append>
              <q-btn
                @click="transferParams.money = assetsInfo.userAssets.money"
                flat
                dense
                :label="$t('all')"
                color="primary"
              ></q-btn>
            </template>
          </q-input>
          <div class="text-right q-mt-sm">
            <div class="text-grey">
              <span class="q-mr-sm">{{ transferParams.assetsId > 0 ? $t('availableAssets') : $t('availableBalance')
                }}</span>
              <span v-if="transferParams.assetsId == 0">{{ $t('currency') }}</span>
              <span
                v-text="Number(assetsInfo.userAssets.money).toFixed(4) + ' ' + (transferParams.assetsId == 0 ? '' : assetsInfo.name)"></span>
            </div>
          </div>
        </div>

        <div class="q-my-xl">
          <q-btn rounded unelevated color="primary" no-caps :label="$t('submit')" size="lg"
                 @click="submitFunc" class="full-width"></q-btn>
        </div>
      </div>
    </div>

    <!-- 输入秘钥弹窗 -->
    <GlobalDialog
      ref="securityDialogRef"
      :title="$t('secretKey')"
      :on-confirm-callback="createTransferFunc"
    >
      <q-input outlined v-model="transferParams.securityKey" type="password"
               :label="$t('enterSecretKey')"></q-input>
    </GlobalDialog>
  </div>
</template>

<script setup lang="ts">
import { transferCommon } from 'pages/common/wallets/transfer';
import { userInfoCommon } from 'pages/common/users/info';
import GlobalDialog from 'components/dialog.vue';
import { onMounted } from 'vue';

// 资金转移模块
const {
  securityDialogRef,
  transferParams,
  assetsList,
  assetsInfo,
  walletsAssetsListFunc,
  submitFunc,
  createTransferFunc
} = transferCommon();

// 用户模块
const { userInfoFunc } = userInfoCommon();

onMounted(() => {
  // 获取用户余额
  userInfoFunc();

  // 获取钱包资产列表
  walletsAssetsListFunc();
});

defineOptions({
  name: 'WalletsTransferCreate'
});
</script>

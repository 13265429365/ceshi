<template>
  <div class="column bg-grey-2" style="padding: 48px 244px;background: #F8F9FC;">
    <!-- 没有银行卡 -->
    <div v-if="accountList.length <= 0" class="q-mb-md">
      <q-banner rounded class="bg-red text-white q-mt-sm">
        {{ $t('notBindWithdrawAccount') }}
        <template v-slot:action>
          <q-btn @click="$router.push({ name: 'WalletsAccountIndex', query: {mode: mode} })" flat no-caps color="white"
                 :label="$t('gotoSetting') + $t('withdrawAccount')" />
        </template>
      </q-banner>
    </div>
    <div class="col column justify-between bg-white rounded-borders">
      <!-- 大标题 -->
      <div class="q-py-md q-px-lg row items-center no-wrap text-body1 text-weight-medium"
           style="background: linear-gradient(275deg, rgba(19,140,91,0.1) 0%, rgba(1,172,102,0.04) 100%);border-radius: 8px 8px 0 0;">
        <q-img no-spinner src="/src/assets/default/account.png" width="40PX" height="28px"></q-img>
        <div class="q-ml-md">
          {{ mode == balanceWithdrawalAccountMode ? $t('withdraw') : $t('assetsWithdraw') }}
        </div>
      </div>

      <div class="col full-width q-pa-lg">
        <div class="rounded-borders text-subtitle1 text-weight-medium q-py-xs q-px-md" style="background: #F8F9FC;">
          {{ $t('accountInfo') }}
        </div>

        <!-- 账户类型选择 提现账户列表资金mode:1   提现账户列表资产mode:2 -->
        <div class="row q-mt-md q-gutter-md">
          <div
            v-for="(account, accountIndex) in accountList"
            :key="accountIndex"
            :style="{
              width: '220px',
              height: '50px',
              borderRadius: '8px',
              border: account.id === currentAccount.id ? '1px solid #31cbd2' : ''
            }"
            class="q-pa-sm row justify-center cursor-pointer relative-position bg-grey-3 no-wrap"
            @click="switchPayment(account)"
          >
            <q-img no-spinner class="q-mr-sm" :src="imageSrc(account.paymentInfo.icon)" width="32px" height="32px" />
            <div style="width: 60%" class="self-center ellipsis">
              {{ account.name == '' ? account.number : account.name }}
            </div>
            <q-img
              v-if="account.id == currentAccount.id"
              no-spinner
              class="absolute"
              src="/src/assets/default/select.png"
              width="30PX"
              height="30px"
              style="bottom: 0;right: 0;"
            ></q-img>
          </div>
        </div>

        <div class="column q-gutter-md q-mt-lg" style="width: 60%;">
          <!-- 余额 -->
          <div>
            <div class="q-mb-xs">
              {{ $t('availableBalance') }}
            </div>

            <!-- mode==2显示资产余额 -->
            <div v-if="mode==assetsWithdrawalAccountMode" class="text-bold text-body1"
                 style="color: #F45E0C;width: 170px">
              <span>{{ Number(userAssetsInfo.userAssets.money).toFixed(2) }}</span>
              <span>{{ userAssetsInfo.name }}</span>
            </div>
            <!-- 否则显示资金余额 -->
            <div v-else class="text-bold text-body1" style="color: #F45E0C;width: 170px">
              <span>{{ $t('currency') }}
              </span>
              <span>
                {{ Number(userInfo.money).toFixed(2) }}
              </span>
            </div>
          </div>

          <!-- 输入金额 -->
          <div>
            <div class="q-mb-xs text-grey">{{ $t('money') }} <span
              v-if="accountList.length > 0 && mode == balanceDepositMode">1{{ currentAccount.paymentInfo.name
              }} ≈ {{ $t('currency') }}{{ currentAccount.paymentInfo.rate }}</span>
            </div>
            <div>
              <q-input class="q-mr-sm" type="number" outlined v-model.number="withdrawParams.money">
                <template v-slot:append>
                  <div class="column" v-if="accountList.length > 0 && mode == balanceDepositMode">
                    <div class="text-caption">≈
                      <span>{{ currentAccount.paymentInfo.name
                        }} {{ ((withdrawParams.money ?? 0) / currentAccount.paymentInfo.rate).toFixed(2) }}</span>
                    </div>
                  </div>
                  <q-btn
                    @click="mode==assetsWithdrawalAccountMode?withdrawParams.money = userAssetsInfo.userAssets.money:withdrawParams.money = userInfo.money"
                    flat
                    dense
                    :label="$t('all')"
                    color="primary"
                  ></q-btn>
                </template>
              </q-input>
            </div>
          </div>

          <!-- 提现提示 -->
          <div class="q-mt-lg q-mb-md text-grey">
            <div>{{ $t('withdrawDesc') }}</div>
          </div>

          <div class="q-mt-lg text-right">
            <q-btn :disable="accountList.length<=0" rounded unelevated color="primary" no-caps :label="$t('submit')" style="min-width: 100px" size="md"
                   @click="submitFunc(accountList.length)"></q-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- 输入秘钥弹窗 -->
    <GlobalDialog
      ref="securityDialogRef"
      :title="$t('secretKey')"
      :on-confirm-callback="createWithdrawFunc"
    >
      <q-input outlined v-model="withdrawParams.securityKey" type="password"
               :label="$t('enterSecretKey')"></q-input>
    </GlobalDialog>
  </div>
</template>

<script setup lang="ts">
import { withdrawCommon } from 'pages/common/wallets/withdraw';
import { accountCommon, assetsWithdrawalAccountMode, balanceWithdrawalAccountMode } from 'pages/common/wallets/account';
import { balanceDepositMode } from 'pages/common/wallets/order';
import { imageSrc } from 'src/utils';
import { onMounted } from 'vue';
import { userAssetsCommon } from 'pages/common/wallets/assets';
import { userInfoCommon } from 'pages/common/users/info';
import GlobalDialog from 'components/dialog.vue';

// 提现模块
const {
  securityDialogRef,
  mode,
  withdrawParams,
  currentAccount,
  switchPayment,
  submitFunc,
  createWithdrawFunc
} = withdrawCommon();

// 用户信息模块
const { userInfo, userInfoFunc } = userInfoCommon();

// 用户资产模块
const { userAssetsInfo, userAssetsDetailsFunc } = userAssetsCommon();

// 提现账户模块
const { accountList, accountListFunc } = accountCommon();

onMounted(async () => {
  // 获取提现账户
  await accountListFunc()
  if (accountList.value.length > 0) {
    currentAccount.value = accountList.value[0];
  }

  if (mode.value == balanceWithdrawalAccountMode) {
    // 如果mode==balanceWithdrawalAccountMode
    // 获取用户余额信息
    userInfoFunc();
  } else {
    // 获取用户资产信息
    userAssetsDetailsFunc()
  }
});

defineOptions({
  name: 'WalletsWithdraw'
});
</script>

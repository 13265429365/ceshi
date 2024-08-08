<template>
  <div class="q-pa-md bg-white">
    <!-- 没有银行卡 -->
    <div v-if="accountList.length <= 0">
      <q-banner rounded class="bg-red text-white q-mt-sm">
        {{ $t('notBindWithdrawAccount') }}
        <template v-slot:action>
          <q-btn @click="$router.push({ name: 'WalletsAccountIndex', query: {mode: mode} })" flat no-caps color="white"
                 :label="$t('gotoSetting') + $t('withdrawAccount')" />
        </template>
      </q-banner>
    </div>
    <!-- 账户类型选择 提现账户列表资金mode:1   提现账户列表资产mode:2 -->
    <div class="row q-col-gutter-md">
      <div v-for="(account, accountIndex) in accountList" :key="accountIndex" class="col-6">
        <div
          :style="{
            width: '100%',
            height: '50px',
            borderRadius: '8px',
            border: account.id == currentAccount.id ? '1px solid #31cbd2' : '',
          }"
          class="q-pa-sm row justify-center cursor-pointer relative-position bg-grey-3 no-wrap"
          @click="switchPayment(account)"
        >
          <q-img no-spinner class="q-mr-sm" :src="imageSrc(account.paymentInfo.icon)" width="32px" height="32px" />
          <div style="width: 60%" class="self-center ellipsis">
            {{ account.name == '' ? account.number : account.name }}
          </div>
          <q-img no-spinner v-if="account.id == currentAccount.id" class="absolute"
                 src="/src/assets/default/select.png"
                 width="30PX" height="30px" style="bottom: 0;right: 0;"></q-img>
        </div>
      </div>
    </div>

    <div class="column q-gutter-md q-mt-lg">
      <!-- 余额 -->
      <div>
        <div class="q-mb-xs">
          {{ $t('availableBalance') }}
        </div>

        <!-- mode==2显示资产余额 -->
        <div v-if="mode==assetsWithdrawalAccountMode" class="text-bold text-body1" style="color: #F45E0C;width: 170px">
          <span class="q-mr-sm">{{ Number(userAssetsInfo.userAssets.money).toFixed(2) }}</span>
          <span>{{ userAssetsInfo.name }}</span>
        </div>
        <!-- 否则显示资金余额 -->
        <div v-else class="text-bold text-body1" style="color: #F45E0C;width: 170px">
          <span>{{ $t('currency') }}</span>
          <span>{{ Number(userInfo.money).toFixed(2) }}</span>
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
              <q-btn flat dense :label="$t('all')" color="primary"
                     @click="mode==assetsWithdrawalAccountMode?withdrawParams.money = userAssetsInfo.userAssets.money:withdrawParams.money = userInfo.money"></q-btn>
            </template>
          </q-input>
        </div>
      </div>

      <!-- 提现提示 -->
      <div class="q-mt-lg q-mb-md text-grey">
        <div>{{ $t('withdrawDesc') }}</div>
      </div>

      <div class="q-mt-lg">
        <q-btn :disable="accountList.length<=0" rounded unelevated color="primary" no-caps :label="$t('submit')" size="lg"
               @click="submitFunc(accountList.length)" class="full-width"></q-btn>
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
</template>

<script setup lang="ts">
import { withdrawCommon } from 'pages/common/wallets/withdraw';
import { userInfoCommon } from 'pages/common/users/info';
import { userAssetsCommon } from 'pages/common/wallets/assets';
import { balanceDepositMode } from 'src/pages/common/wallets/order';
import { accountCommon, assetsWithdrawalAccountMode, balanceWithdrawalAccountMode } from 'pages/common/wallets/account';
import GlobalDialog from 'components/dialog.vue';
import { imageSrc } from 'src/utils';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

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
  await accountListFunc();
  if (accountList.value.length > 0) {
    currentAccount.value = accountList.value[0];
  }

  if (mode.value == balanceWithdrawalAccountMode) {
    // 如果mode==balanceWithdrawalAccountMode
    // 获取用户余额信息
    userInfoFunc();
  } else {
    // 获取用户资产信息
    userAssetsDetailsFunc();
  }
});

const $i18n = useI18n()
const emit = defineEmits(['update'])
emit('update', {
  title: mode.value == balanceWithdrawalAccountMode ? $i18n.t('withdraw') : $i18n.t('assetsWithdraw'),
  right: {
    callback: () => {},
    icon: ''
  },
})

defineOptions({
  name: 'WalletsWithdraw'
});
</script>

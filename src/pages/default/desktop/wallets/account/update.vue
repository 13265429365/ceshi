<template>
  <div class="column bg-grey-2" style="padding: 48px 244px;background: #F8F9FC;">
    <div class="col column justify-between bg-white rounded-borders">
      <!-- 大标题 -->
      <div class="q-py-md q-px-lg row items-center no-wrap text-body1 text-weight-medium"
           style="background: linear-gradient(275deg, rgba(19,140,91,0.1) 0%, rgba(1,172,102,0.04) 100%);border-radius: 8px 8px 0 0;">
        <q-img no-spinner src="/src/assets/default/account.png" width="40PX" height="28px"></q-img>
        <div class="q-ml-md"> {{ !createParams.id ? $t('create') : $t('edit') }}</div>
      </div>

      <div class="col full-width q-pa-lg">
        <!-- 类型选择 -->
        <div class="rounded-borders text-subtitle1 text-weight-medium q-py-xs q-px-md" style="background: #F8F9FC;">
          {{ $t('withdrawAccount') }}
        </div>

        <!-- 账户类型选择 银行卡:1 数字货币:2 -->
        <div class="row q-mt-md q-gutter-md">
          <div v-for="(payment, paymentIndex) in paymentList" :key="paymentIndex" :style="{
          width: '220px', height: '50px', borderRadius: '8px',
          border: payment.id == currentPayment.id ? '1px solid #31cbd2' : '',
          pointerEvents: createParams.id ? 'none' : 'auto',
        }" class="q-pa-sm row justify-center cursor-pointer relative-position bg-grey-3"
               @click="currentPayment = payment; ; createParams = {}">
            <q-img no-spinner class="q-mr-sm" :src="imageSrc(payment.icon)" width="32px" height="32px" />
            <div class="self-center ellipsis">{{ payment.name }}</div>
            <q-img no-spinner v-if="payment.id == currentPayment.id" class="absolute" src="/src/assets/default/select.png"
                   width="30PX" height="30px" style="bottom: 0;right: 0;"></q-img>
          </div>
        </div>

        <div class="text-subtitle1 text-weight-medium q-py-xs q-mt-lg q-px-md"
             style="border-radius: 2px;background: #F8F9FC;">
          {{ $t('accountInfo') }}
        </div>

        <!-- 账户信息 -->
        <div class="q-mt-lg q-pa-md column" style="width: 60%" v-if="currentPayment">
          <div class="q-gutter-y-md">
            <template v-for="accountInfo in currentPayment.data" :key="accountInfo">
              <div v-if="accountInfo.isShow">
                <div class="q-mb-sm" v-text="$t(accountInfo.label)"></div>
                <q-input class="full-width" outlined v-model="createParams[accountInfo.field]" :placeholder="$t(accountInfo.label)"></q-input>
              </div>
            </template>
          </div>

          <div class="q-mt-lg text-right">
            <q-btn rounded unelevated color="primary" no-caps :label="$t('submit')" style="min-width: 100px" size="md"
                   @click="submitFunc"></q-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- 输入秘钥弹窗 -->
    <GlobalDialog
      ref="securityDialogRef"
      :title="$t('secretKey')"
      :on-confirm-callback="updateAccountFunc"
    >
      <q-input outlined v-model="createParams.securityKey" type="password"
               :label="$t('enterSecretKey')"></q-input>
    </GlobalDialog>
  </div>
</template>

<script setup lang="ts">
import { accountCommon } from 'pages/common/wallets/account';
import { imageSrc } from 'src/utils';
import { onMounted } from 'vue';
import GlobalDialog from 'components/dialog.vue';

const { securityDialogRef, createParams, paymentList, currentPayment, walletsPaymentListFunc, submitFunc, updateAccountFunc } = accountCommon()

onMounted(()=>{
  // 获取支付列表
  walletsPaymentListFunc()
})

defineOptions({
  name: 'WalletsAccountUpdate'
});
</script>

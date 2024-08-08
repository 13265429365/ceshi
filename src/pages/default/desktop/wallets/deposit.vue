<template>
  <div class="column bg-grey-2" style="padding: 48px 244px;background: #F8F9FC;">
    <div class="col column justify-between bg-white rounded-borders">
      <!-- 大标题 -->
      <div class="q-py-md q-px-lg row items-center no-wrap text-body1 text-weight-medium"
           style="background: linear-gradient(275deg, rgba(19,140,91,0.1) 0%, rgba(1,172,102,0.04) 100%);border-radius: 8px 8px 0 0;">
        <q-img no-spinner src="/src/assets/default/account.png" width="40PX" height="28px"></q-img>
        <div class="q-ml-md">
          {{ mode == balanceDepositMode ? $t('deposit') : $t('assetsDeposit') }}
        </div>
      </div>

      <div class="col full-width q-pa-lg">
        <div class="rounded-borders text-subtitle1 text-weight-medium q-py-xs q-px-md" style="background: #F8F9FC;">
          {{ $t('accountInfo') }}
        </div>

        <!-- 账户类型选择 资金充值模式:1 资产充值模式:2 -->
        <div class="row q-mt-md q-gutter-md">
          <div
            v-for="(payment, paymentIndex) in paymentList"
            :key="paymentIndex"
            :style="{
              width: '220px',
              height: '50px',
              borderRadius: '8px',
              border: payment.id === currentPayment.id ? '1px solid #31cbd2' : ''
            }"
            class="q-pa-sm row justify-center cursor-pointer relative-position bg-grey-3"
            @click="switchPayment(payment)"
          >
            <q-img no-spinner class="q-mr-sm" :src="imageSrc(payment.icon)" width="32px" height="32px" />
            <div class="self-center ellipsis">{{ payment.name }}</div>
            <q-img no-spinner v-if="payment.id == currentPayment.id" class="absolute"
                   src="/src/assets/default/select.png"
                   width="30PX" height="30px" style="bottom: 0;right: 0;"></q-img>
          </div>
        </div>

        <!-- 充值方式 -->
        <div v-if="currentPayment">
          <div v-if="currentPayment.type==cardType1" class="q-pa-md rounded-borders q-mt-md">
            <div style="border-bottom: 1px dashed #ddd" class="q-pb-sm text-h6">
              {{ $t('accountInfo') }}
            </div>
            <div v-for="(accountInfo, accountIndex) in currentPayment.data" :key="accountIndex">
              <div class="row justify-between q-mt-md" v-if="accountInfo.isShow">
                <div v-text="accountInfo.value" class="text-body1"></div>
                <div @click="copyFunc(accountInfo.value)" class="text-green cursor-pointer">{{ $t('copy') }}</div>
              </div>
            </div>
          </div>

          <!-- 二维码 -->
          <div v-else class="column items-center q-mt-lg q-gutter-y-sm">
            <div class="text-h6">{{ $t('addressInfo') }}</div>
            <div class="q-my-md">
              <img :src="currentQrcode" alt="">
            </div>

            <div v-for="(accountInfo, accountIndex) in currentPayment.data" :key="accountIndex" style="width: 310px">
              <div v-if="accountInfo.isShow">
                <q-input outlined v-model="accountInfo.value" readonly>
                  <template v-slot:append>
                    <q-icon name="content_copy" class="cursor-pointer" size="xs"
                            @click="copyFunc(accountInfo.value)"></q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
        </div>

        <!-- 充值金额、充值凭证 -->
        <div class="column q-gutter-md q-mt-lg" style="width: 60%;">
          <div>
            <div class="q-mb-sm">
              {{ $t('money') }}
              <span v-if="paymentList.length > 0 && mode == balanceDepositMode">
                1{{ currentPayment.name }} ≈ {{ $t('currency') }}{{ currentPayment.rate }}
              </span>
            </div>
            <q-input type="number" outlined v-model="createParams.money" :placeholder="$t('money')">
              <template v-slot:append>
                <div class="column" v-if="paymentList.length > 0 && mode == balanceDepositMode">
                  <div class="text-caption">≈
                    <span>{{ $t('currency') }}{{ (currentPayment.rate * (createParams.money ?? 0)).toFixed(2) }}</span>
                  </div>
                </div>
              </template>
            </q-input>
          </div>

          <div class="q-mb-xl">
            <div class="q-mb-xs">
              {{ $t('proof') }}
            </div>
            <div style="width: 170px;">
              <uploader @uploaded="(url) => { createParams.voucher = url }">
                <template v-slot:default>
                  <q-uploader-add-trigger />
                  <q-card flat>
                    <div class="column items-center justify-center" style="height: 150px;border: grey 1px dashed">
                      <q-icon name="add" color="grey" size="40px" v-if="createParams.voucher == ''" />
                      <q-img no-spinner v-else :src="imageSrc(createParams.voucher)"></q-img>
                    </div>
                  </q-card>
                </template>
              </uploader>
            </div>
          </div>

          <!-- 充值提示 -->
          <div class="q-mt-lg q-mb-md text-grey">
            <div>{{ $t('depositDesc') }}</div>
          </div>

          <div class="q-mt-lg text-right">
            <q-btn rounded unelevated color="primary" no-caps :label="$t('submit')" style="min-width: 100px" size="md"
                   @click="createDepositFunc"></q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { balanceDepositMode } from 'src/pages/common/wallets/order';
import { cardType1 } from 'pages/common/wallets/account';
import uploader from 'src/components/uploader.vue';
import { imageSrc } from 'src/utils';
import { depositCommon } from 'pages/common/wallets/deposit';
import { onMounted } from 'vue';

const { mode, createParams, paymentList, currentPayment, currentQrcode, walletsPaymentListFunc, switchPayment, createDepositFunc, copyFunc } = depositCommon();

onMounted(()=>{
  // 获取提现账户类型列表
  walletsPaymentListFunc()
})

defineOptions({
  name: 'WalletsDeposit'
});
</script>

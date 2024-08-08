<template>
  <div class="q-pa-md">
    <!-- 账户类型选择 -->
    <div class="text-body2 q-mb-sm">
      {{ mode == balanceDepositMode ? $t('deposit') : $t('assetsDeposit') }}
    </div>
    <div class="row q-col-gutter-sm">
      <div v-for="(payment, paymentIndex) in paymentList" :key="paymentIndex" class="col-6">
        <div :style="{
            width: '100%', height: '50px', borderRadius: '8px',
            border: payment.id === currentPayment.id ? '1px solid #31cbd2' : '',
          }" class="q-pa-sm row no-wrap justify-center cursor-pointer relative-position bg-grey-2"
             @click="switchPayment(payment)">
          <div style="width: 32px">
            <q-img no-spinner :src="imageSrc(payment.icon)" width="32px" height="32px" />
          </div>
          <div style="width: calc(100% - 35px)" class="q-ml-sm self-center ellipsis">{{ payment.name }}</div>
          <q-img no-spinner v-if="payment.id === currentPayment.id" class="absolute" src="/src/assets/default/select.png"
                 width="30PX" height="30px" style="bottom: 0;right: 0;"></q-img>
        </div>
      </div>
    </div>

    <!-- 充值方式 -->
    <div v-if="currentPayment">
      <div v-if="currentPayment.type==cardType1" class="q-pa-md bg-grey-2 rounded-borders q-mt-md">
        <div style="border-bottom: 1px dashed #ddd" class="q-pb-sm text-body2">
          {{$t('accountInfo')}}
        </div>
        <div v-for="(accountInfo, accountIndex) in currentPayment.data" :key="accountIndex">
          <div class="row justify-between q-mt-md" v-if="accountInfo.isShow">
            <div v-text="accountInfo.value" class="text-body1"></div>
            <div @click="copyFunc(accountInfo.value)" class="text-green">{{ $t('copy') }}</div>
          </div>
        </div>
      </div>

      <!-- 二维码 -->
      <div v-else class="column items-center q-mt-lg">
        <div class="column q-gutter-sm full-width">
          <div class="q-my-md text-center">
            <div class="text-center q-my-xs">{{ $t('addressInfo') }}</div>
            <img :src="currentQrcode" alt="">
          </div>

          <div v-for="(accountInfo, accountIndex) in currentPayment.data" :key="accountIndex">
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
    </div>

    <!-- 充值信息 -->
    <div class="column full-width q-mt-md">
      <div class="q-my-sm">
        <div class="q-mb-sm">
          {{ $t('money') }}
          <span v-if="paymentList.length > 0 && mode == balanceDepositMode">
            1{{ currentPayment.name }} ≈ {{$t('currency')}}{{ currentPayment.rate  }}
          </span>
        </div>
        <q-input type="number" :placeholder="$t('money')" outlined v-model="createParams.money">
          <template v-slot:append>
            <div class="column" v-if="paymentList.length > 0 && mode == balanceDepositMode">
              <div class="text-caption">
                ≈
                <span>{{$t('currency')}}{{( currentPayment.rate * (createParams.money ?? 0)).toFixed(2)}}</span>
              </div>
            </div>
          </template>
        </q-input>
      </div>
      <div class="q-my-sm" v-if="paymentList.length > 0 && currentPayment.isVoucher == 1">
        <div class="q-mb-xs">
          {{ $t('proof') }}
        </div>
        <div>
          <uploader @uploaded="(url) => { createParams.voucher = url }">
            <template v-slot:default>
              <q-uploader-add-trigger />
              <q-card flat>
                <div class="column items-center justify-center" style="height: 150px;border: grey 1px dashed">
                  <q-icon name="add" color="grey" size="30px" v-if="createParams.voucher == ''" />
                  <q-img no-spinner v-else :src="imageSrc(createParams.voucher)"></q-img>
                </div>
              </q-card>
            </template>
          </uploader>
        </div>
      </div>

      <div class="q-mt-lg q-mb-md text-grey">
        <div>{{ $t('depositDesc') }}</div>
      </div>

      <q-btn unelevated rounded color="primary" :label="$t('submit')" class="q-my-md" no-caps @click="createDepositFunc"
             size="lg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { depositCommon } from 'pages/common/wallets/deposit';
import { balanceDepositMode } from 'src/pages/common/wallets/order';
import { cardType1 } from 'pages/common/wallets/account';
import uploader from 'src/components/uploader.vue';
import { imageSrc } from 'src/utils';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { mode, createParams, paymentList, currentPayment, currentQrcode, walletsPaymentListFunc, switchPayment, createDepositFunc, copyFunc } = depositCommon();

onMounted(()=>{
  // 获取提现账户类型列表
  walletsPaymentListFunc()
})

const $i18n = useI18n()
const emit = defineEmits(['update'])
emit('update', {
  title: mode.value == balanceDepositMode ? $i18n.t('deposit') : $i18n.t('assetsDeposit'),
  right: {
    callback: () => {},
    icon: ''
  },
})

defineOptions({
  name: 'WalletsDeposit'
});
</script>

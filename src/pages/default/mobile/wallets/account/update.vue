<template>
  <div class="col q-pa-md full-width column justify-between">
    <div class="col full-width row justify-center">
      <!-- 账户类型选择 1：银行卡  2：数字货币 -->
      <div class="row q-col-gutter-md">
        <div v-for="(payment, paymentIndex) in paymentList" :key="paymentIndex" class="col-6">
          <div :style="{
            width: '100%', height: '50px', borderRadius: '8px',
            border: payment.id == currentPayment.id ? '1px solid #31cbd2' : '',
            pointerEvents: createParams.id ? 'none' : 'auto',
          }" class="q-pa-sm row no-wrap justify-center cursor-pointer relative-position bg-grey-2"
               @click="currentPayment = payment; createParams = {}">
            <div style="width: 32px">
              <q-img no-spinner :src="imageSrc(payment.icon)" width="32px" height="32px" />
            </div>
            <div style="width: calc(100% - 35px)" class="q-ml-sm self-center ellipsis" v-text="payment.name"></div>
            <q-img no-spinner v-if="payment.id == currentPayment.id" class="absolute"
                   src="/src/assets/default/select.png"
                   width="30PX" height="30px" style="bottom: 0;right: 0;"></q-img>
          </div>
        </div>
      </div>

      <!-- 账户信息 -->
      <div class="q-mt-lg full-width column" v-if="currentPayment">
        <div class="q-gutter-y-md">
          <template v-for="accountInfo in currentPayment.data" :key="accountInfo">
            <div v-if="accountInfo.isShow">
              <div class="q-mb-sm" v-text="$t(accountInfo.label)"></div>
              <q-input outlined v-model="createParams[accountInfo.field]"
                       :placeholder="$t(accountInfo.label)"></q-input>
            </div>
          </template>
        </div>

        <div class="q-mt-lg text-right">
          <q-btn rounded unelevated color="primary" size="lg" no-caps :label="$t('submit')" class="full-width"
                 @click="submitFunc"></q-btn>
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
import { useI18n } from 'vue-i18n';

const {
  securityDialogRef,
  createParams,
  paymentList,
  currentPayment,
  id,
  walletsPaymentListFunc,
  submitFunc,
  updateAccountFunc
} = accountCommon();

onMounted(() => {
  // 获取支付列表
  walletsPaymentListFunc();
});

const $i18n = useI18n();
const emit = defineEmits(['update']);
emit('update', {
  title: id ? $i18n.t('edit') + $i18n.t('withdrawAccount') : $i18n.t('create') + $i18n.t('withdrawAccount'),
  right: {
    callback: () => {
    },
    icon: ''
  }
});

defineOptions({
  name: 'WalletsAccountUpdate'
});
</script>

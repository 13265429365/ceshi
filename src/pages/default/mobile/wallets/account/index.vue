<template>
  <div class="column full-height full-width">
    <div class="col q-pa-md full-width column justify-between">
      <q-tabs
        v-model="mode"
        @update:model-value="accountListFunc"
        align="left"
        narrow-indicator
        class="q-mb-lg"
        active-color="primary"
      >
        <q-tab :name="balanceWithdrawalAccountMode" :label="$t('withdraw')" />
        <q-tab :name="assetsWithdrawalAccountMode" :label="$t('assetsWithdraw')" />
      </q-tabs>

      <div class="col full-width">
        <q-card flat v-for="(account, accountIndex) in accountList" :key="accountIndex"
                :style="bgList.get(account.paymentInfo.type)" class="q-mb-sm">
          <q-card-section>
            <div class="row justify-between">
              <div class="row">
                <div>
                  <q-avatar>
                    <q-img no-spinner :src="imageSrc(account.paymentInfo.icon)" width="48px" height="48px"></q-img>
                  </q-avatar>
                </div>
                <div class="q-ml-md text-white">
                  <div class="q-mt-xs">
                    <div class="text-body1 text-bold">
                      <span v-text="account.paymentInfo.name"></span>
                      <q-btn v-if="$initStore.setting.wallets.showAccountUpdate" rounded unelevated size="xs"
                             class="q-ml-sm"
                             style="border: 1px solid #fff; padding: 0 10px"
                             @click="$router.push({ name: 'WalletsAccountUpdate', query: { id: account.id, mode: account.paymentInfo.mode } })">
                        <div style="font-size: 12px">{{ $t('edit') }}</div>
                      </q-btn>
                    </div>
                    <div class="text-caption text-grey-2" v-text="account.paymentInfo.type == balanceWithdrawalAccountMode ? account.name : $t('digitalCurrency')"></div>
                  </div>

                  <div class="q-mt-md">
                    <div class="text-caption text-grey-2" v-text="account.paymentInfo.type == balanceWithdrawalAccountMode ? $t('bankNumber') : $t('bankAddress')"></div>
                    <div v-if="$initStore.setting.wallets.showAccountNumber" class="text-body1 text-bold ellipsis" style="max-width: 200px" v-text="account.number"></div>
                    <div v-else class="text-body1 text-bold" v-text="'****' + account.number.slice(-4)"></div>
                  </div>
                </div>

              </div>
              <div class="text-right">
                <q-icon v-if="$initStore.setting.wallets.showAccountDelete" color="white" class="cursor-pointer" size="18px" name="cancel"
                        @click="currentAccountInfo = account;deleteDialogRef.openFunc();"></q-icon>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- 添加按钮 -->
        <div style="border: 1px dashed #31cbd2;height: 40px;background-color: rgba(1, 172, 102, 0.05);"
             class="rounded-borders column justify-center row q-mt-md"
             @click="$router.push({ name: 'WalletsAccountUpdate', query: { mode: mode==balanceWithdrawalAccountMode?balancePaymentMode:assetsPaymentMode } })">
          <div class="text-center text-primary text-weight-bold self-center row">
            <q-icon size="20px" name="add"
                    class="self-center" />
            {{ $t('create') }}
          </div>
        </div>
      </div>

    </div>

    <!-- 输入秘钥弹窗 -->
    <GlobalDialog
      ref="securityDialogRef"
      :title="$t('secretKey')"
      :on-confirm-callback="submitDeleteFunc"
    >
      <q-input outlined v-model="deleteParams.securityKey" type="password"
               :label="$t('enterSecretKey')"></q-input>
    </GlobalDialog>

    <!-- 删除提示弹窗 -->
    <GlobalDialog
      ref="deleteDialogRef"
      :title="$t('delete')"
      :message="`${$t('delete')}【${currentAccountInfo.number}】${$t('withdrawAccount')}`"
      :on-confirm-callback="deleteAccountFunc"
    ></GlobalDialog>
  </div>
</template>

<script setup lang="ts">
import { balancePaymentMode, assetsPaymentMode, balanceWithdrawalAccountMode, assetsWithdrawalAccountMode, bgList, accountCommon } from 'pages/common/wallets/account';
import GlobalDialog from 'components/dialog.vue';
import { imageSrc } from 'src/utils';
import { initStore } from 'stores/init';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const $initStore = initStore()
const {
  deleteParams,
  accountList,
  currentAccountInfo,
  securityDialogRef,
  deleteDialogRef,
  mode,
  accountListFunc,
  submitDeleteFunc,
  deleteAccountFunc
} = accountCommon();

onMounted(()=>{
  // 获取提现账户列表
  accountListFunc()
})

const $i18n = useI18n();
const emit = defineEmits(['update'])
emit('update', {
  title: $i18n.t('withdrawAccount'),
  right: {
    callback: () => {},
    icon: ''
  },
})

defineOptions({
  name: 'WalletsAccountIndex'
});
</script>

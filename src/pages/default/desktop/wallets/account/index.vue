<template>
  <div style="padding: 48px 100px;">
    <div>
      <div class="text-h5 q-mb-md">{{ $t('withdrawAccount') }}</div>
    </div>

    <div>
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

      <div class="row q-col-gutter-sm items-center">
        <div v-for="(account, accountIndex) in accountList" :key="accountIndex" class="col-6">
          <q-card flat :style="bgList.get(account.paymentInfo.type)">
            <q-card-section>
              <div class="row justify-between no-wrap">
                <div class="row no-wrap">
                  <div>
                    <q-avatar>
                      <q-img no-spinner :src="imageSrc(account.paymentInfo.icon)" width="48px" height="48px"></q-img>
                    </q-avatar>
                  </div>
                  <div class="q-ml-sm text-white">
                    <div class="q-mt-xs">
                      <div class="text-body1 text-bold row no-wrap">
                        {{ account.paymentInfo.name }}
                        <q-btn v-if="$initStore.setting.wallets.showAccountUpdate" rounded unelevated size="xs"
                               class="q-ml-sm"
                               style="border: 1px solid #fff; padding: 0 10px"
                               @click="$router.push({ name: 'WalletsAccountUpdate', query: { id: account.id, mode: account.paymentInfo.mode } })">
                          <div style="font-size: 12px">{{ $t('edit') }}</div>
                        </q-btn>
                      </div>
                      <div class="text-caption text-grey-2">
                        {{ account.paymentInfo.type == balanceWithdrawalAccountMode ? account.name : $t('digitalCurrency')
                        }}
                      </div>
                    </div>

                    <div class="q-mt-md">
                      <div class="text-caption text-grey-2">
                        {{
                          account.paymentInfo.type == balancePaymentMode ?
                            $t('bankNumber') :
                            $t('bankAddress')
                        }}
                      </div>
                      <div v-if="$initStore.setting.wallets.showAccountNumber" class="text-body1 text-bold">
                        {{ account.number }}
                      </div>
                      <div v-else class="text-body1 text-bold">****{{ account.number.slice(-4) }}</div>
                    </div>
                  </div>

                </div>
                <div class="text-right">
                  <q-icon v-if="$initStore.setting.wallets.showAccountDelete" color="white" class="cursor-pointer"
                          size="18px" name="cancel"
                          @click="currentAccountInfo = account;deleteDialogRef.openFunc();"></q-icon>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- 添加按钮 -->
        <div>
          <div
            @click="$router.push({ name: 'WalletsAccountUpdate', query: { mode: mode==balanceWithdrawalAccountMode?balancePaymentMode:assetsPaymentMode } })"
            class="column justify-center row cursor-pointer"
            style="
              border: 1px dashed rgba(221, 221, 221, 0.8);
              height: 145px;
              width: 145px;
              background: rgba(221, 221, 221, 0.16);
              border-radius: 6px;
           ">
            <div class="text-center">
              <q-icon size="42px" name="add" class="self-center text-grey-4" />
            </div>
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
import {
  assetsPaymentMode,
  assetsWithdrawalAccountMode,
  balancePaymentMode,
  balanceWithdrawalAccountMode,
  bgList,
  accountCommon
} from 'pages/common/wallets/account';
import GlobalDialog from 'src/components/dialog.vue';
import { initStore } from 'stores/init';
import { imageSrc } from 'src/utils';
import { onMounted } from 'vue';

const $initStore = initStore();
const {
  deleteDialogRef,
  securityDialogRef,
  deleteParams,
  accountList,
  mode,
  currentAccountInfo,
  accountListFunc,
  submitDeleteFunc,
  deleteAccountFunc
} = accountCommon();

onMounted(() => {
  // 获取提现账户列表
  accountListFunc();
});

defineOptions({
  name: 'WalletsAccountIndex'
});
</script>

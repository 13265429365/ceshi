<template>
  <div class="row justify-between q-gutter-md q-mb-md">
    <div class="col">
      <q-btn
        @click="$router.push({name: 'WalletsDeposit', query: { mode, assetsId }})"
        class="bg-white q-py-sm rounded-borders full-width"
        no-caps
        unelevated
      >
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-img no-spinner class="q-mr-sm" src="/src/assets/default/deposit.png" width="42px" height="42px" />
          </q-item-section>
          <q-item-section>
            <div>{{ mode === balanceDepositMode ? $t('deposit') : $t('assetsDeposit') }}</div>
          </q-item-section>
        </q-item>
      </q-btn>
    </div>
    <div class="col">
      <q-btn
        @click="$router.push({name: 'WalletsWithdraw', query: { mode, id: assetsId }})"
        class="bg-white q-py-sm rounded-borders full-width"
        no-caps
        unelevated
      >
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-img no-spinner class="q-mr-sm" src="/src/assets/default/withdraw.png" width="42px" height="42px" />
          </q-item-section>
          <q-item-section>
            <div>{{ mode === balanceDepositMode ? $t('withdraw') :$t('assetsWithdraw') }}</div>
          </q-item-section>
        </q-item>
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { balanceDepositMode } from 'src/pages/common/wallets/order';

defineProps({
  mode: {
    default: () =>{
      return balanceDepositMode
    }
  },
  assetsId: {
    default: () =>{
      return 0
    }
  }
})

defineOptions({
  name: 'moreMenuIndex'
});
</script>

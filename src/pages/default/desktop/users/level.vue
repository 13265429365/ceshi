<template>
  <div style="margin: 80px 0 120px 0">
    <div class="text-center q-mb-xl">
      <div class="text-h5" style="font-size: 32px;">{{ $t('levelSmall') }}</div>
    </div>

    <div class="column items-center">
      <q-scroll-area style="height: 440px; width: 80%" :thumb-style="{ height: '0' }">
        <div class="row no-wrap q-pt-lg q-gutter-sm">
          <q-card v-for="(level, levelIndex) in levelList" :key="levelIndex" :style="{
            width: '288px', height: '400px', borderRadius: '8px',
            boxShadow: '0px 4px 10px 0px rgba(192,192,192,0.3)',
          }" class="cursor-pointer">
            <div :style="{
              height: '160px',
              background: 'linear-gradient(180deg, #10BE70 0%, #91DB82 100%)',
              color: 'white'
            }" class="q-pb-md">
              <q-img no-spinner class="absolute" :src="imageSrc(level.icon)" width="54px" height="54px"
                     style="top: 0; left: 50%; transform: translate(-50%, -36%);z-index: 999;"></q-img>
              <div style="height: 64px;"></div>
              <div class="text-center text-body1">{{ level.name }}</div>
              <div class="text-center">
                <span class="text-caption">{{ $t('currency') }}</span>
                <span class="text-h5 text-bold">{{ level.money }}</span>
              </div>
            </div>
            <q-card-section>
              <div class="q-mt-md">
                <q-btn :disable="level.symbol <= userInfo.levelInfo.symbol" @click="currentLevel = level;buyDialogRef?.openFunc()" no-caps outline rounded
                       color="primary" class="full-width"
                       :label="level.symbol <= userInfo.levelInfo.symbol ? $t('purchased') : $t('buy')"></q-btn>
              </div>
              <div v-html="level.Desc" class="q-mt-lg"></div>
            </q-card-section>
          </q-card>
        </div>
      </q-scroll-area>
    </div>

    <!-- 确认购买弹窗 -->
    <GlobalDialog
      ref="buyDialogRef"
      :title="$t('userLevel')"
      :message="`${$t('isBuy')}【 ${currentLevel.name} 】?`"
      :on-confirm-callback="createLevelFunc"
    ></GlobalDialog>
  </div>
</template>

<script setup lang="ts">
import { levelCommon } from 'pages/common/users/level';
import GlobalDialog from 'src/components/dialog.vue';
import { imageSrc } from 'src/utils';
import { onMounted } from 'vue';

const { buyDialogRef, userInfo, levelList, currentLevel, levelListFunc, createLevelFunc } = levelCommon()

onMounted(()=>{
  // 获取会员列表
  levelListFunc()
})

defineOptions({
  name: 'UserLevelIndex'
})
</script>

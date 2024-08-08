<template>
  <div class="column full-height" style="width: 100%;">
    <div class="col bg-white q-pa-md">
      <div class="q-mt-md row  q-pa-md" :style="{
        backgroundImage: 'url(/src/assets/default/level-bg.png)',
        height: '80px', width: '100%', backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat', position: 'relative'}">
        <q-img no-spinner src="/src/assets/default/level.png" width="93px" height="66px"
               style="position: absolute;top: -13px;right: 0;" />
        <div class="col-10 column">
          <div style="color: #FEC183;" class="text-h6">{{ $t('userLevel') }}</div>
          <div style="color: #FEC183;" class="text-caption full-width col">
            <div class="ellipsis ">
              {{ $t('levelSmall') }}
            </div>
          </div>
        </div>
      </div>

      <div class="row q-col-gutter-sm q-mt-md">
        <div class="col-6" v-for="(level, levelIndex) in levelList" :key="levelIndex">
          <div :style="{
            border: `2px solid ${level.id == currentLevel.id ? '#31cbd2' : '#F5F6FA'}`}"
               class="rounded-borders column justify-center items-center"
               :class="level.id == currentLevel.id ? 'bg-green-1' : 'bg-grey-1'"
               @click="currentLevel = level">
            <div class="q-my-md">
              <q-img no-spinner :src="imageSrc(level.icon)" width="46px"></q-img>
            </div>

            <div class="text-body2 text-grey" v-text="level.name"></div>
            <div class="self-center text-primary text-h5 text-weight-bold q-mb-md">
              <div class="row items-center">
                <div class="text-h6">{{ $t('currency') }}</div>
                <div v-text="level.money"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="q-ml-md q-mt-md" v-html="currentLevel.Desc ?? ''"></div>

      <q-btn :disable="currentLevel.symbol <= userInfo.levelInfo.symbol"
             @click="buyDialogRef?.openFunc()" unelevated rounded size="lg" color="primary"
             :label="currentLevel.symbol <= userInfo.levelInfo.symbol ? $t('purchased') : $t('buyLevel')"
             class="full-width q-my-xl" no-caps style="height: 44px;" />
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
import GlobalDialog from 'components/dialog.vue';
import { onMounted } from 'vue';
import { imageSrc } from 'src/utils';
import { useI18n } from 'vue-i18n';

const { buyDialogRef, userInfo, levelList, currentLevel, levelListFunc, createLevelFunc } = levelCommon();

onMounted(()=>{
  // 获取会员列表
  levelListFunc()
})

const $i18n = useI18n()
const emit = defineEmits(['update'])
emit('update', {
  title: $i18n.t('userLevel'),
  right: {
    callback: () => {},
    icon: ''
  },
})

defineOptions({
  name: 'UserLevelIndex'
});
</script>

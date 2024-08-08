<template>
  <div class="column bg-secondary" style="height: calc(100vh - 52px)">
    <div class="col column">
      <div class="rounded-borders bg-white column items-center q-py-md" style="width: 90%;margin: 36px auto;">

        <q-img no-spinner :src="imageSrc($initStore.config.logo)" class="q-mt-lg" width="60px" height="60px" />

        <div class="text-color-3 text-h6 q-mt-md">{{ $t('userInvite') }}</div>

        <img :src="inviteImage" alt="">

        <div class="text-grey-7 text-weight-medium" style="margin: 20px 0 10px 0;">{{ $t('copy') }}</div>

        <div class="text-weight-regular text-black ellipsis  q-pa-sm text-body1"
             style="background-color: #F4F5F8;width: 238px;border-radius: 10px;">
          {{ inviteUrl }}
        </div>

        <q-btn unelevated rounded style="margin: 30px 0 20px 0;width: 230px;height: 40px;" color="primary"
               :label="$t('copy')" no-caps @click="copyToClipboardFunc" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inviteCommon } from 'pages/common/users/invite';
import { imageSrc } from 'src/utils';
import { onMounted } from 'vue';
import { initStore } from 'stores/init';
import { useI18n } from 'vue-i18n';

const $initStore = initStore();
const { inviteUrl, inviteImage, userInviteFunc, copyToClipboardFunc } = inviteCommon();

onMounted(() => {
  // 获取邀请码
  userInviteFunc();
});

const $i18n = useI18n()
const emit = defineEmits(['update'])
emit('update', {
  title: $i18n.t('userInvite'),
  right: {
    callback: () => {},
    icon: ''
  },
})

defineOptions({
  name: 'InviteIndex'
});
</script>

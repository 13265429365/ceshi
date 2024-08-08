<template>
  <div style="padding: 80px 0 260px">
    <div class="row justify-center items-center">
      <div class="col text-right">
        <q-img no-spinner class="q-mr-xl" width="300px" src="/src/assets/default/download-bg.svg"></q-img>
      </div>
      <div class="col-1"></div>
      <div class="col">
        <div style="width: 310px" class="text-center">
          <div class="text-h3 text-bold">{{ $initStore.config.name }}</div>
          <div class="text-h6 text-grey q-mt-sm">{{ $t('inviteFriendsSmall') }}</div>

          <div class="column items-center q-mt-xl">
            <q-card bordered flat style="border-radius: 10px;width: 210px;">
              <q-card-section>
                <img :src="inviteImage" alt="">
              </q-card-section>
            </q-card>
            <div class="q-mt-md" style="width: 310px">
              <q-input outlined dense v-model="inviteUrl" readonly>
                <template v-slot:append>
                  <q-icon name="content_copy" class="cursor-pointer" size="xs" @click="copyToClipboardFunc"></q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inviteCommon } from 'pages/common/users/invite';
import { onMounted } from 'vue';
import { initStore } from 'stores/init';

const $initStore = initStore();
const { inviteUrl, inviteImage, userInviteFunc, copyToClipboardFunc } = inviteCommon()

onMounted(()=>{
  // 获取邀请码
  userInviteFunc()
})

defineOptions({
  name: 'InviteIndex'
});
</script>

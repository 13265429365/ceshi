<template>
  <div class="column full-height">
    <div class="col bg-white q-pa-md">
      <div v-if="params.status == failedAuth">
        <q-banner rounded class="bg-red text-white q-mt-sm">
          <div v-text="params.data"></div>
        </q-banner>
      </div>

      <!-- 姓名 -->
      <div v-if="$initStore.setting.auth.showRealName">
        <div class="text-weight-medium q-pb-sm q-mt-lg">{{ $t('idName') }}</div>
        <q-input :placeholder="$t('idName')" outlined
                 :readonly="params.status == pendingAuth || params.status == successAuth"
                 v-model="params.realName"
                 class="q-mb-md" />
      </div>

      <!-- 身份证 -->
      <div v-if="$initStore.setting.auth.showNumber">
        <div class="text-weight-medium q-pb-sm">{{ $t('idNumber') }}</div>
        <q-input :placeholder="$t('idNumber')" outlined
                 :readonly="params.status == pendingAuth || params.status == successAuth"
                 v-model="params.number"
                 class="q-mb-md" />
      </div>

      <!-- 地址 -->
      <div v-if="$initStore.setting.auth.showAddress">
        <div class="text-weight-medium q-pb-sm">{{ $t('idAddress') }}</div>
        <q-input :placeholder="$t('idAddress')" outlined
                 :readonly="params.status == pendingAuth || params.status == successAuth"
                 v-model="params.address"
                 class="q-mb-md" />
      </div>

      <div class="text-weight-medium">{{ $t('idPhoto') }}</div>

      <div class="col">
        <uploader :respValue="params.photo1" @uploaded="(url) => { params.photo1 = url }">
          <template v-slot:default>
            <q-uploader-add-trigger v-if="params.status == nowAuth || params.status == failedAuth" />
            <q-card flat>
              <div class="column items-center justify-center" style="height: 150px;border: grey 1px dashed">
                <q-icon name="add" color="grey" size="30px" v-if="params.photo1 == ''" />
                <q-img no-spinner v-else :src="imageSrc(params.photo1)"></q-img>
              </div>
            </q-card>
          </template>
        </uploader>
        <div class="text-caption text-weight-medium text-center q-mt-sm">{{ $t('idPhoto1') }}</div>
      </div>

      <div v-if="$initStore.setting.auth.showPhoto2" class="col q-mt-lg">
        <uploader :respValue="params.photo2" @uploaded="(url) => { params.photo2 = url }">
          <template v-slot:default>
            <q-uploader-add-trigger v-if="params.status == nowAuth || params.status == failedAuth" />
            <q-card flat>
              <div class="column items-center justify-center" style="height: 150px;border: grey 1px dashed">
                <q-icon name="add" color="grey" size="30px" v-if="params.photo2 == ''" />
                <q-img no-spinner v-else :src="imageSrc(params.photo2)"></q-img>
              </div>
            </q-card>
          </template>
        </uploader>
        <div class="text-caption text-weight-medium text-center q-mt-sm">{{ $t('idPhoto2') }}</div>
      </div>

      <div v-if="$initStore.setting.auth.showPhoto3" class="col q-mt-lg">
        <uploader :respValue="params.photo3" @uploaded="(url) => { params.photo3 = url }">
          <template v-slot:default>
            <q-uploader-add-trigger v-if="params.status == nowAuth || params.status == failedAuth" />
            <q-card flat>
              <div class="column items-center justify-center" style="height: 150px;border: grey 1px dashed">
                <q-icon name="add" color="grey" size="30px" v-if="params.photo3 == ''" />
                <q-img no-spinner v-else :src="imageSrc(params.photo3)"></q-img>
              </div>
            </q-card>
          </template>
        </uploader>
        <div class="text-caption text-weight-medium text-center q-mt-sm">{{ $t('idPhoto3') }}</div>
      </div>

      <q-btn v-if="params.status == nowAuth" unelevated rounded color="primary" size="lg" :label="$t('submit')"
             class="full-width q-my-xl" no-caps @click="createUserAuthFunc" />
      <q-btn v-if="params.status == failedAuth" unelevated rounded color="primary" size="lg"
             :label="$t('reSubmit')" class="full-width q-my-xl" no-caps @click="createUserAuthFunc" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { userAuthCommon } from 'pages/common/users/auth';
import uploader from 'src/components/uploader.vue';
import { imageSrc } from 'src/utils';
import { initStore } from 'stores/init';
import { onMounted } from 'vue';
import { nowAuth, pendingAuth, successAuth, failedAuth } from 'src/pages/common/users/auth';
import { useI18n } from 'vue-i18n';

const $initStore = initStore()
const { params, createUserAuthFunc, userAuthInfoFunc } = userAuthCommon();

onMounted(()=>{
  // 获取用户实名信息
  userAuthInfoFunc()
})

const $i18n = useI18n()
const emit = defineEmits(['update'])
emit('update', {
  title: $i18n.t('userAuth'),
  right: {
    callback: () => {},
    icon: ''
  },
})

defineOptions({
  name: 'UserAuthIndex'
});
</script>

<template>
  <div class="row justify-center q-py-xl">
    <div class="col-6">
      <div v-if="params.status == failedAuth">
        <q-banner rounded class="bg-red text-white q-mt-sm">
          {{ params.data }}
        </q-banner>
      </div>
      <div class="text-h5 q-mt-md">{{ $t('userAuth') }}</div>
      <div class="q-gutter-md q-mt-lg">
        <!--  姓名 -->
        <div v-if="$initStore.setting.auth.showRealName">
          <div class="q-mb-xs">{{ $t('idName') }}</div>
          <q-input outlined v-model="params.realName"
                   :readonly="params.status == pendingAuth || params.status == successAuth"
                   :placeholder="$t('idName')" />
        </div>

        <!--  身份证 -->
        <div v-if="$initStore.setting.auth.showNumber">
          <div class="q-mb-xs">{{ $t('idNumber') }}</div>
          <q-input outlined v-model="params.number"
                   :readonly="params.status == pendingAuth || params.status == successAuth"
                   :placeholder="$t('idNumber')" />
        </div>

        <!--  地址 -->
        <div v-if="$initStore.setting.auth.showAddress">
          <div class="q-mb-xs">{{ $t('idAddress') }}</div>
          <q-input outlined v-model="params.address"
                   :readonly="params.status == pendingAuth || params.status == successAuth"
                   :placeholder="$t('idAddress')" />
        </div>

        <!--  身份证照 -->
        <div>
          <div>{{ $t('idPhoto') }}</div>
          <div class="row q-mt-sm">
            <div class="col q-mr-xs">
              <uploader :respValue="params.photo1" @uploaded="(url) => { params.photo1 = url }">
                <template v-slot:default>
                  <q-uploader-add-trigger
                    v-if="params.status == nowAuth || params.status == failedAuth" />
                  <q-card flat>
                    <div class="column items-center justify-center" style="height: 150px;border: grey 1px dashed">
                      <q-icon name="add" color="grey" size="40px" v-if="params.photo1 == ''" />
                      <q-img no-spinner v-else :src="imageSrc(params.photo1)"></q-img>
                    </div>
                  </q-card>
                </template>
              </uploader>
              <div class="text-caption text-weight-medium text-center q-mt-sm">{{ $t('idPhoto1') }}</div>
            </div>

            <!--  -->
            <div v-if="$initStore.setting.auth.showPhoto2" class="col q-ml-xs">
              <uploader :respValue="params.photo2" @uploaded="(url) => { params.photo2 = url }">
                <template v-slot:default>
                  <q-uploader-add-trigger
                    v-if="params.status == nowAuth || params.status == failedAuth" />
                  <q-card flat>
                    <div class="column items-center justify-center" style="height: 150px;border: grey 1px dashed">
                      <q-icon name="add" color="grey" size="40px" v-if="params.photo2 == ''" />
                      <q-img no-spinner v-else :src="imageSrc(params.photo2)"></q-img>
                    </div>
                  </q-card>
                </template>
              </uploader>
              <div class="text-caption text-weight-medium text-center q-mt-sm">{{ $t('idPhoto2') }}</div>
            </div>

            <!--  -->
            <div v-if="$initStore.setting.auth.showPhoto3" class="col q-ml-xs">
              <uploader :respValue="params.photo3" @uploaded="(url) => { params.photo3 = url }">
                <template v-slot:default>
                  <q-uploader-add-trigger
                    v-if="params.status == nowAuth || params.status == failedAuth" />
                  <q-card flat>
                    <div class="column items-center justify-center" style="height: 150px;border: grey 1px dashed">
                      <q-icon name="add" color="grey" size="40px" v-if="params.photo3 == ''" />
                      <q-img no-spinner v-else :src="imageSrc(params.photo3)"></q-img>
                    </div>
                  </q-card>
                </template>
              </uploader>
              <div class="text-caption text-weight-medium text-center q-mt-sm">{{ $t('idPhoto3') }}</div>
            </div>
          </div>
        </div>

        <div class="q-mt-xl row justify-end">
          <q-btn rounded unelevated color="primary" no-caps :label="$t('submit')"
                 v-if="params.status == nowAuth" style="min-width: 100px" size="md"
                 @click="createUserAuthFunc"></q-btn>
          <q-btn rounded unelevated color="primary" no-caps :label="$t('reSubmit')"
                 v-if="params.status == failedAuth" style="min-width: 100px" size="md"
                 @click="createUserAuthFunc"></q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userAuthCommon } from 'pages/common/users/auth';
import uploader from 'src/components/uploader.vue';
import { onMounted } from 'vue';
import { imageSrc } from 'src/utils';
import { initStore } from 'stores/init';
import { nowAuth, pendingAuth, successAuth, failedAuth } from 'src/pages/common/users/auth';

const $initStore = initStore()
const { params, createUserAuthFunc, userAuthInfoFunc } = userAuthCommon();

onMounted(()=>{
  // 获取用户实名信息
  userAuthInfoFunc()
})

defineOptions({
  name: 'UserAuthIndex'
});
</script>

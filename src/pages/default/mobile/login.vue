<template>
  <div>
    <!-- 语言切换 -->
    <q-header class="bg-white">
      <q-toolbar>
        <q-space />
        <q-btn class="text-grey-8" rounded no-caps flat v-if="$initStore.setting.login.showLang">
          <q-img no-spinner width="24px" height="24px" class="q-mr-sm"
                 :src="imageSrc(($initStore.langList.find((item: any) => item.symbol == $userStore.userLang)).icon)"></q-img>
          <div>{{ ($initStore.langList.find((item: any) => item.symbol == $userStore.userLang)).name }}</div>
          <switchLanguage></switchLanguage>
        </q-btn>
      </q-toolbar>
    </q-header>

    <div>
      <!-- logo -->
      <div class="row justify-center">
        <q-img no-spinner class="q-mt-lg q-mb-md" width="70px" height="70px" :src="imageSrc($initStore.config.logo)" />
      </div>
      <div class="row justify-center q-mx-md">
        <div class="text-weight-bold text-h6 text-center">{{ $t('loginSmall') }}</div>
      </div>

      <div style="margin-top: 80px"></div>
      <q-form class="q-mt-lg q-px-lg">
        <!-- 账号 -->
        <q-input class="q-mb-md" outlined v-model="loginParams.username"
                 :input-style="{ fontSize: '16px', color: '#999999!important' }" :placeholder="$t('username')">
          <template v-slot:prepend>
            <q-img no-spinner width="24px" height="24px" src="/src/assets/default/icons/username.png" />
          </template>
        </q-input>

        <!-- 密码 -->
        <q-input class="q-mb-md" v-model="loginParams.password" outlined
                 :input-style="{ fontSize: '16px', color: '#999999!important' }"
                 :type="showTextPassword.password ? 'text' : 'password'"
                 :placeholder="$t('password')">
          <template v-slot:prepend>
            <q-img no-spinner width="24px" height="24px" src="/src/assets/default/icons/password.png" />
          </template>
          <template v-slot:append>
            <q-icon style="color: #999999" :name="showTextPassword.password ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer"
                    @click="showTextPassword.password = !showTextPassword.password" />
          </template>
        </q-input>

        <!-- 验证码 -->
        <q-input :input-style="{ fontSize: '16px', color: '#999999!important' }"
                 v-if="$initStore.setting.login.showVerify"
                 class="q-mb-sm" outlined v-model="loginParams.captchaVal" :placeholder="$t('code')">
          <template v-slot:prepend>
            <q-img no-spinner width="24px" height="24px" src="/src/assets/default/icons/code.png" />
          </template>
          <template v-slot:append>
            <q-img no-spinner v-if="loginParams.captchaId !== ''"
                   :src="baseURL + '/captcha/' + loginParams.captchaId + '/150-50'"
                   width="150px" height="50px" @click="refreshCaptchaFunc"></q-img>
          </template>
        </q-input>

        <!-- 忘记密码、登录、注册 -->
        <div class="text-right q-mb-lg">
          <a :href="onlineInfo.link" class="text-grey-7 cursor-pointer">{{ $t('forgotPassword') }}</a>
        </div>

        <q-btn @click="userLoginFunc()" class="full-width q-mb-lg" unelevated rounded no-caps size="lg" color="primary"
               :label="$t('login')" />
        <div class="text-center text-primary q-mb-xl cursor-pointer" v-if="$initStore.setting.login.showRegister">
          <span @click="$router.push({ name: 'Register' })">{{ $t('toRegister') }}</span>
        </div>
      </q-form>


      <!-- 客服 -->
      <onlineComponents v-if="$initStore.setting.home.showOnline"></onlineComponents>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIndexCommon } from 'pages/common/users';
import switchLanguage from 'src/components/switchLanguage.vue';
import onlineComponents from 'src/components/online.vue';
import { initStore } from 'stores/init';
import { userStore } from 'stores/user';
import { imageSrc } from 'src/utils';
import { onMounted } from 'vue';

const $initStore: any = initStore();
const $userStore: any = userStore();
const {
  loginParams,
  showTextPassword,
  baseURL,
  onlineInfo,
  refreshCaptchaFunc,
  userLoginFunc,
  onlineInfoFunc
} = useIndexCommon();

onMounted(() => {
  // 获取验证码
  refreshCaptchaFunc();

  // 获取客服信息
  onlineInfoFunc();
});

defineOptions({
  name: 'UserLogin'
});
</script>

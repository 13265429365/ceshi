<template>
  <q-card style="width: 410px">
    <q-card-section class="q-pa-lg">
      <!--  -->
      <div class="text-center text-weight-bold text-primary text-h4">
        {{ $t('login') }}
      </div>
      <div class="text-center text-body1 text-weight-regular q-mt-sm text-grey">
        {{ $t('loginSmall') }}
      </div>

      <q-form class="q-mt-xl q-gutter-sm">
        <!-- 账号 -->
        <q-input :input-style="{ fontSize: '16px' }" outlined v-model="loginParams.username" :label="$t('username')">
          <template v-slot:prepend>
            <q-img no-spinner width="24px" height="24px" src="/src/assets/default/icons/username.png" />
          </template>
        </q-input>

        <!-- 密码 -->
        <q-input :input-style="{ fontSize: '16px', }" outlined v-model="loginParams.password"
                 :type="showTextPassword.password ? 'text' : 'password'" :label="$t('password')">
          <template v-slot:prepend>
            <q-img no-spinner width="24px" height="24px" src="/src/assets/default/icons/password.png" />
          </template>
          <template v-slot:append>
            <q-icon style="color: #999999" :name="showTextPassword.password ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                    @click="showTextPassword.password = !showTextPassword.password" />
          </template>
        </q-input>

        <!-- 验证码 -->
        <q-input :input-style="{ fontSize: '16px' }" v-if="$initStore.setting.login.showVerify" outlined
                 v-model="loginParams.captchaVal" :label="$t('code')">
          <template v-slot:prepend>
            <q-img no-spinner width="24px" height="24px" src="/src/assets/default/icons/code.png" />
          </template>
          <template v-slot:append>
            <q-img no-spinner v-if="loginParams.captchaId !== ''"
                   :src="baseURL + '/captcha/' + loginParams.captchaId + '/150-50'" width="150px" height="50px"
                   @click="refreshCaptchaFunc" class="cursor-pointer"></q-img>
          </template>
        </q-input>

        <!-- 忘记密码、登录、注册 -->
        <div class="row justify-end q-mb-lg">
          <a :href="onlineInfo.link" style="text-decoration: none">
            <div class="text-grey-7 cursor-pointer">{{ $t('forgotPassword') }}</div>
          </a>
        </div>
        <q-btn @click="userLoginFunc();emit('switchDialogLogin')" class="full-width" unelevated rounded no-caps style="height: 44px"
               color="primary" :label="$t('login')" />
        <div @click="toRegister()" v-if="$initStore.setting.login.showRegister"
             class="text-center text-primary q-mb-sm cursor-pointer">
          {{ $t('toRegister') }}
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useIndexCommon } from 'pages/common/users';
import { initStore } from 'stores/init';
import { onMounted } from 'vue';

const $initStore = initStore();
const emit = defineEmits(['switchDialogFunc', 'switchDialogLogin']) as any
const { loginParams, showTextPassword, baseURL, onlineInfo, refreshCaptchaFunc, userLoginFunc, onlineInfoFunc } = useIndexCommon();

onMounted(()=>{
  // 获取验证码
  refreshCaptchaFunc()

  // 获取客服信息
  onlineInfoFunc()
})

// 点击前往注册
const toRegister = ()=>{
  emit('switchDialogFunc')
}

defineOptions({
  name: 'UserLogin'
})
</script>

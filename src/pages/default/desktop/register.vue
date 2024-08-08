<template>
  <q-card style="width: 410px">
    <q-card-section class="q-pa-lg">
      <div class="text-center text-weight-bold text-primary text-h4">
        {{ $t('register') }}
      </div>
      <div class="text-center text-body1 text-weight-regular q-mt-sm text-grey">
        {{ $t('registerSmall') }}
      </div>

      <q-form class="q-mt-xl q-gutter-y-sm">
        <!-- 手机号码 -->
        <div v-if="$initStore.setting.register.showTelephone" class="row q-col-gutter-sm">
          <q-select
            outlined
            v-model="currentCountry"
            :options="$initStore.countryList"
            class="col-4"
          >
            <template v-slot:selected>
              <div class="row no-wrap items-center">
                <q-img width="20px" height="15px" :src="imageSrc(currentCountry.icon)" no-spinner alt=""
                       class="q-mr-xs"></q-img>
                +{{ currentCountry.code }}
              </div>
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <q-img :src="imageSrc(scope.opt.icon)" no-spinner alt=""></q-img>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-input class="col-8" :input-style="{ fontSize: '16px', color: '#999999!important' }" outlined
                   type="number"
                   v-model="registerParams.telephone" :placeholder="$t('telephone')" />
        </div>

        <!-- 邮箱 -->
        <q-input v-if="$initStore.setting.register.showEmail"
                 :input-style="{ fontSize: '16px', color: '#999999!important' }"
                 outlined class="q-mb-md" v-model="registerParams.email" :placeholder="$t('email')">
          <template v-slot:prepend>
            <q-img no-spinner width="24px" height="24px" src="/src/assets/default/icons/email.png" />
          </template>
        </q-input>

        <!-- 账号 -->
        <q-input outlined class="q-mb-md" :input-style="{ fontSize: '16px', color: '#999999!important' }"
                 v-model="registerParams.username" :placeholder="$t('username')">
          <template v-slot:prepend>
            <q-img no-spinner width="24px" height="24px" src="/src/assets/default/icons/username.png" />
          </template>
        </q-input>

        <!-- 密码 -->
        <q-input class="q-mb-md" :input-style="{ fontSize: '16px', color: '#999999!important' }"
                 v-model="registerParams.password"
                 outlined :type="showTextPassword.password ? 'text' : 'password'" :placeholder="$t('password')">
          <template v-slot:prepend>
            <q-img no-spinner width="24px" height="24px" src="/src/assets/default/icons/password.png" />
          </template>
          <template v-slot:append>
            <q-icon class="text-grey-7 cursor-pointer"
                    :name="showTextPassword.password ? 'visibility' : 'visibility_off'"
                    @click="showTextPassword.password = !showTextPassword.password" />
          </template>
        </q-input>

        <!-- 确认密码 -->
        <q-input v-if="$initStore.setting.register.showCmfPass"
                 :input-style="{ fontSize: '16px', color: '#999999!important' }" class="q-mb-md"
                 v-model="registerParams.cmfPassword"
                 outlined :type="showTextPassword.cmfPassword ? 'text' : 'password'" :placeholder="$t('cmfPassword')">
          <template v-slot:prepend>
            <q-img no-spinner width="24px" height="24px" src="/src/assets/default/icons/password.png" />
          </template>
          <template v-slot:append>
            <q-icon class="text-grey-7 cursor-pointer"
                    :name="showTextPassword.cmfPassword ? 'visibility' : 'visibility_off'"
                    @click="showTextPassword.cmfPassword = !showTextPassword.cmfPassword" />
          </template>
        </q-input>

        <!-- 安全秘钥 -->
        <q-input v-if="$initStore.setting.register.showSecurityKey"
                 :input-style="{ fontSize: '16px', color: '#999999!important' }" class="q-mb-md" outlined
                 v-model="registerParams.securityKey" :type="showTextPassword.securityKey ? 'text' : 'password'"
                 :placeholder="$t('enterSecretKey')">
          <template v-slot:prepend>
            <q-img no-spinner width="24px" height="24px" src="/src/assets/default/icons/key.png" />
          </template>
          <template v-slot:append>
            <q-icon class="text-grey-7 cursor-pointer"
                    :name="showTextPassword.securityKey ? 'visibility' : 'visibility_off'"
                    @click="showTextPassword.securityKey = !showTextPassword.securityKey" />
          </template>
        </q-input>

        <!-- 确认安全秘钥 -->
        <q-input v-if="$initStore.setting.register.showCmfSecurityKey"
                 :input-style="{ fontSize: '16px', color: '#999999!important' }" class="q-mb-md" outlined
                 v-model="registerParams.cmfSecurityKey" :type="showTextPassword.cmfSecurityKey ? 'text' : 'password'"
                 :placeholder="$t('cmfSecretKey')">
          <template v-slot:prepend>
            <q-img no-spinner width="24px" height="24px" src="/src/assets/default/icons/key.png" />
          </template>
          <template v-slot:append>
            <q-icon class="text-grey-7 cursor-pointer"
                    :name="showTextPassword.cmfSecurityKey ? 'visibility' : 'visibility_off'"
                    @click="showTextPassword.cmfSecurityKey = !showTextPassword.cmfSecurityKey" />
          </template>
        </q-input>

        <!-- 邀请码 -->
        <q-input v-if="$initStore.setting.register.showInvite"
                 :input-style="{ fontSize: '16px', color: '#999999!important' }"
                 class="q-mb-md" outlined v-model="registerParams.code" :placeholder="$t('inviteCode')">
          <template v-slot:prepend>
            <q-img no-spinner width="24px" height="24px" src="/src/assets/default/icons/profile.png" />
          </template>
        </q-input>

        <!-- 验证码 -->
        <q-input v-if="$initStore.setting.register.showVerify"
                 :input-style="{ fontSize: '16px', color: '#999999!important' }" class="q-mb-md" outlined
                 v-model="registerParams.captchaVal" :placeholder="$t('code')">
          <template v-slot:prepend>
            <q-img no-spinner width="24px" height="24px" src="/src/assets/default/icons/code.png" />
          </template>
          <template v-slot:append>
            <q-img no-spinner v-if="registerParams.captchaId !== ''"
                   :src="baseURL + '/captcha/' + registerParams.captchaId + '/150-50'"
                   width="150px" height="50px" @click="refreshCaptchaFunc"></q-img>
          </template>
        </q-input>

        <!-- 前往登录、点击注册 -->
        <q-btn @click="userRegisterFunc();emit('switchDialogRegister')" class="full-width q-mt-xl" unelevated rounded
               no-caps style="height: 44px;"
               color="primary" :label="$t('register')" />
        <div @click="toLogin()" class="text-center q-pb-sm text-primary cursor-pointer">
          {{ $t('toLogin') }}
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useIndexCommon } from 'pages/common/users';
import { imageSrc } from 'src/utils';
import { initStore } from 'stores/init';
import { onMounted } from 'vue';

const $initStore = initStore();
const emit = defineEmits(['switchDialogFunc', 'switchDialogRegister']) as any;
const {
  baseURL,
  currentCountry,
  showTextPassword,
  registerParams,
  userRegisterFunc,
  refreshCaptchaFunc
} = useIndexCommon();

onMounted(() => {
  // 获取验证码
  refreshCaptchaFunc();

  // 默认选中第一个国家
  currentCountry.value = $initStore.countryList[0];
});

// 点击前往登录
const toLogin = () => {
  emit('switchDialogFunc');
};

defineOptions({
  name: 'UserRegister'
});
</script>

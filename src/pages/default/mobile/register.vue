<template>
  <div>
    <!-- 语言切换 -->
    <q-header class="bg-white">
      <q-toolbar>
        <q-space />
        <q-btn class="text-grey-8" rounded no-caps flat v-if="$initStore.setting.register.showLang">
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
        <q-img no-spinner class="q-mt-lg q-mb-md" width="70px" height="70px"
               :src="`${imageSrc($initStore.config.logo)}`" />
      </div>
      <div class="row justify-center">
        <div class="text-h6 text-weight-bold">{{ $t('registerSmall') }}</div>
      </div>

      <div style="margin-top: 80px"></div>
      <q-form class="q-mt-lg q-px-lg">
        <!-- 手机号码 -->
        <div v-if="$initStore.setting.register.showTelephone" class="row q-col-gutter-sm q-mb-md">
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
                   v-model="registerParams.telephone" :placeholder="$t('telephone')" type="number" />
        </div>

        <!-- 邮箱 -->
        <q-input v-if="$initStore.setting.register.showEmail"
                 :input-style="{ fontSize: '16px', color: '#999999!important' }"
                 outlined class="q-mb-md full-width" v-model="registerParams.email" :placeholder="$t('email')">
          <template v-slot:prepend>
            <q-img no-spinner width="24px" height="24px" src="/src/assets/default/icons/email.png" />
          </template>
        </q-input>

        <!-- 账号 -->
        <q-input outlined class="q-mb-md full-width" :input-style="{ fontSize: '16px', color: '#999999!important' }"
                 v-model="registerParams.username" :placeholder="$t('username')">
          <template v-slot:prepend>
            <q-img no-spinner width="24px" height="24px" src="/src/assets/default/icons/username.png" />
          </template>
        </q-input>

        <!-- 密码 -->
        <q-input class="q-mb-md full-width" :input-style="{ fontSize: '16px', color: '#999999!important' }"
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
                 :input-style="{ fontSize: '16px', color: '#999999!important' }" class="q-mb-md full-width"
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
                 :input-style="{ fontSize: '16px', color: '#999999!important' }" class="q-mb-md full-width" outlined
                 v-model="registerParams.securityKey" :type="showTextPassword.securityKey ? 'text' : 'password'"
                 :placeholder="$t('secretKey')">
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
                 :input-style="{ fontSize: '16px', color: '#999999!important' }" class="q-mb-md full-width" outlined
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
                 class="q-mb-md full-width" outlined v-model="registerParams.code" :placeholder="$t('inviteCode')">
          <template v-slot:prepend>
            <q-img no-spinner width="24px" height="24px" src="/src/assets/default/icons/profile.png" />
          </template>
        </q-input>

        <!-- 验证码 -->
        <q-input v-if="$initStore.setting.register.showVerify"
                 :input-style="{ fontSize: '16px', color: '#999999!important' }" class="q-mb-md full-width" outlined
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
        <q-btn @click="userRegisterFunc()" class="full-width q-my-lg" unelevated rounded no-caps size="lg"
               color="primary"
               :label="$t('register')" />
        <div class="text-center q-pb-xl text-primary cursor-pointer">
          <span @click="$router.push('/login')">{{ $t('toLogin') }}</span>
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

defineOptions({
  name: 'UserRegister'
});
</script>


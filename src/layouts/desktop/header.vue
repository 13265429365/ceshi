<template>
  <q-header>
    <q-toolbar class="q-pr-xl" style="height: 60px;padding-left: 64px">
      <!-- 左侧 logo -->
      <q-toolbar-title @click="$router.push({ name: 'HomeIndex' })" shrink class="cursor-pointer text-white"
                       style="margin-right: 88px;">
        <q-avatar>
          <img width="42px" height="42px" :src="imageSrc($initStore.config.logo)" alt="">
        </q-avatar>
        <span class="q-ml-sm">{{ $initStore.config.name }}</span>
      </q-toolbar-title>

      <!-- 左侧tabBar菜单 -->
      <div class="row no-wrap items-center">
        <div v-for="(navigation, NavigationIndex) in $initStore.menuList.navigation" :key="NavigationIndex">
          <!-- 有子级 -->
          <q-btn-dropdown v-if="navigation.isDesktop == 1 && navigation.children && navigation.children.length > 0"
                          :menu-offset="[80, 18]"
                          class="text-white q-mr-sm q-py-xs q-px-sm" :label="$t(navigation.name)" dense flat no-wrap
                          no-caps>
            <q-list v-if="navigation.children.length > 0" class="q-ma-sm">
              <q-item v-for="(children, childrenIndex) in navigation.children" :key="childrenIndex" clickable
                      aria-hidden="true" :to="children.route" class="rounded-borders">
                <q-item-section avatar style="min-width:auto">
                  <q-img no-spinner width="30px" height="30px" :src="imageSrc(children.icon ?? '')"></q-img>
                </q-item-section>
                <q-item-section class="text-grey-8">{{ $t(children.name) }}</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

          <!-- 没有子级 -->
          <q-btn v-else v-show="navigation.isDesktop == 1" class="text-white q-mr-sm q-py-xs q-px-md"
                 :label="$t(navigation.name)"
                 dense flat no-wrap no-caps :to="navigation.route"></q-btn>
        </div>
      </div>

      <!-- 左侧快捷菜单 -->
      <q-btn-dropdown :menu-offset="[310, 18]" class="text-white q-mr-sm q-py-xs q-px-sm" :label="$t('more')" dense
                      flat no-caps>
        <q-list class="q-ma-sm row" style="max-width: 390px;">
          <q-item @click="$router.push(more.route)" v-for="(more, MoreIndex) in $initStore.menuList.more"
                  class="rounded-borders q-mt-md col-4" v-show="more.isDesktop==1" :key="MoreIndex"
                  clickable aria-hidden="true">
            <q-item-section avatar style="min-width:auto">
              <q-img no-spinner width="30px" height="30px" :src="imageSrc(more.icon)"></q-img>
            </q-item-section>
            <q-item-section class="text-grey-8">
              <span class="ellipsis" style="width: 60px;" v-text="$t(more.name)"></span>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-space />

      <!-- 右侧搜索 -->
      <q-input dense rounded outlined v-model="searchVal" color="white" :input-style="{ color: '#fff' }" :placeholder="$t('search')">
        <template v-slot:prepend>
          <q-icon color="white" name="o_search" />
        </template>
      </q-input>


      <!-- 右侧固定按钮 -->
      <div class="row items-center no-wrap">
        <!-- 登录状态 -->
        <div v-if="isLogin" class="row items-center no-wrap">
          <!-- 右侧Deposit -->
          <q-btn
            @click="$router.push({name: 'WalletsDeposit', query: { mode: balanceDepositMode }})"
            rounded
            flat
            dense
            no-wrap
            class="bg-primary text-white q-px-md q-mx-sm"
            no-caps
            :label="$t('deposit')"
          ></q-btn>

          <!-- 头像 -->
          <q-btn class="q-mx-xs" round flat no-caps>
            <q-avatar size="28px">
              <q-img no-spinner :src="imageSrc(userInfo.Avatar)"></q-img>
            </q-avatar>
            <q-menu :offset="[300, 13]" class="q-pa-sm">
              <q-list style="min-width: 300px;">
                <!-- 固定头部 -->
                <q-item aria-hidden="true">
                  <div class="row">
                    <q-avatar size="40px" class="q-mt-sm cursor-pointer"
                              @click="$router.push({ name: 'SettingsIndex' })">
                      <q-img no-spinner :src="imageSrc(userInfo.avatar)"></q-img>
                    </q-avatar>
                    <div class="q-ml-sm">
                      <div class="row items-center">
                        <span class="q-mr-xs text-body1">{{ userInfo.userName ?? '--' }}</span>
                        <span class="text-grey-7 text-caption">(id:{{ userInfo.id }})</span>
                      </div>
                      <div class="text-grey text-caption" v-text="userInfo.email == '' ? '- -' : userInfo.email"></div>

                      <div class="row no-wrap q-mt-xs">
                        <!-- 会员等级 -->
                        <q-btn v-if="userInfo.levelInfo.name!=''&&$initStore.setting.basic.showLevel" size="xs"
                               rounded flat dense no-wrap
                               class="q-px-sm q-mr-xs"
                               no-caps
                               @click="$router.push({ name: 'UserLevelIndex' })"
                               style="border: 1px solid #F7DEB6;color: #F7DEB6;background: #322B19;">
                          <div class="q-ml-xs" style="font-size: 10px;">{{ userInfo.levelInfo.name }}</div>
                        </q-btn>

                        <!-- 信用分 -->
                        <div v-if="$initStore.setting.basic.showScore">
                          <q-chip size="xs" outline class="text-green bg-white"
                                 v-if="userInfo.Score > 60" no-caps>
                            <div class="q-ml-xs" style="font-size: 10px;">{{ $t('creditScore') + userInfo.score }}</div>
                          </q-chip>
                          <q-chip v-else size="xs" outline class="bg-white text-red">
                            <div class="q-ml-xs" style="font-size: 10px;">{{ $t('creditScore') + userInfo.score }}</div>
                          </q-chip>
                        </div>

                        <!-- 实名状态 -->
                        <div v-if="$initStore.setting.basic.showAuth"
                             @click="$router.push({ name: 'UserAuthIndex' })">
                          <!-- 未实名 -->
                          <q-chip size="xs" outline class="bg-white text-red"
                                 v-if="userInfo.authInfo.type == nowAuth">
                            <div style="font-size: 10px">
                              {{ $t('nowAuth') }}
                            </div>
                          </q-chip>
                          <!-- 审核中 -->
                          <q-chip size="xs" outline class="text-info bg-white"
                                 v-else-if="userInfo.authInfo.type == pendingAuth">
                            <div style="font-size: 10px">
                              {{ $t('pendingAuth') }}
                            </div>
                          </q-chip>
                          <!-- 已实名 -->
                          <q-chip size="xs" outline class="text-primary bg-white"
                                 v-else-if="userInfo.authInfo.type == successAuth">
                            <div style="font-size: 10px">
                              {{ $t('successAuth') }}
                            </div>
                          </q-chip>
                          <!-- 实名失败 -->
                          <q-chip v-if="userInfo.authInfo.type == failedAuth" size="xs" outline
                                 class="text-negative bg-white"
                                 @click="$router.push({ name: 'UserAuthIndex' })">
                            <div style="font-size: 10px">
                              {{ $t('failedAuth') }}
                            </div>
                          </q-chip>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-item>

                <q-separator inset class="q-mt-md q-mb-sm" />

                <!-- 用户列表 -->
                <template v-for="settingMenu in $initStore.menuList.setting" :key="settingMenu">
                  <template v-for="children in settingMenu.children" :key="children">
                    <q-item @click="$router.push(children.route)" dense
                            clickable v-close-popup aria-hidden="true" class="q-py-md rounded-borders">
                      <q-item-section avatar style="min-width:auto">
                        <q-img no-spinner width="24px" height="24px" :src="imageSrc(children.icon)"></q-img>
                      </q-item-section>
                      <q-item-section class="text-grey-8 text-body1">
                        {{ $t(children.name) }}
                      </q-item-section>
                    </q-item>
                  </template>
                  <q-separator inset class="q-mt-md q-mb-sm" />
                </template>

                <!-- 退出 -->
                <q-item @click="logoutDialogRef?.openFunc()" clickable aria-hidden="true" class="rounded-borders">
                  <q-item-section avatar style="min-width:auto">
                    <q-icon size="24px" name="logout" />
                  </q-item-section>
                  <q-item-section class="text-grey-8 text-body1">{{ $t('logout') }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>

        <!-- 未登录状态 -->
        <div v-else>
          <q-btn @click="switchDialogLogin()" rounded flat dense no-wrap class="bg-grey-4 text-grey-8 q-px-md q-ml-sm"
                 no-caps :label="$t('login')"></q-btn>
          <q-btn @click="switchDialogRegister()" rounded flat dense no-wrap
                 class="bg-primary text-white q-px-md q-ml-sm" no-caps :label="$t('register')"></q-btn>
        </div>
        <q-btn v-if="$initStore.setting.home.showLang" round dense flat color="white" size="16px" icon="o_language"
               class="q-mx-xs">
          <switchLanguage :offset="[0, 20]"></switchLanguage>
        </q-btn>
      </div>

    </q-toolbar>
  </q-header>

  <q-dialog v-model="loginShow">
    <LoginPages @switchDialogFunc="switchDialogFunc" @switchDialogLogin="switchDialogLogin"></LoginPages>
  </q-dialog>
  <q-dialog v-model="registerShow">
    <RegisterPages @switchDialogFunc="switchDialogFunc" @switchDialogRegister="switchDialogRegister"></RegisterPages>
  </q-dialog>

  <!-- 确认退出登录弹窗 -->
  <GlobalDialog
    ref="logoutDialogRef"
    :title="$t('logout')"
    :message="$t('logoutSmall')"
    :on-confirm-callback="logoutFunc"
  ></GlobalDialog>
</template>

<script setup lang="ts">
import { userInfoCommon } from 'pages/common/users/info';
import LoginPages from 'src/pages/default/desktop/login.vue';
import RegisterPages from 'src/pages/default/desktop/register.vue';
import switchLanguage from 'src/components/switchLanguage.vue';
import GlobalDialog from 'src/components/dialog.vue';
import { useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { imageSrc } from 'src/utils';
import { userStore } from 'src/stores/user';
import { initStore } from 'stores/init';
import { nowAuth, pendingAuth, successAuth, failedAuth } from 'src/pages/common/users/auth';
import { balanceDepositMode } from 'src/pages/common/wallets/order';

const $userStore = userStore();
const $initStore = initStore();
const $router = useRouter();

// 确认退出登录弹窗
const logoutDialogRef = ref(null) as any;

//搜索框model
const searchVal = ref('') as any;

//是否登录
const isLogin = ref($userStore.userToken.length > 0) as any;

//登录弹窗页面
const loginShow = ref(false) as any;

//注册弹窗页面
const registerShow = ref(false) as any;
const { userInfo } = userInfoCommon();

// 监听用户Token
watch($userStore, (userStore: any) => {
  isLogin.value = userStore.userToken.length > 0;
});

// 监听用户信息
watch($userStore.userInfo, (newUserInfo: any) => {
  userInfo.value = newUserInfo;
});

onMounted(() => {
  // 如果登录状态下，获取用户信息
  if ($userStore.userToken!='') {
    userInfo.value = $userStore.userInfo
  }

  // 判断当前为登录、注册页面
  switch ($router.currentRoute.value.name) {
    // 打开登录弹窗
    case 'Login':
      switchDialogLogin();
      break;
    // 打开注册弹窗
    case 'Register':
      switchDialogRegister();
      break;
  }
});

// 退出登录
const logoutFunc = () => {
  $userStore.updateToken('');
  void $router.push({ name: 'HomeIndex' });
};

// 打开登录弹窗
const switchDialogLogin = () => {
  loginShow.value = !loginShow.value;
};

// 打开注册弹窗
const switchDialogRegister = () => {
  registerShow.value = !registerShow.value;
};

// 切换注册登录弹窗
const switchDialogFunc = () => {
  loginShow.value = !loginShow.value;
  registerShow.value = !registerShow.value;
};

defineOptions({
  name: 'HeaderLayouts'
});
</script>

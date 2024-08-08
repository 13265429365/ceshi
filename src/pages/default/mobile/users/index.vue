<template>
  <div>
    <div class="row justify-between no-wrap q-pt-xl q-px-md q-pb-lg bg-white">
      <!-- 头像 -->
      <div class="row no-wrap">
        <q-avatar @click="$router.push({ name: 'SettingsIndex' })" class="q-mr-md avatar">
          <q-img no-spinner :src="imageSrc(userInfo.avatar ?? $initStore.config.logo)" width="50px"
                 height="50px" />
        </q-avatar>
        <div class="col-9">
          <div class="row justify-start items-center">
            <div class="text-weight-bolder text-body1 q-mr-xs" v-text="userInfo.userName ?? '- -'"></div>
            <div class="text-caption text-grey" v-text="'(id: ' + (userInfo.id ?? '- -') + ')'"></div>
          </div>
          <div class="text-grey text-caption" v-text="userInfo.email == '' ? '- -' : userInfo.email"></div>
          <div class="row no-wrap items-center">
            <!-- 会员等级 -->
            <div v-if="userInfo.levelInfo.name!=''&&$initStore.setting.basic.showLevel"
                 @click="$router.push({ name: 'UserLevelIndex' })">
              <q-chip class="text-white justify-center" size="sm" style="background: #322B19;border: 1px solid #F7DEB6">
                <span style="color: #F7DEB6" v-text="$t('member') + ' ' + userInfo.levelInfo.name"></span>
              </q-chip>
            </div>

            <!-- 信用分 -->
            <q-chip v-if="$initStore.setting.basic.showScore" outline class="text-green bg-white" size="sm">
              {{ $t('creditScore') + userInfo.score }}
            </q-chip>

            <!-- 实名 -->
            <div v-if="$initStore.setting.basic.showAuth" @click="$router.push({ name: 'UserAuthIndex' })">
              <q-chip v-if="userInfo.authInfo.status == nowAuth" outline class="text-red bg-white" size="sm">
                {{ $t('nowAuth') }}
              </q-chip>
              <q-chip v-else-if="userInfo.authInfo.status == pendingAuth" outline class="bg-white text-info" size="sm">
                {{ $t('pendingAuth') }}
              </q-chip>
              <q-chip v-else-if="userInfo.authInfo.status == successAuth" outline class="text-green bg-white" size="sm">
                {{ $t('successAuth') }}
              </q-chip>
              <q-chip v-if="userInfo.authInfo.status == failedAuth" outline class="bg-white text-red" size="sm">
                {{ $t('failedAuth') }}
              </q-chip>
            </div>
          </div>
        </div>
      </div>
      <div @click="$router.push({ name: 'UserSetting' })" class="row items-center">
        <q-icon name="keyboard_arrow_right" size="24px"></q-icon>
      </div>
    </div>

    <div class="bg-grey-1 q-px-md q-py-md full-width">
      <!-- more -->
      <div class="row items-center justify-between">
        <template v-for="(more, moreIndex) in $initStore.menuList.more" :key="moreIndex">
          <div v-if="moreIndex < 4" class="col-6">
            <div :class="moreIndex%2==0 ? 'q-mr-xs' : 'q-ml-xs'">
              <q-btn @click="$router.push(more.route)"
                     class="bg-white rounded-borders full-width q-mb-sm" no-caps unelevated>
                <q-item class="no-padding">
                  <q-item-section avatar>
                    <q-img no-spinner class="q-mr-sm" :src="imageSrc(more.icon)" width="42px" height="42px" />
                  </q-item-section>
                  <q-item-section>
                    <div v-text="$t(more.name)" class="ellipsis-2-lines"></div>
                  </q-item-section>
                </q-item>
              </q-btn>
            </div>
          </div>
        </template>
      </div>

      <!-- 用户列表 -->
      <q-list v-for="(setting, SettingIndex) in $initStore.menuList.setting" :key="SettingIndex" bordered
              class="q-mb-md rounded-borders no-border overflow-hidden">
        <div v-for="(child, childIndex) in setting.children" :key="childIndex" class="bg-white">
          <q-item @click="$router.push(child.route)" v-show="child.isMobile == 1" class="q-pa-md" clickable>
            <q-item-section avatar class="q-mr-sm" style="min-width: 0;">
              <q-img no-spinner :src="`${imageSrc(child.icon)}`" width="24px" height="24px" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-weight-bold">
                <div v-text="$t(child.name)"></div>
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="keyboard_arrow_right" size="24px"></q-icon>
            </q-item-section>
          </q-item>
          <q-separator style="background: #F4F5FD;" inset />
        </div>
      </q-list>
      <q-btn @click="dialog = true" class="full-width q-mb-lg q-mt-md" size="lg" unelevated rounded no-caps
             color="primary" :label="$t('logout')" />
    </div>

    <!-- 退出登录 -->
    <q-dialog full-width v-model="dialog" position="bottom">
      <q-card>
        <q-card-section>
          <div class="row justify-center q-mb-lg">
            <q-separator class="rounded-borders col-3" style="height: 4px" color="grey-4" />
          </div>
          <div class="row justify-center q-my-md">
            <div class="text-weight-bold text-h6">{{ $t('logout') }}</div>
          </div>
          <q-separator class="q-mt-md  q-mb-lg" color="grey-4" />
          <div class="row justify-center q-mb-xl">
            <div class="text-grey-10">{{ $t('logoutSmall') }}</div>
          </div>
          <div class="row justify-between no-wrap">
            <q-btn @click="dialog = false" size="lg" class="q-mr-md text-primary bg-white col-5" unelevated rounded
                   no-caps style="border:1px solid #31cbd2" :label="$t('cancel')" />
            <q-btn @click="logoutFunc" size="lg" class="col-5" unelevated rounded no-caps color="primary"
                   :label="$t('logout')" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { userInfoCommon } from 'pages/common/users/info';
import { imageSrc } from 'src/utils';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { userStore } from 'stores/user';
import { initStore } from 'stores/init';
import { nowAuth, pendingAuth, successAuth, failedAuth } from 'src/pages/common/users/auth';

const $router = useRouter();
const $userStore = userStore();
const $initStore = initStore();

//退出登录弹窗
const dialog = ref(false) as any;
const { userInfo, userInfoFunc } = userInfoCommon();

onMounted(() => {
  // 如果登录状态下，获取用户信息
  if ($userStore.userToken != '') {
    userInfoFunc();
  }
});

// 退出登录
const logoutFunc = () => {
  $userStore.updateToken('');
  void $router.push({ name: 'HomeIndex' });
};

defineOptions({
  name: 'UserIndex'
});
</script>

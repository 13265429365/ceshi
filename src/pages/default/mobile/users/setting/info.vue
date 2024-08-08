<template>
  <div>
    <!-- 头像 -->
    <div class="row justify-center q-py-lg">
      <div class="relative-position">
        <uploader @uploaded="(url) => { userInfoParams.avatar = url }">
          <template v-slot:default>
            <q-uploader-add-trigger />
            <q-avatar size="80px">
              <q-img no-spinner :src="imageSrc(userInfoParams.avatar??'')" />
              <q-badge floating class="bg-transparent" :style="{ top: '70%' }">
                <q-img no-spinner src="/src/assets/default/edit.png" width="28px" height="28px"></q-img>
              </q-badge>
            </q-avatar>
          </template>
        </uploader>
      </div>
    </div>

    <div class="q-mt-lg q-px-lg">
      <!--  姓名  -->
      <div class="q-mb-md">
        <div class="text-weight-bold q-mb-sm">{{ $t('nickname') }}</div>
        <q-input :placeholder="$t('nickname')" outlined v-model="userInfoParams.nickName" />
      </div>

      <!--  邮箱  -->
      <div class="q-mb-md">
        <div class="text-weight-bold q-mb-sm">{{ $t('email') }}</div>
        <q-input :placeholder="$t('email')" outlined v-model="userInfoParams.email" />
      </div>

      <!--  生日  -->
      <div class=" q-mb-md">
        <div class="text-weight-bold q-mb-sm">{{ $t('birthday') }}</div>
        <q-input :placeholder="$t('birthday')" outlined v-model="userInfoParams.birthday"
                 mask="date">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy>
                <q-date v-model="userInfoParams.birthday"></q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <!--  性别  -->
      <div class="q-mb-md">
        <div class="text-weight-bold q-mb-sm">{{ $t('sex') }}</div>
        <q-select outlined v-model="userInfoParams.sex" map-options :options="genderList" option-value="value"
                  option-label="name" emit-value dropdown-icon="expand_more" />
      </div>

      <!--  手机号  -->
      <div class="q-mb-md">
        <div class="text-weight-bold q-mb-sm">{{ $t('telephone') }}</div>
        <div class="row q-col-gutter-sm">
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
          <q-input class="col-8" :placeholder="$t('telephone')" outlined
                   v-model.number="userInfoParams.telephone" />
        </div>
      </div>

      <!--  个性签名  -->
      <div class="q-mb-md">
        <div class="text-weight-bold q-mb-sm">{{ $t('desc') }}</div>
        <q-input type="textarea" :placeholder="$t('desc')" outlined v-model="userInfoParams.desc" />
      </div>

      <q-btn @click="submitUpdateUserInfoFunc" size="lg" class="full-width q-mb-xl row justify-center" unelevated
             rounded
             no-caps
             color="primary" :label="$t('submit')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { userInfoCommon } from 'src/pages/common/users/info';
import uploader from 'src/components/uploader.vue';
import { onMounted, watch } from 'vue';
import { imageSrc } from 'src/utils';
import { userStore } from 'stores/user';
import { initStore } from 'stores/init';
import { useRouter } from 'vue-router';
import { date } from 'quasar';
import { useI18n } from 'vue-i18n';

const $userStore = userStore();
const $initStore = initStore();
const $router = useRouter();
const { userInfoParams, currentCountry, genderList, updateUserInfoFunc } = userInfoCommon();

watch($userStore.userInfo, (newValue: any) => {
  userInfoParams.value = newValue;
});

onMounted(() => {
  initData();
});

// 初始化数据
const initData = () => {
  // 获取用户信息
  userInfoParams.value = $userStore.userInfo;

  // 生日格式转换
  userInfoParams.value.birthday = date.formatDate(userInfoParams.value.birthday, 'YYYY/MM/DD');

  if (userInfoParams.value.telephone == '') {
    // 如果电话为空，设置默认国家
    currentCountry.value = $initStore.countryList[0];
  } else {
    // 否则，设置已保存国家
    if (userInfoParams.value.telephone.indexOf('|') > -1) {
      const currentCountryCode = userInfoParams.value.telephone.split('|')[0];
      const currentCountryIndex = $initStore.countryList.findIndex((item: any) => {
        return item.code == currentCountryCode;
      });
      currentCountry.value = $initStore.countryList[currentCountryIndex];
      userInfoParams.value.telephone = userInfoParams.value.telephone.split('|')[1];
    }
  }
};

// 修改用户信息
const submitUpdateUserInfoFunc = () => {
  if (userInfoParams.value.telephone != '') {
    userInfoParams.value.telephone = currentCountry.value.code + '|' + userInfoParams.value.telephone;
  }
  updateUserInfoFunc($router.back());
};

const $i18n = useI18n()
const emit = defineEmits(['update'])
emit('update', {
  title: $i18n.t('userSettings'),
  right: {
    callback: () => {},
    icon: ''
  },
})

defineOptions({
  name: 'UserSetting'
});
</script>

<style scoped lang="scss"></style>

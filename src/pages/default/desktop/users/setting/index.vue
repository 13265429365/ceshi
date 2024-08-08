<template>
  <div style="padding: 48px 100px;">
    <div class="text-weight-bold text-h5">{{ $t('userSettings') }}</div>
    <div class="row justify-between items-center q-my-lg" v-for="(setting, settingIndex) in settingsList"
         :key="settingIndex">
      <div class="col-6 text-body1">{{ $t(setting.name) }}</div>
      <div class="col">
        <!-- 密码、秘钥 -->
        <div v-if="setting.params == 'password'||setting.params == 'SecretKey'">******</div>

        <!-- 头像 -->
        <div v-else-if="setting.params == 'Avatar'">
          <q-avatar>
            <q-img no-spinner :src="imageSrc(setting.value)"></q-img>
          </q-avatar>
        </div>

        <!-- 生日 -->
        <div v-else-if="setting.params == 'Birthday'">{{ dates }}</div>

        <!-- 姓名、邮箱、性别、个性签名 -->
        <div v-else class="text-body2">
          <div v-if="setting.params == 'Sex'">
            <div v-if="setting.value == 1">{{ $t('male') }}</div>
            <div v-else-if="setting.value == 2">{{ $t('female') }}</div>
            <div v-else>{{ $t('unknown') }}</div>
          </div>
          <div v-else>
            <div v-if="setting.value == ''">- -</div>
            <div v-else>{{ setting.value }}</div>
          </div>
        </div>
      </div>
      <div>
        <q-btn flat :label="$t('edit')" class="bg-grey-1 text-grey-8" @click="openUpdateDialog(setting)"></q-btn>
      </div>
    </div>

    <q-dialog v-model="dialogShow">
      <q-card style="width: 350px">
        <q-card-section>
          <div class="text-h6">{{ $t('edit') }}{{ $t(currentSetting.name) }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <!-- 头像 -->
          <div class="relative row justify-center" v-if="currentSetting.params == 'Avatar'">
            <uploader @uploaded="(url) => { userInfoParams[currentSetting.params] = url; currentSetting.value = url }"
                      style="width: 100px">
              <template v-slot:default>
                <q-uploader-add-trigger />
                <q-avatar style="width: 80px;height: 80px;">
                  <q-img no-spinner :src="imageSrc(currentSetting.value)" />
                  <q-badge floating class="bg-transparent" :style="{ top: '70%' }">
                    <q-img no-spinner src="/src/assets/default/edit.png" width="28px" height="28px"></q-img>
                  </q-badge>
                </q-avatar>
              </template>
            </uploader>
          </div>

          <!-- 性别 -->
          <div v-else-if="currentSetting.params == 'Sex'">
            <q-select outlined v-model="userInfoParams[currentSetting.params]" :options="genderList"
                      option-value="value"
                      option-label="name" map-options emit-value dropdown-icon="expand_more" />
          </div>

          <!-- 生日 -->
          <div v-else-if="currentSetting.params == 'Birthday'">
            <q-input outlined v-model="dates" :label="$t(currentSetting.name)" mask="date">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="dates" mask="YYYY/MM/DD"></q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <!-- 手机号 -->
          <div v-else-if="currentSetting.params == 'telephone'">
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

              <div class="col-8">
                <q-input class="q-ml-xs" outlined v-model="userInfoParams[currentSetting.params]"
                         :label="$t('telephone')" />
              </div>
            </div>
          </div>

          <!-- 描述 -->
          <div v-else-if="currentSetting.params == 'Desc'">
            <q-input outlined type="textarea" v-model="userInfoParams[currentSetting.params]"
                     :label="$t(currentSetting.name)"></q-input>
          </div>

          <!-- 密码、秘钥 -->
          <div v-else-if="currentSetting.params == 'password' || currentSetting.params == 'SecretKey'">
            <q-input v-model="passwordParams.oldPassword" outlined class="q-mb-md"
                     :type="showPwd.oldPwd ? 'text' : 'password'"
                     :label="$t('oldPassword')">
              <template v-slot:append>
                <q-icon @click="showPwd.oldPwd = !showPwd.oldPwd"
                        :name="showPwd.oldPwd ? 'o_visibility' : 'o_visibility_off'"></q-icon>
              </template>
            </q-input>
            <q-input v-model="passwordParams.newPassword" outlined class="q-mb-md"
                     :type="showPwd.newPwd ? 'text' : 'password'"
                     :label="$t('password')">
              <template v-slot:append>
                <q-icon @click="showPwd.newPwd = !showPwd.newPwd"
                        :name="showPwd.newPwd ? 'o_visibility' : 'o_visibility_off'"></q-icon>
              </template>
            </q-input>
            <q-input v-model="cmfPassword" outlined class="q-mb-md"
                     :type="showPwd.cmfPwd ? 'text' : 'password'"
                     :label="$t('cmfPassword')">
              <template v-slot:append>
                <q-icon @click="showPwd.cmfPwd = !showPwd.cmfPwd"
                        :name="showPwd.cmfPwd ? 'o_visibility' : 'o_visibility_off'"></q-icon>
              </template>
            </q-input>
          </div>

          <!-- 姓名、邮箱 -->
          <div v-else>
            <q-input outlined v-model="userInfoParams[currentSetting.params]"
                     :label="$t(currentSetting.name)"></q-input>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-mt-md">
          <q-btn @click="updateUserInfo" flat :label="$t('cancel')" color="grey" />
          <q-btn @click="submit" flat :label="$t('submit')" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { secretKeyType, passwordType, userInfoCommon } from 'src/pages/common/users/info';
import uploader from 'src/components/uploader.vue';
import { onMounted, ref, watch } from 'vue';
import { imageSrc } from 'src/utils';
import { userStore } from 'stores/user';
import { userInfoAPI } from 'src/apis/users/info';
import { date } from 'quasar';
import { initStore } from 'stores/init';

const $userStore = userStore();
const $initStore = initStore();

//
const settingsList = ref([]) as any;

// 是否显示密码
const showPwd = ref({ oldPwd: false, newPwd: false, cmfPwd: false }) as any;

// 当前编辑数据
const currentSetting = ref({}) as any;

// 编辑弹窗
const dialogShow = ref(false) as any;

// 编辑弹窗
const dates = ref('') as any;
const {
  currentCountry,
  genderList,
  userInfoParams,
  passwordParams,
  cmfPassword,
  updateUserInfoFunc,
  updatePasswordFunc
} = userInfoCommon();

watch($userStore, () => {
  initData();
});

onMounted(() => {
  initData();
});

// 初始化数据
const initData = () => {
  settingsList.value = [
    { name: 'avatar', params: 'Avatar', value: $userStore.userInfo.Avatar },//
    { name: 'nickname', params: 'NickName', value: $userStore.userInfo.NickName },
    { name: 'email', params: 'email', value: $userStore.userInfo.email },
    {
      name: 'telephone',
      params: 'telephone',
      value: $userStore.userInfo.telephone != '' && $userStore.userInfo.telephone.indexOf('|') > -1 ? $userStore.userInfo.telephone.split('|')[1] : $userStore.userInfo.telephone
    },
    { name: 'sex', params: 'Sex', value: $userStore.userInfo.Sex },
    { name: 'birthday', params: 'Birthday', value: $userStore.userInfo.Birthday },
    { name: 'desc', params: 'Desc', value: $userStore.userInfo.Desc },
    { name: 'password', params: 'password', value: '' },
    { name: 'secretKey', params: 'SecretKey', value: '' }
  ];

  // 获取用户信息
  userInfoParams.value = { ...$userStore.userInfo };

  // 生日格式转换
  dates.value = date.formatDate(userInfoParams.value.Birthday, 'YYYY/MM/DD');

  if ($userStore.userInfo.telephone != '' && $userStore.userInfo.telephone.indexOf('|') > -1) {
    // 设置已保存国家
    const currentCountryCode = $userStore.userInfo.telephone.split('|')[0];
    const currentCountryIndex = $initStore.countryList.findIndex((item: any) => {
      return item.code == currentCountryCode;
    });
    currentCountry.value = $initStore.countryList[currentCountryIndex];
    userInfoParams.value.telephone = userInfoParams.value.telephone.split('|')[1];
  } else {
    // 如果电话为空，设置默认国家
    currentCountry.value = $initStore.countryList[0];
  }
};

// 打开弹窗
const openUpdateDialog = (setting: any) => {
  dialogShow.value = true;
  currentSetting.value = setting;
};

// 提交
const submit = () => {
  // 修改密码
  if (currentSetting.value.params == 'password' || currentSetting.value.params == 'SecretKey') {
    updatePasswordFunc(currentSetting.value.params == 'password' ? passwordType : secretKeyType, () => {
      dialogShow.value = false;
    });
  } else {
    // 修改用户信息
    userInfoParams.value.Birthday = date.formatDate(dates.value, 'YYYY/MM/DD');
    if (userInfoParams.value.telephone != '') {
      userInfoParams.value.telephone = currentCountry.value.code + '|' + userInfoParams.value.telephone;
    }
    updateUserInfoFunc(() => {
      initData();
      dialogShow.value = false;
    });
  }
};

// 更新当前用户信息
const updateUserInfo = () => {
  userInfoAPI().then((res: any) => {
    $userStore.updateUserInfo(res);
    initData();
    dialogShow.value = false;
  });
};

defineOptions({
  name: 'UserSetting'
});
</script>

<style scoped lang="scss"></style>

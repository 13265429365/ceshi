<template>
  <div>
    <div class="q-mt-lg q-px-lg">
      <q-form>
        <q-input class="q-mb-md" v-model="passwordParams.oldPassword" outlined
                 :type="showPwd.oldPwd ? 'text' : 'password'"
                 :label="$t('oldPassword')">
          <template v-slot:prepend>
            <q-img no-spinner class="iconLogo" src="/src/assets/default/icons/password.png" />
          </template>
          <template v-slot:append>
            <q-icon style="color: #999999;" :name="showPwd.oldPwd ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer" @click="showPwd.oldPwd = !showPwd.oldPwd" />
          </template>
        </q-input>
        <q-input class="q-mb-md" v-model="passwordParams.newPassword" outlined
                 :type="showPwd.newPwd ? 'text' : 'password'"
                 :label="$t('newPassword')">
          <template v-slot:prepend>
            <q-img no-spinner class="iconLogo" src="/src/assets/default/icons/password.png" />
          </template>
          <template v-slot:append>
            <q-icon style="color: #999999;" :name="showPwd.newPwd ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer" @click="showPwd.newPwd = !showPwd.newPwd" />
          </template>
        </q-input>
        <q-input class="q-mb-md" v-model="cmfPassword" outlined :type="showPwd.cmfPwd ? 'text' : 'password'"
                 :label="$t('cmfPassword')">
          <template v-slot:prepend>
            <q-img no-spinner class="iconLogo" src="/src/assets/default/icons/password.png" />
          </template>
          <template v-slot:append>
            <q-icon style="color: #999999;" :name="showPwd.cmfPwd ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer" @click="showPwd.cmfPwd = !showPwd.cmfPwd" />
          </template>
        </q-input>
        <q-btn @click="updatePasswordFunc(passwordType, $router.back)" size="lg" class="full-width q-mb-xl" unelevated
               rounded
               no-caps color="primary"
               :label="$t('submit')" />
      </q-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { passwordType, userInfoCommon } from 'src/pages/common/users/info';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

// 是否显示密码
const showPwd = ref({ oldPwd: false, newPwd: false, cmfPwd: false }) as any;
const { passwordParams, cmfPassword, updatePasswordFunc } = userInfoCommon();

const $i18n = useI18n()
const emit = defineEmits(['update'])
emit('update', {
  title: $i18n.t('updatePassword'),
  right: {
    callback: () => {},
    icon: ''
  },
})

defineOptions({
  name: 'UserUpdatePassword'
});
</script>


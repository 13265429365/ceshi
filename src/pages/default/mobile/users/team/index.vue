<template>
  <div class="column full-height">
    <div class="col page_bg column ">
      <div class="rounded-borders q-px-md q-py-lg row justify-between q-ma-md "
           style="background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);">
        <div class="row">
          <q-avatar size="50px" class="bg-white">
            <q-img no-spinner :src="imageSrc(teamInfo.avatar)"></q-img>
          </q-avatar>
          <div class="q-ml-md text-subtitle1">
            <div class="text-white">
              <span class="text-weight-medium text-h6" v-text="teamInfo.userName"></span>
            </div>
            <div class="text-white text-weight-medium text-caption">
              {{ $t('inviteNums') }} (<span v-text="teamInfo.children.length"></span>)
            </div>
          </div>
        </div>
        <div @click="$router.push({ name: 'TeamDetailsIndex' })" class="text-white">
          {{ $t('desc') }}
          <q-icon name="chevron_right" size="16px" />
        </div>
      </div>
      <div class="bg-white q-pa-md">
        <div v-for="(children, childrenIndex) in teamInfo.children" :key="childrenIndex">
          <div
            class="row justify-between bg-white q-py-md">
            <div class="row items-center">
              <q-avatar size="32px">
                <q-img no-spinner :src="imageSrc(children.avatar?children.avatar:'')"></q-img>
              </q-avatar>
              <div class="q-ml-md">
                <div class="text-color-3 text-body1 text-weight-medium">
                  {{ children.userName }}
                </div>
                <div class="text-grey-6 text-caption text-weight-regular text-weight-regular">
                  {{ date.formatDate(children.createdAt, 'YYYY/MM/DD HH:mm:ss') }}
                </div>
              </div>
            </div>
            <div>
              <div class="text-subtitle1 text-right">{{ children.nums }}</div>
              <div class="text-caption text-grey">{{ $t('inviteNums') }}</div>
            </div>
          </div>
          <q-separator style="height: 1px;background: #F4F5FD;" />
        </div>
      </div>
      <noData v-if="teamInfo.children.length<=0"></noData>
    </div>
  </div>
</template>

<script setup lang="ts">
import { teamCommon } from 'pages/common/users/team';
import noData from 'src/components/noData.vue';
import { date } from 'quasar';
import { imageSrc } from 'src/utils';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { teamInfo, teamInfoFunc } = teamCommon();

onMounted(() => {
  // 获取团队信息
  teamInfoFunc();
});

const $i18n = useI18n()
const emit = defineEmits(['update'])
emit('update', {
  title: $i18n.t('userTeam'),
  right: {
    callback: () => {},
    icon: ''
  },
})

defineOptions({
  name: 'TeamIndex'
});
</script>

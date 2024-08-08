<template>
  <div class="column full-height">
    <div class="col q-pa-md">
      <div class="rounded-borders q-px-md q-py-lg row"
           style="background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);">
        <q-avatar size="50px" class="bg-white">
          <q-img no-spinner :src="imageSrc(teamDetails.avatar)"></q-img>
        </q-avatar>
        <div class="q-ml-md text-body1">
          <div class="text-white text-weight-medium" v-text="teamDetails.userName"></div>
          <div class="text-white text-weight-medium text-body1">
            {{ $t('totalEarnings') }} <span v-text="'+' + teamDetails.totalEarning.money"></span>
          </div>
        </div>
      </div>

      <div class="rounded-borders bg-white q-px-md q-py-lg q-mt-md bg-grey-1">
        <div class="text-black text-weight-bold">{{ $t('statistics') }}</div>
        <div class="row ">
          <div class="col-4 q-pt-md">
            <div class="text-weight-bold text-h6 text-center" v-text="teamDetails.todayDeposit.money"></div>
            <div class="text-grey-8  text-subtitle2  text-center text-weight-regular ellipsis">
              {{ $t('todayDeposit') }}
            </div>
          </div>
          <div class="col-4 q-pt-md">
            <div class="text-weight-bold text-h6 text-center" v-text="teamDetails.todayEarning.money"></div>
            <div class="text-grey-8  text-subtitle2  text-center text-weight-regular ellipsis">
              {{ $t('todayEarnings') }}
            </div>
          </div>
          <div class="col-4 q-pt-md">
            <div class="text-weight-bold text-h6 text-center" v-text="teamDetails.todayPeople.nums"></div>
            <div class="text-grey-8  text-subtitle2  text-center text-weight-regular ellipsis">
              {{ $t('todayInvite') }}
            </div>
          </div>
          <div class="col-4 q-pt-md">
            <div class="text-weight-bold text-h6 text-center" v-text="teamDetails.totalDeposit.money"></div>
            <div class="text-grey-8  text-subtitle2  text-center text-weight-regular ellipsis">
              {{ $t('totalDeposit') }}
            </div>
          </div>
          <div class="col-4 q-pt-md">
            <div class="text-weight-bold text-h6 text-center" v-text="teamDetails.totalEarning.money"></div>
            <div class="text-grey-8  text-subtitle2  text-center text-weight-regular ellipsis">
              {{ $t('totalEarnings') }}
            </div>
          </div>
          <div class="col-4 q-pt-md">
            <div class="text-weight-bold text-h6 text-center" v-text="teamDetails.totalPeople.nums"></div>
            <div class="text-grey-8  text-subtitle2  text-center text-weight-regular ellipsis">
              {{ $t('totalInvite') }}
            </div>
          </div>
        </div>
      </div>

      <div class="q-py-md row">
        <div class="text-subtitle1 text-weight-bolder column col-3">
          <div class="text-center">{{ $t('record') }}</div>
          <q-separator style="height: 4px;width: 20px;border-radius: 2px;" class="bg-primary self-center" />
        </div>
      </div>

      <div v-for="(children, childrenIndex) in teamDetails.record" :key="childrenIndex"
           class="row justify-between items-center bg-white rounded-borders q-pa-md q-mb-md">
        <div>
          <div>{{ $t('username') }}：{{ children.UserName ? children.UserName : '- -' }}</div>
          <div class="text-grey-8 text-caption text-weight-regular text-weight-regular">
            {{ date.formatDate(children.createdAt, 'YYYY/MM/DD HH:mm:ss') }}
          </div>
        </div>
        <div class="row">
          <div class="text-right">
            <div class="text-primary text-subtitle1 text-weight-medium">+{{ children.money }}</div>
            <div class="text-caption text-right">{{ $t(children.name) }}</div>
          </div>
        </div>
      </div>
      <noData v-if="teamDetails.record.length <= 0"></noData>
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

const { teamDetails, teamDetailsFunc } = teamCommon();

onMounted(() => {
  // 获取团队详情
  teamDetailsFunc();
});

const $i18n = useI18n()
const emit = defineEmits(['update'])
emit('update', {
  title: $i18n.t('teamManage'),
  right: {
    callback: () => {},
    icon: ''
  },
})

defineOptions({
  name: 'TeamDetailsIndex'
});
</script>


<template>
  <div style="padding: 48px 100px;">
    <!-- 头像 -->
    <div class="rounded-borders q-pa-lg text-white" style="background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);">
      <div class="row items-center">
        <div class="row items-center">
          <q-avatar class="bg-white" size="60px">
            <q-img no-spinner :src="imageSrc(teamDetails.avatar)"></q-img>
          </q-avatar>
          <div class="q-ml-md text-white">
            <div class="text-h6 text-weight-bold">
              {{ teamDetails.userName }}
            </div>
            <div class="row no-wrap items-center q-mt-sm">
              <div class="text-white text-body1 text-weight-medium">
                {{ $t('totalEarnings') }} <span class="text-body1">+{{ teamDetails.money }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col q-ml-lg">
          <q-scroll-area style="height: 50px; width: 100%" :thumb-style="{ display: 'none' }">
            <div class="row no-wrap items-center">
              <div style="width: 160px" class="row justify-end items-center">
                <q-separator color="white" vertical inset />
                <div class="col">
                  <div class="text-h5 text-center text-weight-medium">{{ teamDetails.todayDeposit.money }}</div>
                  <div class="text-center text-caption">{{ $t('todayDeposit') }}</div>
                </div>
              </div>

              <div style="width: 160px" class="row justify-end items-center">
                <q-separator color="white" vertical inset />
                <div class="col">
                  <div class="text-h5 text-center text-weight-medium">{{ teamDetails.todayEarning.money }}</div>
                  <div class="text-center text-caption">{{ $t('todayEarnings') }}</div>
                </div>
              </div>

              <div style="width: 160px" class="row justify-end items-center">
                <q-separator color="white" vertical inset />
                <div class="col">
                  <div class="text-h5 text-center text-weight-medium">{{ teamDetails.todayPeople.nums }}</div>
                  <div class="text-center text-caption">{{ $t('todayInvite') }}</div>
                </div>
              </div>

              <div style="width: 160px" class="row justify-end items-center">
                <q-separator color="white" vertical inset />
                <div class="col">
                  <div class="text-h5 text-center text-weight-medium">{{ teamDetails.totalDeposit.money }}</div>
                  <div class="text-center text-caption">{{ $t('totalDeposit') }}</div>
                </div>
              </div>

              <div style="width: 160px" class="row justify-end items-center">
                <q-separator color="white" vertical inset />
                <div class="col">
                  <div class="text-h5 text-center text-weight-medium">{{ teamDetails.totalEarning.money }}</div>
                  <div class="text-center text-caption">{{ $t('totalEarnings') }}</div>
                </div>
              </div>

              <div style="width: 160px" class="row justify-end items-center">
                <q-separator color="white" vertical inset />
                <div class="col">
                  <div class="text-h5 text-center text-weight-medium">{{ teamDetails.totalPeople.nums }}</div>
                  <div class="text-center text-caption">{{ $t('totalInvite') }}</div>
                </div>
              </div>
            </div>
          </q-scroll-area>
        </div>
      </div>
    </div>

    <div class="q-mt-xl">
      <div v-for="(children, childrenIndex) in teamDetails.record" :key="childrenIndex">
        <div class="row justify-between items-center q-my-lg q-px-md">
          <div class="col row items-center">
            <div class="q-ml-sm">
              <div class="text-body2 text-bold">
                {{ $t('username') }}：{{ children.UserName? children.UserName:'- -' }}
              </div>
              <div class="text-grey text-caption">{{ date.formatDate(children.createdAt, 'YYYY/MM/DD HH:mm:ss') }}
              </div>
            </div>
          </div>
          <div class="col">
            <div class="text-center">{{ $t(children.name) }}</div>
          </div>
          <div class="col">
            <div class="text-primary text-h6 text-right q-mr-lg">
              +{{ children.money }}
            </div>
          </div>
        </div>
        <q-separator />
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

const { teamDetails, teamDetailsFunc } = teamCommon();

onMounted(() => {
  // 获取团队详情
  teamDetailsFunc();
});

defineOptions({
  name: 'TeamDetailsIndex'
})
</script>


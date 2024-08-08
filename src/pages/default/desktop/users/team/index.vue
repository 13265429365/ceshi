<template>
  <div style="padding: 48px 100px;">
    <!-- 总金额 -->
    <div class="row justify-between items-center q-pa-lg rounded-borders"
         style="background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);">
      <div class="row items-center">
        <q-avatar size="60px" class="bg-white">
          <q-img no-spinner :src="imageSrc(teamInfo.avatar)"></q-img>
        </q-avatar>

        <div class="q-ml-md text-white">
          <div class="text-h6 text-weight-bold">
            {{ teamInfo.userName }}
          </div>
          <div class="row no-wrap items-center q-mt-sm">
            <div class="text-white text-subtitle2">
              {{ $t('inviteNums') }} (<span class="text-body1">{{ teamInfo.children.length }}</span>)
            </div>
          </div>
        </div>
      </div>
      <div>
        <div @click="$router.push({ name: 'TeamDetailsIndex' })"
             class="cursor-pointer text-white text-body2">
          <span>{{ $t('desc') }}</span>
          <q-icon size="14px" class="text-white" name="arrow_forward_ios"></q-icon>
        </div>
      </div>
    </div>

    <div v-if="teamInfo.children.length>0" class="q-mt-xl bg-grey-1 rounded-borders q-pa-md">
      <div v-for="(children, childrenIndex) in teamInfo.children" :key="childrenIndex">
        <div class="row justify-between items-center q-my-lg q-px-md">
          <div class="col row items-center">
            <q-avatar size="40px">
              <q-img no-spinner :src="imageSrc(children.avatar)"></q-img>
            </q-avatar>
            <div class="q-ml-sm">
              <div class="text-caption text-grey">{{ $t('username') }}</div>
              <div class="text-body1 text-bold">
                {{ children.userName }}
              </div>
            </div>
          </div>
          <div class="col">
            <div class="text-caption text-grey">{{ $t('registerTime') }}</div>
            <div class="text-body1">
              {{ date.formatDate(children.createdAt, 'YYYY/MM/DD HH:mm:ss') }}
            </div>
          </div>
          <div class="col text-right">
            <div class="text-caption text-grey">{{ $t('inviteNums') }}</div>
            <div class="text-primary text-h6">
              {{ children.nums }}
            </div>
          </div>
        </div>
        <q-separator style="height: 1px;background: #F4F5FD;" />
      </div>
    </div>
    <noData v-else></noData>
  </div>
</template>

<script setup lang="ts">
import { teamCommon } from 'pages/common/users/team';
import noData from 'src/components/noData.vue';
import { date } from 'quasar';
import { imageSrc } from 'src/utils';
import { onMounted } from 'vue';

const { teamInfo, teamInfoFunc } = teamCommon();

onMounted(() => {
  // 获取团队信息
  teamInfoFunc();
});

defineOptions({
  name: 'TeamIndex'
});
</script>

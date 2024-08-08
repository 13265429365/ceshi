<template>
  <div>
    <q-list v-if="itemList.length>0" bordered class="rounded-borders q-pa-md q-mt-lg">
      <slot :itemList="itemList"></slot>
      <!-- 钱包订单 -->
      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="dataParams.pagination.page"
          @update:model-value="loadMore"
          :max="total"
          :min="1"
          input
        />
      </div>
    </q-list>
    <noData v-else></noData>
  </div>
</template>

<script setup lang="ts">
import noData from 'components/noData.vue';
import { defineProps, PropType, ref, watch } from 'vue';
import { AxiosResponse } from 'axios';

const props = defineProps({
  // promise请求
  request: {
    required: true,
    type: Function as PropType<(params: any) => Promise<AxiosResponse<any>>>,
    default: () => {
      return () => {};
    }
  },

  // 请求参数
  params: {
    required: true,
    default: () => {
      return {
        pagination: {
          descending: true,
          page: 1,
          rowsPerPage: 10,
          sortBy: 'createdAt'
        }
      };
    }
  }
});

// 列表总页数
const total = ref(false) as any;

// 列表
const itemList = ref([]) as any;

// 获取列表参数
const dataParams = ref({
  pagination: {
    descending: true,
    page: 1,
    rowsPerPage: 10,
    sortBy: 'createdAt'
  }
}) as any;

// 监听父组件params变化
watch(props.params,(newValue:any)=>{
  dataParams.value = newValue
})

const initData = () => {
  dataParams.value = props.params
  loadMore()
}

// 获取列表数据
const loadMore = async () => {
  if (dataParams.value.hasOwnProperty('createdAt')&&!dataParams.value.createdAt) {
    return false
  }
  // 执行父组件传递的promise请求
  props.request(dataParams.value).then((res: any) => {
    total.value = Math.ceil(res.count / dataParams.value.pagination.rowsPerPage);
    itemList.value = res.items;
  });
};

// 将方法暴露给父组件
defineExpose({ initData });

defineOptions({
  name: 'paginationIndex'
});
</script>

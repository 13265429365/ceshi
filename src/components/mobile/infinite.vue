<template>
  <q-infinite-scroll
    v-if="ready"
    @load="loadMore"
    :offset="0"
    :debounce="400"
    :disable="disable"
    :style="{ minHeight: height + 'px' }"
    class="q-pb-md"
  >
    <slot :itemList="itemList"></slot>
    <div v-if="loading" class="row justify-center">
      <q-spinner-dots color="primary" size="40px" />
    </div>
  </q-infinite-scroll>
</template>

<script setup lang="ts">
import { defineProps, onMounted, PropType, ref } from 'vue';
import { AxiosResponse } from 'axios';

const props = defineProps({
  // promise请求
  request: {
    required: true,
    type: Function as PropType<(params: any) => Promise<AxiosResponse<any>>>,
    default: () => {
      return () => {
      };
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
      } as any;
    }
  },

  //最小高度
  height: {
    required: true,
    type: Number,
    default: () => {
      return 1000;
    }
  }
});

// 子组件修改page方法
const emit = defineEmits(['updatePage']);

// 是否禁止滚动加载
const disable = ref(true) as any;

// 是否禁止滚动加载
const loading = ref(false) as any;

// 列表
const itemList = ref([]) as any;

// 阻止QInfiniteScroll组件自动执行 @load 事件
const ready = ref(false) as any;

onMounted(()=>{
  // q-infinite-scroll首次自动加载
  setTimeout(()=>{
    ready.value = true
  },100)
})

// 初始化数据
const initData = ()=>{
  console.log('初始化');
  // 清空列表
  itemList.value = []

  // 重置组件状态
  disable.value = false

  // 重置父组件page页数
  emit('updatePage', 1);
  loadMore()
}

// 获取列表数据
const loadMore = async (index?: any, done?: any) => {
  console.log('加载', index);
  try {
    loading.value = true;
    // 执行父组件传递的promise请求
    props.request(props.params).then((res: any) => {
      // 列表返回长度<每页显示数量，禁止滚动
      if (res.items.length < props.params.pagination.rowsPerPage) {
        disable.value = true;
        itemList.value.push(...res.items);
      } else {
        itemList.value.push(...res.items);
        emit('updatePage', props.params.pagination.page + 1);
      }
      loading.value = false;
    });
  } finally {
    if (done) {
      done();
    }
  }
};

// 将方法暴露给父组件
defineExpose({ loadMore, initData });

defineOptions({
  name: 'infiniteIndex'
});
</script>

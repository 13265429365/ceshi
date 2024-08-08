<template>
  <div style="padding: 80px 0 260px">
    <div>
      <div style="padding: 20px 10%">
        <div>
          <q-card flat bordered v-for="( helper, helperIndex ) in  articleList" :key="helperIndex" class="q-mb-md">
            <q-card-section>
              <div class="text-h6">{{helper.name}}</div>
            </q-card-section>
            <q-card-section>
              <div v-html="helper.content"></div>
            </q-card-section>
            <q-card-actions align="right">
              <div class="text-caption text-grey">{{date.formatDate(helper.createdAt, 'YYYY/MM/DD HH:mm:ss')}}</div>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { articleCommon } from 'pages/common/index/article';
import { date } from 'quasar';
import { onMounted } from 'vue';

const { articleList, articleListFunc } = articleCommon();

onMounted(()=>{
  // 获取文章列表
  articleListFunc()
})

defineOptions({
  name: 'HelpersIndex'
});
</script>

<style lang="scss" scoped></style>

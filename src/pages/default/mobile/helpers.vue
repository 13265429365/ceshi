<template>
  <div>
    <!-- 背景 -->
    <div class="bg absolute full-width"
         style="background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);
        height: 190px;
        border-bottom-left-radius: 15%;
        border-bottom-right-radius: 15%;"
    ></div>

    <div class="q-pa-md">
      <div class="row justify-between">
        <div class="col-9 z-top">
          <div class="text-body1 text-white text-weight-bold q-mb-sm">
            {{ $t('helperTitle') }}
          </div>
          <div style="background: rgba(255, 255, 255, 0.12);padding: 7px 16px;max-width: 131px;border-radius: 19px;"
               class="text-center text-white ellipsis">{{ $t('24hour') }}
          </div>
        </div>
        <div class="col column justify-end">
          <q-img no-spinner style="margin-bottom: -15px;margin-right: 20px;" src="/src/assets/default/helpers.png"
                 width="62px"
                 height="79px" />
        </div>
      </div>

      <div class="row q-col-gutter-md justify-center q-mt-lg"></div>
    </div>

    <!-- 帮助中心列表 -->
    <div class="bg-grey-1 q-pb-xl" :style="{ minHeight: $q.screen.height - 190 + 'px' }">
      <q-list class="q-ma-md bg-white text-black rounded-borders">
        <q-card flat>
          <q-card-section>
            <div class="text-h6 text-weight-medium">FAQ</div>
          </q-card-section>
        </q-card>
        <q-expansion-item v-for="(helper, helperIndex) in articleList" :key="helperIndex" :label="helper.name">
          <q-card flat>
            <q-card-section>
              <div v-html="helper.content"></div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { articleCommon } from 'pages/common/index/article';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { articleList, articleListFunc } = articleCommon();

onMounted(() => {
  // 获取文章列表
  articleListFunc();
});

const $i18n = useI18n()
const emit = defineEmits(['update'])
emit('update', {
  title: $i18n.t('helpers'),
  right: {
    callback: () => {},
    icon: ''
  },
})

defineOptions({
  name: 'HelpersIndex'
});
</script>

<style lang="scss" scoped></style>

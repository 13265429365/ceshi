<template>
  <div>
    <q-dialog v-model="showDialog">
      <q-card style="width: 350px">
        <q-card-section class="q-pb-none relative-position">
          <div class="text-h6 text-center">{{ $t('notice') }}</div>
          <q-icon class="absolute-right" style="right: 10px;top: 20px" name="close" size="20px"
                  @click="showDialog = false" />
        </q-card-section>
        <q-card-section class="q-pa-lg">
          <div>{{ content != '' ? $t(content) : '' }}</div>
        </q-card-section>
        <q-card-section class="q-py-lg">
          <div class="row justify-center">
            <q-btn @click="showDialog=false" class="col-6" unelevated rounded no-caps color="primary">
              {{ $t('confirm') }}
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const $route = useRoute()
const showDialog = ref(false)
const props = defineProps({content: {type: String, default: ''}})
const currentValue = ref('')

onMounted(() => {
  currentValue.value = props.content
})

watch(() => props.content, (content: string) => {
  currentValue.value = content
  if (currentValue.value != '' && currentValue.value != ' ' && $route.name=='HomeIndex') {
    showDialog.value = true
  }
})

defineOptions({
  name: 'NoticeIndex'
})
</script>

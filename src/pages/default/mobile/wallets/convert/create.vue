<template>
  <div class="column q-pa-md">
    <!-- 转换资金｜资产 -->
    <q-card class="relative-position bg-grey-2 rounded-borders" flat>
      <q-card-section class="text-grey-7 q-py-md q-px-xs">
        <div class="row items-center no-wrap">
          <q-btn @click="showAssetsPopup = true;AssetsType=ConvertSideFrom" class="col-5" flat no-caps rounded>
            <template v-slot:default>
              <div class="row items-center no-wrap">
                <q-img width="26px" height="26px"
                       :src="imageSrc(assetsInfo.icon)"
                       no-spinner alt="" />
                <div class="text-weight-bold q-ml-sm" style="min-width: 50px">
                  {{ assetsInfo.name }}
                </div>
                <q-icon name="arrow_drop_down" class="q-ml-sm"></q-icon>
              </div>
            </template>
          </q-btn>
          <q-separator vertical inset style="background: #bbb;" />
          <q-input v-model.number="convertParams.money" dense borderless class="q-px-lg">
            <template v-slot:append>
                <span @click="convertParams.money = assetsInfo.userAssets.money"
                      class="text-primary text-body1 cursor-pointer">
                  {{ $t('all') }}
                </span>
            </template>
          </q-input>
        </div>
      </q-card-section>
    </q-card>

    <div class="text-grey-7 q-mt-sm text-right" v-if="assetsList.length > 0">
      <span v-if="!convertParams.assetsId">
        {{ $t('availableBalance') }}: {{ $t('currency') }}
        {{ Number(assetsInfo.userAssets.money).toFixed(2) }}
      </span>
      <span v-else>
        {{ $t('availableAssets') }}: {{ Number(assetsInfo.userAssets.money).toFixed(4) }}
        {{ assetsInfo.name }}
      </span>
    </div>

    <div class="row justify-center q-my-lg">
      <q-btn @click="invertFunc" style="width: 25px;height: 25px" round flat icon="swap_vert" color="primary"></q-btn>
    </div>

    <!-- 获得资金资产 -->
    <q-card class="relative-position bg-grey-2 rounded-borders" flat>
      <q-card-section class="text-grey-7 q-py-md q-px-xs">
        <div class="row items-center no-wrap">
          <q-btn @click="showAssetsPopup = true;AssetsType=ConvertSideTo" class="col-5" flat no-caps rounded>
            <template v-slot:default>
              <div class="row items-center no-wrap">
                <q-img width="26px" height="26px"
                       :src="imageSrc(toAssetsInfo.icon)"
                       no-spinner alt="" />
                <div class="text-weight-bold q-ml-sm" style="min-width: 50px">
                  {{ toAssetsInfo.name }}
                </div>
                <q-icon name="arrow_drop_down" class="q-ml-sm"></q-icon>
              </div>
            </template>
          </q-btn>
        </div>
      </q-card-section>
    </q-card>

    <!-- 预览按钮 -->
    <div class="q-px-md absolute-bottom" style="bottom: 20px;">
      <q-btn @click="convertInfoFunc" no-caps rounded unelevated size="lg" color="primary" class="full-width q-py-sm">
        {{ $t('views') }}
      </q-btn>
    </div>


    <!-- 选择所有币种弹窗 -->
    <q-dialog v-model="showAssetsPopup" position="bottom">
      <q-card class="q-py-md relative-position">
        <q-card-section class="q-pa-none">
          <div class="text-h6 text-center">{{ $t('currencies') }}</div>
          <q-btn icon="close" color="grey" class="absolute-bottom-right" flat round dense
                 @click="showAssetsPopup = false" />
        </q-card-section>

        <q-card-section class="q-pa-none q-mt-lg">
          <q-list>
            <template v-for="assets in assetsList" :key="assets">
              <q-item @click="switchAssetsFunc(AssetsType, assets)" clickable class="q-py-md" v-if="
            (AssetsType == ConvertSideFrom && toAssetsInfo.id != assets.id) || (AssetsType == ConvertSideTo && assetsInfo.id != assets.id)">
                <div class="row items-center">
                  <q-img :src="imageSrc(assets.icon)" width="36px" height="36px" no-spinner alt=""></q-img>
                  <div class="q-ml-md">
                    <div class="text-body1">{{ assets.name }}</div>
                    <div class="text-caption text-grey">{{ Number(assets.userAssets.money).toFixed(4) }}</div>
                  </div>
                </div>
              </q-item>
            </template>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- 预览结果弹窗 -->
    <q-dialog v-model="showPreview" position="bottom">
      <q-card class="q-py-md relative-position">
        <q-card-section class="q-pa-none">
          <div class="text-h6 text-center">{{ $t('confirmRedemption') }}</div>
          <q-btn icon="close" color="grey" class="absolute-bottom-right" flat round dense
                 @click="showPreview = false" />
        </q-card-section>

        <q-card-section class="q-px-md q-mt-xs q-gutter-y-md">
          <div class="text-center text-grey-7">{{ $t('receive') }}</div>
          <div class="text-center">
            <span class="text-h5 text-weight-medium">{{ (convertParams.money * rate).toFixed(6) }}</span>
            <span class="q-ml-sm text-body1">{{ assetsList.find((assets: any) => {
              return assets.id == convertParams.toAssetsId;
            })?.name }}</span>
          </div>
          <q-card-section class="bg-grey-2">
            <div class="row justify-between">
              <span class="text-grey">{{ $t('assets') }}</span>
              <div class="text-weight-medium">
                <span>{{ convertParams.money }}</span>
                <span class="q-ml-xs">{{ assetsList.find((assets: any) => {
                  return assets.id == convertParams.assetsId;
                })?.name }}</span>
              </div>
            </div>
            <div class="row justify-between q-mt-sm">
              <span class="text-grey">{{ $t('ratio') }}</span>
              <div class="text-weight-medium">
              <span>1 {{ assetsList.find((assets: any) => {
                return assets.id == convertParams.assetsId;
              })?.name }} ≈ {{ Number(rate).toFixed(6) }}</span>
                <span class="q-ml-xs">{{ assetsList.find((assets: any) => {
                  return assets.id == convertParams.toAssetsId;
                })?.name }}</span>
              </div>
            </div>
          </q-card-section>
        </q-card-section>

        <q-card-section class="row q-col-gutter-x-lg q-mt-md">
          <div class="col-6">
            <q-btn @click="convertInfoFunc" rounded flat no-caps class="bg-grey-2 full-width q-py-sm">{{ $t('refresh')
              }}
            </q-btn>
          </div>
          <div class="col-6">
            <q-btn @click="submitFunc" rounded flat no-caps
                   class="bg-primary text-white full-width q-py-sm">{{
                $t('confirm') }}
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- 输入秘钥弹窗 -->
    <GlobalDialog
      ref="securityDialogRef"
      :title="$t('secretKey')"
      :on-confirm-callback="createConvertFunc"
    >
      <q-input outlined v-model="convertParams.securityKey" type="password"
               :label="$t('enterSecretKey')"></q-input>
    </GlobalDialog>
  </div>
</template>

<script setup lang="ts">
import { convertCommon } from 'pages/common/wallets/convert';
import GlobalDialog from 'components/dialog.vue';
import { imageSrc } from 'src/utils';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const {
  securityDialogRef,
  convertParams,
  assetsList,
  showPreview,
  assetsInfo,
  toAssetsInfo,
  ConvertSideFrom,
  ConvertSideTo,
  showAssetsPopup,
  AssetsType,
  rate,
  walletsAssetsListFunc,
  switchAssetsFunc,
  submitFunc,
  createConvertFunc,
  convertInfoFunc,
  invertFunc
} = convertCommon();

onMounted(() => {
  // 获取钱包资产列表
  walletsAssetsListFunc();
});

const $i18n = useI18n()
const $router = useRouter()
const emit = defineEmits(['update'])
emit('update', {
  title: $i18n.t('convert'),
  right: {
    callback: () => {
      $router.push({ name: 'WalletsConvertRecord' });
    },
    icon: 'o_wysiwyg'
  },
})

defineOptions({
  name: 'WalletsConvertCreate'
});
</script>

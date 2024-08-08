import { markRaw, reactive, toRefs } from 'vue';
import { userAssetsDetailsAPI, userAssetsListAPI } from 'src/apis/wallets/assets';
import * as echarts from 'echarts';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

//资产充值模式
export const assetsDepositMode = 2;

//资产提现模式
export const assetsWithdrawalMode = 12;

// 每个资产背景色
const colorList = [
  '#3F82FE', '#14C9C9', '#F7BA1E'
];

// 饼状图id
const echartsPieId = 'pie';

// 折线图id
const echartsLineId = 'line';

// 柱状图
const pieOptions = {
  tooltip: {
    trigger: 'item'
  },
  title: {
    text: '',
    subtext: '',
    left: 'center', // 标题居中
    top: '35%',
    textStyle: { // 标题样式
      color: '#4E5969', // 标题颜色
      fontSize: '12px',
      textDecoration: 'underline' // 标题装饰
    },
    subtextStyle: { // 子标题样式
      color: '#1D2129', // 子标题颜色
      fontStyle: 'bold', // 子标题字体样式
      fontSize: '12px'
    },
    padding: [10, 10], // 标题与内容间距
    itemGap: 8 // 同一级标签间距
  },
  series: {
    type: 'pie',
    radius: ['55%', '90%'],
    label: {
      show: false
    },
    data: []
  }
} as any;

// 折线图
const lineOptions = {
  tooltip: { trigger: 'axis' },
  legend: { data: [], top: '0' },
  grid: { left: '0', right: '0', bottom: '36px', containLabel: true },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: []
  },
  yAxis: { type: 'value' },
  series: []
} as any;

export const userAssetsCommon = () => {
  const $i18n = useI18n()
  const $route = useRoute()

  const state = reactive({
    // 用户资产列表
    userAssetsList: {
      assetsList: [
        {
          userAssets: {} as any
        } as any
      ] as any,
      echarts: {} as any,
      sumAmount: 0 as any,
      sumMoney: 0 as any
    } as any,

    //是否显示金额
    showMoney: true,

    //饼状图实例
    pieChart: null as any,

    //折线图实例
    lineChart: null as any,

    // 用户资产信息
    userAssetsInfo: { userAssets: { symbol: '' } as any } as any,
  });

  // 获取用户资产列表
  const userAssetsListFunc = async () => {
    await userAssetsListAPI().then((res: any) => {
      state.userAssetsList = res;
      if (state.userAssetsList.assetsList.length > 0) {
        state.userAssetsList.assetsList.forEach((item: any, index: any) => {
          const color = Math.floor(Math.random() * 16777215).toString(16);
          colorList[index] = '#' + color;
        });

        setTimeout(()=>{
          initChart();
        },200)
      }
    });
  };

  // 获取用户资产详情
  const userAssetsDetailsFunc = () => {
    userAssetsDetailsAPI({ id: Number($route.query.id) }).then((res: any) => {
      state.userAssetsInfo = res
    });
  };

  // 初始化echarts
  const initChart = () => {
    // 饼状图
    state.pieChart = markRaw(echarts.init(document.getElementById(echartsPieId)));
    window.addEventListener('resize', ()=>{ state.pieChart.resize() })
    pieOptions.title.text = $i18n.t('totalAssets')
    pieOptions.title.subtext = state.userAssetsList.sumMoney.toFixed(2) + ''
    pieOptions.series.data = []
    state.userAssetsList.assetsList.forEach((item:any)=>{
      pieOptions.series.data.push({
        name: item.name,
        value: item.userAssets.money,
      })
    })
    state.pieChart.setOption(pieOptions);

    // 折线图
    state.lineChart = markRaw(echarts.init(document.getElementById(echartsLineId)));
    window.addEventListener('resize', ()=>{ state.lineChart.resize() })
    lineOptions.series = state.userAssetsList.echarts.series
    lineOptions.xAxis.data = state.userAssetsList.echarts.category
    lineOptions.legend.data = []
    state.userAssetsList.assetsList.forEach((item:any)=>{
      lineOptions.legend.data.push(item.name)
    })
    state.lineChart.setOption(lineOptions);
    lineOptions.title = ''
  };

  // 销毁echarts
  const delCharts = ()=>{
    if (state.pieChart) {
      state.pieChart.dispose()
      window.removeEventListener('resize', ()=>{ state.pieChart.resize() })

    }
    if (state.lineChart) {
      state.lineChart.dispose()
      window.removeEventListener('resize', ()=>{ state.lineChart.resize() })
    }
  }

  return {
    echartsPieId,
    echartsLineId,
    colorList,
    ...toRefs(state),
    userAssetsListFunc,
    delCharts,
    userAssetsDetailsFunc,
  };
}

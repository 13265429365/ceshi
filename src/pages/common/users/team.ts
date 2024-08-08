import { reactive, toRefs } from 'vue';
import { teamInfoAPI, teamDetailsAPI } from 'src/apis/users/team';

export const teamCommon = () => {
  const state = reactive({
    // 团队信息
    teamInfo: { earning: {} as any, children: [] as any } as any,

    // 团队详情
    teamDetails: {
      todayDeposit: {} as any,
      todayEarning: {} as any,
      todayPeople: {} as any,
      totalDeposit: {} as any,
      totalEarning: {} as any,
      totalPeople: {} as any,
      record: [] as any
    } as any
  });

  // 获取团队信息
  const teamInfoFunc = () => {
    teamInfoAPI().then((res: any) => {
      state.teamInfo = res;
      if (res.children == null) {
        state.teamInfo.children = [];
      }
    });
  };

  // 获取团队详情
  const teamDetailsFunc = (() => {
    teamDetailsAPI().then((res: any) => {
      state.teamDetails = res
      if (!res.record) {
        state.teamDetails.record = []
      }
    });
  });

  return {
    ...toRefs(state),
    teamInfoFunc,
    teamDetailsFunc
  };
};

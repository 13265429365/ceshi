import{Q as v}from"./QImg-QNFGeKBr.js";import{n as x,E as p,A as w,_ as y,s as n,t as r,B as t,y as i,v as m,Q as g,D as e,G as u,F as D,C as f,u as b,x as q,P as a}from"./index-BkcOOe94.js";import{Q as j}from"./QScrollArea-Cs2VY-jx.js";import{t as E}from"./team-xkD79XhX.js";import{n as S}from"./noData-DimX0njy.js";import{d as B}from"./date-hLWyfEDb.js";import"./QResizeObserver-ReeZP_rW.js";import"./QScrollObserver--CNmQVR3.js";import"./TouchPan-bYjVcIeX.js";import"./selection-DMuMQtZs.js";import"./format-DyQxkAtJ.js";import"./team-SZJWgW2D.js";const N=x({name:"TeamDetailsIndex",__name:"details",setup(o,{expose:l}){l();const{teamDetails:_,teamDetailsFunc:s}=E();p(()=>{s()});const d={teamDetails:_,teamDetailsFunc:s,noData:S,get date(){return B},get imageSrc(){return w}};return Object.defineProperty(d,"__isScriptSetup",{enumerable:!1,value:!0}),d}}),Q={style:{padding:"48px 100px"}},k={class:"rounded-borders q-pa-lg text-white",style:{background:"linear-gradient(93deg, #10BE70 0%, #91DB82 100%)"}},A={class:"row items-center"},C={class:"row items-center"},F={class:"q-ml-md text-white"},I={class:"text-h6 text-weight-bold"},P={class:"row no-wrap items-center q-mt-sm"},V={class:"text-white text-body1 text-weight-medium"},Y={class:"text-body1"},M={class:"col q-ml-lg"},H={class:"row no-wrap items-center"},T={style:{width:"160px"},class:"row justify-end items-center"},U={class:"col"},z={class:"text-h5 text-center text-weight-medium"},G={class:"text-center text-caption"},L={style:{width:"160px"},class:"row justify-end items-center"},O={class:"col"},J={class:"text-h5 text-center text-weight-medium"},K={class:"text-center text-caption"},R={style:{width:"160px"},class:"row justify-end items-center"},W={class:"col"},X={class:"text-h5 text-center text-weight-medium"},Z={class:"text-center text-caption"},$={style:{width:"160px"},class:"row justify-end items-center"},tt={class:"col"},et={class:"text-h5 text-center text-weight-medium"},st={class:"text-center text-caption"},ot={style:{width:"160px"},class:"row justify-end items-center"},it={class:"col"},at={class:"text-h5 text-center text-weight-medium"},ct={class:"text-center text-caption"},nt={style:{width:"160px"},class:"row justify-end items-center"},dt={class:"col"},rt={class:"text-h5 text-center text-weight-medium"},lt={class:"text-center text-caption"},_t={class:"q-mt-xl"},mt={class:"row justify-between items-center q-my-lg q-px-md"},ht={class:"col row items-center"},vt={class:"q-ml-sm"},xt={class:"text-body2 text-bold"},pt={class:"text-grey text-caption"},wt={class:"col"},yt={class:"text-center"},gt={class:"col"},ut={class:"text-primary text-h6 text-right q-mr-lg"};function Dt(o,l,_,s,d,ft){return n(),r("div",Q,[t("div",k,[t("div",A,[t("div",C,[i(g,{class:"bg-white",size:"60px"},{default:m(()=>[i(v,{"no-spinner":"",src:s.imageSrc(s.teamDetails.avatar)},null,8,["src"])]),_:1}),t("div",F,[t("div",I,e(s.teamDetails.userName),1),t("div",P,[t("div",V,[u(e(o.$t("totalEarnings"))+" ",1),t("span",Y,"+"+e(s.teamDetails.money),1)])])])]),t("div",M,[i(j,{style:{height:"50px",width:"100%"},"thumb-style":{display:"none"}},{default:m(()=>[t("div",H,[t("div",T,[i(a,{color:"white",vertical:"",inset:""}),t("div",U,[t("div",z,e(s.teamDetails.todayDeposit.money),1),t("div",G,e(o.$t("todayDeposit")),1)])]),t("div",L,[i(a,{color:"white",vertical:"",inset:""}),t("div",O,[t("div",J,e(s.teamDetails.todayEarning.money),1),t("div",K,e(o.$t("todayEarnings")),1)])]),t("div",R,[i(a,{color:"white",vertical:"",inset:""}),t("div",W,[t("div",X,e(s.teamDetails.todayPeople.nums),1),t("div",Z,e(o.$t("todayInvite")),1)])]),t("div",$,[i(a,{color:"white",vertical:"",inset:""}),t("div",tt,[t("div",et,e(s.teamDetails.totalDeposit.money),1),t("div",st,e(o.$t("totalDeposit")),1)])]),t("div",ot,[i(a,{color:"white",vertical:"",inset:""}),t("div",it,[t("div",at,e(s.teamDetails.totalEarning.money),1),t("div",ct,e(o.$t("totalEarnings")),1)])]),t("div",nt,[i(a,{color:"white",vertical:"",inset:""}),t("div",dt,[t("div",rt,e(s.teamDetails.totalPeople.nums),1),t("div",lt,e(o.$t("totalInvite")),1)])])])]),_:1})])])]),t("div",_t,[(n(!0),r(D,null,f(s.teamDetails.record,(c,h)=>(n(),r("div",{key:h},[t("div",mt,[t("div",ht,[t("div",vt,[t("div",xt,e(o.$t("username"))+"："+e(c.UserName?c.UserName:"- -"),1),t("div",pt,e(s.date.formatDate(c.createdAt,"YYYY/MM/DD HH:mm:ss")),1)])]),t("div",wt,[t("div",yt,e(o.$t(c.name)),1)]),t("div",gt,[t("div",ut," +"+e(c.money),1)])]),i(a)]))),128)),s.teamDetails.record.length<=0?(n(),b(s.noData,{key:0})):q("",!0)])])}const It=y(N,[["render",Dt],["__file","details.vue"]]);export{It as default};
import{Q as f}from"./QImg-D2kCY975.js";import{n as b,E as g,A as y,_ as v,s as i,t as _,B as e,D as n,y as l,v as c,F as x,C as L,u as S,Z as h,U as k,N as w,W as B}from"./index-BAN5Iapo.js";import{Q as D}from"./QScrollArea-B8RE4RdN.js";import{l as C}from"./level-BHlzSLvL.js";import{G as I}from"./dialog-Cc7HrlA3.js";import"./QResizeObserver-Dzscdk3d.js";import"./QScrollObserver-kbnwuHar.js";import"./TouchPan-CzwIcN1G.js";import"./selection-D7ga6MDQ.js";import"./format-DyQxkAtJ.js";const Q=b({name:"UserLevelIndex",__name:"level",setup(o,{expose:d}){d();const{buyDialogRef:m,userInfo:t,levelList:u,currentLevel:p,levelListFunc:s,createLevelFunc:r}=C();g(()=>{s()});const a={buyDialogRef:m,userInfo:t,levelList:u,currentLevel:p,levelListFunc:s,createLevelFunc:r,GlobalDialog:I,get imageSrc(){return y}};return Object.defineProperty(a,"__isScriptSetup",{enumerable:!1,value:!0}),a}}),q={style:{margin:"80px 0 120px 0"}},F={class:"text-center q-mb-xl"},R={class:"text-h5",style:{"font-size":"32px"}},$={class:"column items-center"},z={class:"row no-wrap q-pt-lg q-gutter-sm"},E=e("div",{style:{height:"64px"}},null,-1),G={class:"text-center text-body1"},M={class:"text-center"},N={class:"text-caption"},A={class:"text-h5 text-bold"},H={class:"q-mt-md"},T=["innerHTML"];function U(o,d,m,t,u,p){return i(),_("div",q,[e("div",F,[e("div",R,n(o.$t("levelSmall")),1)]),e("div",$,[l(D,{style:{height:"440px",width:"80%"},"thumb-style":{height:"0"}},{default:c(()=>[e("div",z,[(i(!0),_(x,null,L(t.levelList,(s,r)=>(i(),S(B,{key:r,style:h({width:"288px",height:"400px",borderRadius:"8px",boxShadow:"0px 4px 10px 0px rgba(192,192,192,0.3)"}),class:"cursor-pointer"},{default:c(()=>[e("div",{style:h({height:"160px",background:"linear-gradient(180deg, #10BE70 0%, #91DB82 100%)",color:"white"}),class:"q-pb-md"},[l(f,{"no-spinner":"",class:"absolute",src:t.imageSrc(s.icon),width:"54px",height:"54px",style:{top:"0",left:"50%",transform:"translate(-50%, -36%)","z-index":"999"}},null,8,["src"]),E,e("div",G,n(s.name),1),e("div",M,[e("span",N,n(o.$t("currency")),1),e("span",A,n(s.money),1)])],4),l(k,null,{default:c(()=>[e("div",H,[l(w,{disable:s.symbol<=t.userInfo.levelInfo.symbol,onClick:a=>{t.currentLevel=s,t.buyDialogRef?.openFunc()},"no-caps":"",outline:"",rounded:"",color:"primary",class:"full-width",label:s.symbol<=t.userInfo.levelInfo.symbol?o.$t("purchased"):o.$t("buy")},null,8,["disable","onClick","label"])]),e("div",{innerHTML:s.Desc,class:"q-mt-lg"},null,8,T)]),_:2},1024)]),_:2},1032,["style"]))),128))])]),_:1})]),l(t.GlobalDialog,{ref:"buyDialogRef",title:o.$t("userLevel"),message:`${o.$t("isBuy")}【 ${t.currentLevel.name} 】?`,"on-confirm-callback":t.createLevelFunc},null,8,["title","message","on-confirm-callback"])])}const ee=v(Q,[["render",U],["__file","level.vue"]]);export{ee as default};

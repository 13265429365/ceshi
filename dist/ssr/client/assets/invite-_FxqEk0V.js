import{Q as _}from"./QImg-D2kCY975.js";import{n as g,z as h,E as v,aJ as x,A as y,_ as b,s as f,t as I,B as t,y as m,D as o,N as S}from"./index-BAN5Iapo.js";import{i as k}from"./invite-DaF4qGsa.js";import"./team-3xhWLgIo.js";import"./copy-to-clipboard-zTNTpKz4.js";import"./index.min-DAI2r0rk.js";const w=g({name:"InviteIndex",__name:"invite",emits:["update"],setup(i,{expose:n,emit:s}){n();const e=h(),{inviteUrl:r,inviteImage:a,userInviteFunc:c,copyToClipboardFunc:u}=k();v(()=>{c()});const l=x(),d=s;d("update",{title:l.t("userInvite"),right:{callback:()=>{},icon:""}});const p={$initStore:e,inviteUrl:r,inviteImage:a,userInviteFunc:c,copyToClipboardFunc:u,$i18n:l,emit:d,get imageSrc(){return y}};return Object.defineProperty(p,"__isScriptSetup",{enumerable:!1,value:!0}),p}}),C={class:"column bg-secondary",style:{height:"calc(100vh - 52px)"}},F={class:"col column"},B={class:"rounded-borders bg-white column items-center q-py-md",style:{width:"90%",margin:"36px auto"}},$={class:"text-color-3 text-h6 q-mt-md"},q=["src"],N={class:"text-grey-7 text-weight-medium",style:{margin:"20px 0 10px 0"}},Q={class:"text-weight-regular text-black ellipsis q-pa-sm text-body1",style:{"background-color":"#F4F5F8",width:"238px","border-radius":"10px"}};function D(i,n,s,e,r,a){return f(),I("div",C,[t("div",F,[t("div",B,[m(_,{"no-spinner":"",src:e.imageSrc(e.$initStore.config.logo),class:"q-mt-lg",width:"60px",height:"60px"},null,8,["src"]),t("div",$,o(i.$t("userInvite")),1),t("img",{src:e.inviteImage,alt:""},null,8,q),t("div",N,o(i.$t("copy")),1),t("div",Q,o(e.inviteUrl),1),m(S,{unelevated:"",rounded:"",style:{margin:"30px 0 20px 0",width:"230px",height:"40px"},color:"primary",label:i.$t("copy"),"no-caps":"",onClick:e.copyToClipboardFunc},null,8,["label","onClick"])])])])}const A=b(w,[["render",D],["__file","invite.vue"]]);export{A as default};

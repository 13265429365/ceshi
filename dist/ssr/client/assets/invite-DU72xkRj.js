import{Q as m}from"./QImg-D2kCY975.js";import{n as p,z as u,E as v,_ as x,s as f,t as h,B as e,y as s,D as _,v as r,W as y,O as g,U as C,H as b}from"./index-BAN5Iapo.js";import{i as I}from"./invite-DaF4qGsa.js";import"./team-3xhWLgIo.js";import"./copy-to-clipboard-zTNTpKz4.js";import"./index.min-DAI2r0rk.js";const S=p({name:"InviteIndex",__name:"invite",setup(a,{expose:o}){o();const d=u(),{inviteUrl:t,inviteImage:l,userInviteFunc:i,copyToClipboardFunc:n}=I();v(()=>{i()});const c={$initStore:d,inviteUrl:t,inviteImage:l,userInviteFunc:i,copyToClipboardFunc:n};return Object.defineProperty(c,"__isScriptSetup",{enumerable:!1,value:!0}),c}}),w={style:{padding:"80px 0 260px"}},Q={class:"row justify-center items-center"},U={class:"col text-right"},V=e("div",{class:"col-1"},null,-1),k={class:"col"},q={style:{width:"310px"},class:"text-center"},B={class:"text-h3 text-bold"},F={class:"text-h6 text-grey q-mt-sm"},j={class:"column items-center q-mt-xl"},z=["src"],D={class:"q-mt-md",style:{width:"310px"}};function E(a,o,d,t,l,i){return f(),h("div",w,[e("div",Q,[e("div",U,[s(m,{"no-spinner":"",class:"q-mr-xl",width:"300px",src:"/src/assets/default/download-bg.svg"})]),V,e("div",k,[e("div",q,[e("div",B,_(t.$initStore.config.name),1),e("div",F,_(a.$t("inviteFriendsSmall")),1),e("div",j,[s(y,{bordered:"",flat:"",style:{"border-radius":"10px",width:"210px"}},{default:r(()=>[s(C,null,{default:r(()=>[e("img",{src:t.inviteImage,alt:""},null,8,z)]),_:1})]),_:1}),e("div",D,[s(g,{outlined:"",dense:"",modelValue:t.inviteUrl,"onUpdate:modelValue":o[0]||(o[0]=n=>t.inviteUrl=n),readonly:""},{append:r(()=>[s(b,{name:"content_copy",class:"cursor-pointer",size:"xs",onClick:t.copyToClipboardFunc},null,8,["onClick"])]),_:1},8,["modelValue"])])])])])])])}const P=x(S,[["render",E],["__file","invite.vue"]]);export{P as default};

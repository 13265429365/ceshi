import{u as x,Q as S}from"./uploader-Dpe-D8u9.js";import{Q as u}from"./QImg-QNFGeKBr.js";import{Q as U}from"./QBadge-qHtEjqMz.js";import{n as C,I as k,z as D,J as L,w as B,E as N,aJ as Y,A as z,_ as M,s as j,t as A,B as l,y as t,v as n,D as r,O as d,N as F,Q as O,H as E,G as I,X as J,Y as R}from"./index-BkcOOe94.js";import{Q as T,a as G}from"./QPopupProxy-C5pPrXFv.js";import{Q as y}from"./QSelect-DmBxFfGu.js";import{Q as V}from"./QItemSection-Dqa7iTHf.js";import{Q as H}from"./QItemLabel-DU8CjsTA.js";import{Q as X}from"./QItem-CH6F1sXM.js";import{u as K}from"./info-Dx04KJx9.js";import{d as W}from"./date-hLWyfEDb.js";import"./format-DyQxkAtJ.js";import"./QMenu-DLKEG6T_.js";import"./selection-DMuMQtZs.js";import"./QChip-BCI60SaI.js";import"./info-BTh3Os19.js";const Z=C({name:"UserSetting",__name:"info",emits:["update"],setup(s,{expose:a,emit:f}){a();const o=k(),i=D(),c=L(),{userInfoParams:e,currentCountry:m,genderList:P,updateUserInfoFunc:v}=K();B(o.userInfo,p=>{e.value=p}),N(()=>{h()});const h=()=>{if(e.value=o.userInfo,e.value.birthday=W.formatDate(e.value.birthday,"YYYY/MM/DD"),e.value.telephone=="")m.value=i.countryList[0];else if(e.value.telephone.indexOf("|")>-1){const p=e.value.telephone.split("|")[0],q=i.countryList.findIndex(w=>w.code==p);m.value=i.countryList[q],e.value.telephone=e.value.telephone.split("|")[1]}},Q=()=>{e.value.telephone!=""&&(e.value.telephone=m.value.code+"|"+e.value.telephone),v(c.back())},b=Y(),_=f;_("update",{title:b.t("userSettings"),right:{callback:()=>{},icon:""}});const g={$userStore:o,$initStore:i,$router:c,userInfoParams:e,currentCountry:m,genderList:P,updateUserInfoFunc:v,initData:h,submitUpdateUserInfoFunc:Q,$i18n:b,emit:_,uploader:x,get imageSrc(){return z}};return Object.defineProperty(g,"__isScriptSetup",{enumerable:!1,value:!0}),g}}),$={class:"row justify-center q-py-lg"},ee={class:"relative-position"},oe={class:"q-mt-lg q-px-lg"},te={class:"q-mb-md"},ae={class:"text-weight-bold q-mb-sm"},le={class:"q-mb-md"},se={class:"text-weight-bold q-mb-sm"},ne={class:"q-mb-md"},re={class:"text-weight-bold q-mb-sm"},ie={class:"q-mb-md"},de={class:"text-weight-bold q-mb-sm"},me={class:"q-mb-md"},ue={class:"text-weight-bold q-mb-sm"},ce={class:"row q-col-gutter-sm"},pe={class:"row no-wrap items-center"},fe={class:"q-mb-md"},ve={class:"text-weight-bold q-mb-sm"};function he(s,a,f,o,i,c){return j(),A("div",null,[l("div",$,[l("div",ee,[t(o.uploader,{onUploaded:a[0]||(a[0]=e=>{o.userInfoParams.avatar=e})},{default:n(()=>[t(S),t(O,{size:"80px"},{default:n(()=>[t(u,{"no-spinner":"",src:o.imageSrc(o.userInfoParams.avatar??"")},null,8,["src"]),t(U,{floating:"",class:"bg-transparent",style:{top:"70%"}},{default:n(()=>[t(u,{"no-spinner":"",src:"/src/assets/default/edit.png",width:"28px",height:"28px"})]),_:1})]),_:1})]),_:1})])]),l("div",oe,[l("div",te,[l("div",ae,r(s.$t("nickname")),1),t(d,{placeholder:s.$t("nickname"),outlined:"",modelValue:o.userInfoParams.nickName,"onUpdate:modelValue":a[1]||(a[1]=e=>o.userInfoParams.nickName=e)},null,8,["placeholder","modelValue"])]),l("div",le,[l("div",se,r(s.$t("email")),1),t(d,{placeholder:s.$t("email"),outlined:"",modelValue:o.userInfoParams.email,"onUpdate:modelValue":a[2]||(a[2]=e=>o.userInfoParams.email=e)},null,8,["placeholder","modelValue"])]),l("div",ne,[l("div",re,r(s.$t("birthday")),1),t(d,{placeholder:s.$t("birthday"),outlined:"",modelValue:o.userInfoParams.birthday,"onUpdate:modelValue":a[4]||(a[4]=e=>o.userInfoParams.birthday=e),mask:"date"},{append:n(()=>[t(E,{name:"event",class:"cursor-pointer"},{default:n(()=>[t(T,null,{default:n(()=>[t(G,{modelValue:o.userInfoParams.birthday,"onUpdate:modelValue":a[3]||(a[3]=e=>o.userInfoParams.birthday=e)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["placeholder","modelValue"])]),l("div",ie,[l("div",de,r(s.$t("sex")),1),t(y,{outlined:"",modelValue:o.userInfoParams.sex,"onUpdate:modelValue":a[5]||(a[5]=e=>o.userInfoParams.sex=e),"map-options":"",options:o.genderList,"option-value":"value","option-label":"name","emit-value":"","dropdown-icon":"expand_more"},null,8,["modelValue","options"])]),l("div",me,[l("div",ue,r(s.$t("telephone")),1),l("div",ce,[t(y,{outlined:"",modelValue:o.currentCountry,"onUpdate:modelValue":a[6]||(a[6]=e=>o.currentCountry=e),options:o.$initStore.countryList,class:"col-4"},{selected:n(()=>[l("div",pe,[t(u,{width:"20px",height:"15px",src:o.imageSrc(o.currentCountry.icon),"no-spinner":"",alt:"",class:"q-mr-xs"},null,8,["src"]),I(" +"+r(o.currentCountry.code),1)])]),option:n(e=>[t(X,J(R(e.itemProps)),{default:n(()=>[t(V,{avatar:""},{default:n(()=>[t(u,{src:o.imageSrc(e.opt.icon),"no-spinner":"",alt:""},null,8,["src"])]),_:2},1024),t(V,null,{default:n(()=>[t(H,null,{default:n(()=>[I(r(e.opt.name),1)]),_:2},1024)]),_:2},1024)]),_:2},1040)]),_:1},8,["modelValue","options"]),t(d,{class:"col-8",placeholder:s.$t("telephone"),outlined:"",modelValue:o.userInfoParams.telephone,"onUpdate:modelValue":a[7]||(a[7]=e=>o.userInfoParams.telephone=e),modelModifiers:{number:!0}},null,8,["placeholder","modelValue"])])]),l("div",fe,[l("div",ve,r(s.$t("desc")),1),t(d,{type:"textarea",placeholder:s.$t("desc"),outlined:"",modelValue:o.userInfoParams.desc,"onUpdate:modelValue":a[8]||(a[8]=e=>o.userInfoParams.desc=e)},null,8,["placeholder","modelValue"])]),t(F,{onClick:o.submitUpdateUserInfoFunc,size:"lg",class:"full-width q-mb-xl row justify-center",unelevated:"",rounded:"","no-caps":"",color:"primary",label:s.$t("submit")},null,8,["label"])])])}const Le=M(Z,[["render",he],["__file","info.vue"]]);export{Le as default};
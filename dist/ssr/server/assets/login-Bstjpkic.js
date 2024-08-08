import{defineComponent as O,onMounted as D,resolveComponent as h,withCtx as t,createVNode as n,toDisplayString as P,openBlock as b,createBlock as v,createCommentVNode as q,useSSRContext as M}from"vue";import{u as E}from"./index-DQe6s3Qe.js";import{s as G}from"./switchLanguage-C8GuaNd4.js";import{o as H}from"./online-DIbgyiUJ.js";import{i as J,u as K,a as Q,_ as W}from"../server-entry.js";import{ssrRenderAttrs as X,ssrRenderComponent as i,ssrInterpolate as k,ssrRenderStyle as Y,ssrRenderAttr as Z}from"vue/server-renderer";import"vue-router";import"vue-i18n/dist/vue-i18n.runtime.node.mjs";import"quasar";import"pinia";import"axios";import"quasar/wrappers";const _=O({name:"UserLogin",__name:"login",setup(s,{expose:a}){a();const p=J(),R=K(),{loginParams:z,showTextPassword:e,baseURL:F,onlineInfo:j,refreshCaptchaFunc:L,userLoginFunc:C,onlineInfoFunc:u}=E();D(()=>{L(),u()});const f={$initStore:p,$userStore:R,loginParams:z,showTextPassword:e,baseURL:F,onlineInfo:j,refreshCaptchaFunc:L,userLoginFunc:C,onlineInfoFunc:u,switchLanguage:G,onlineComponents:H,get imageSrc(){return Q}};return Object.defineProperty(f,"__isScriptSetup",{enumerable:!1,value:!0}),f}});function $(s,a,p,R,z,e,F,j){const L=h("q-header"),C=h("q-toolbar"),u=h("q-space"),f=h("q-btn"),l=h("q-img"),I=h("q-form"),x=h("q-input"),U=h("q-icon");a(`<div${X(R)}>`),a(i(L,{class:"bg-white"},{default:t((N,c,S,g)=>{if(c)c(i(C,null,{default:t((o,r,d,m)=>{if(r)r(i(u,null,null,d,m)),e.$initStore.setting.login.showLang?r(i(f,{class:"text-grey-8",rounded:"","no-caps":"",flat:""},{default:t((y,V,A,T)=>{if(V)V(i(l,{"no-spinner":"",width:"24px",height:"24px",class:"q-mr-sm",src:e.imageSrc(e.$initStore.langList.find(w=>w.symbol==e.$userStore.userLang).icon)},null,A,T)),V(`<div${T}>${k(e.$initStore.langList.find(w=>w.symbol==e.$userStore.userLang).name)}</div>`),V(i(e.switchLanguage,null,null,A,T));else return[n(l,{"no-spinner":"",width:"24px",height:"24px",class:"q-mr-sm",src:e.imageSrc(e.$initStore.langList.find(w=>w.symbol==e.$userStore.userLang).icon)},null,8,["src"]),n("div",null,P(e.$initStore.langList.find(w=>w.symbol==e.$userStore.userLang).name),1),n(e.switchLanguage)]}),_:1},d,m)):r("<!---->");else return[n(u),e.$initStore.setting.login.showLang?(b(),v(f,{key:0,class:"text-grey-8",rounded:"","no-caps":"",flat:""},{default:t(()=>[n(l,{"no-spinner":"",width:"24px",height:"24px",class:"q-mr-sm",src:e.imageSrc(e.$initStore.langList.find(y=>y.symbol==e.$userStore.userLang).icon)},null,8,["src"]),n("div",null,P(e.$initStore.langList.find(y=>y.symbol==e.$userStore.userLang).name),1),n(e.switchLanguage)]),_:1})):q("",!0)]}),_:1},S,g));else return[n(C,null,{default:t(()=>[n(u),e.$initStore.setting.login.showLang?(b(),v(f,{key:0,class:"text-grey-8",rounded:"","no-caps":"",flat:""},{default:t(()=>[n(l,{"no-spinner":"",width:"24px",height:"24px",class:"q-mr-sm",src:e.imageSrc(e.$initStore.langList.find(o=>o.symbol==e.$userStore.userLang).icon)},null,8,["src"]),n("div",null,P(e.$initStore.langList.find(o=>o.symbol==e.$userStore.userLang).name),1),n(e.switchLanguage)]),_:1})):q("",!0)]),_:1})]}),_:1},p)),a('<div><div class="row justify-center">'),a(i(l,{"no-spinner":"",class:"q-mt-lg q-mb-md",width:"70px",height:"70px",src:e.imageSrc(e.$initStore.config.logo)},null,p)),a(`</div><div class="row justify-center q-mx-md"><div class="text-weight-bold text-h6 text-center">${k(s.$t("loginSmall"))}</div></div><div style="${Y({"margin-top":"80px"})}"></div>`),a(i(I,{class:"q-mt-lg q-px-lg"},{default:t((N,c,S,g)=>{if(c)c(i(x,{class:"q-mb-md",outlined:"",modelValue:e.loginParams.username,"onUpdate:modelValue":o=>e.loginParams.username=o,"input-style":{fontSize:"16px",color:"#999999!important"},placeholder:s.$t("username")},{prepend:t((o,r,d,m)=>{if(r)r(i(l,{"no-spinner":"",width:"24px",height:"24px",src:"/src/assets/default/icons/username.png"},null,d,m));else return[n(l,{"no-spinner":"",width:"24px",height:"24px",src:"/src/assets/default/icons/username.png"})]}),_:1},S,g)),c(i(x,{class:"q-mb-md",modelValue:e.loginParams.password,"onUpdate:modelValue":o=>e.loginParams.password=o,outlined:"","input-style":{fontSize:"16px",color:"#999999!important"},type:e.showTextPassword.password?"text":"password",placeholder:s.$t("password")},{prepend:t((o,r,d,m)=>{if(r)r(i(l,{"no-spinner":"",width:"24px",height:"24px",src:"/src/assets/default/icons/password.png"},null,d,m));else return[n(l,{"no-spinner":"",width:"24px",height:"24px",src:"/src/assets/default/icons/password.png"})]}),append:t((o,r,d,m)=>{if(r)r(i(U,{style:{color:"#999999"},name:e.showTextPassword.password?"visibility":"visibility_off",class:"cursor-pointer",onClick:y=>e.showTextPassword.password=!e.showTextPassword.password},null,d,m));else return[n(U,{style:{color:"#999999"},name:e.showTextPassword.password?"visibility":"visibility_off",class:"cursor-pointer",onClick:y=>e.showTextPassword.password=!e.showTextPassword.password},null,8,["name","onClick"])]}),_:1},S,g)),e.$initStore.setting.login.showVerify?c(i(x,{"input-style":{fontSize:"16px",color:"#999999!important"},class:"q-mb-sm",outlined:"",modelValue:e.loginParams.captchaVal,"onUpdate:modelValue":o=>e.loginParams.captchaVal=o,placeholder:s.$t("code")},{prepend:t((o,r,d,m)=>{if(r)r(i(l,{"no-spinner":"",width:"24px",height:"24px",src:"/src/assets/default/icons/code.png"},null,d,m));else return[n(l,{"no-spinner":"",width:"24px",height:"24px",src:"/src/assets/default/icons/code.png"})]}),append:t((o,r,d,m)=>{if(r)e.loginParams.captchaId!==""?r(i(l,{"no-spinner":"",src:e.baseURL+"/captcha/"+e.loginParams.captchaId+"/150-50",width:"150px",height:"50px",onClick:e.refreshCaptchaFunc},null,d,m)):r("<!---->");else return[e.loginParams.captchaId!==""?(b(),v(l,{key:0,"no-spinner":"",src:e.baseURL+"/captcha/"+e.loginParams.captchaId+"/150-50",width:"150px",height:"50px",onClick:e.refreshCaptchaFunc},null,8,["src","onClick"])):q("",!0)]}),_:1},S,g)):c("<!---->"),c(`<div class="text-right q-mb-lg"${g}><a${Z("href",e.onlineInfo.link)} class="text-grey-7 cursor-pointer"${g}>${k(s.$t("forgotPassword"))}</a></div>`),c(i(f,{onClick:o=>e.userLoginFunc(),class:"full-width q-mb-lg",unelevated:"",rounded:"","no-caps":"",size:"lg",color:"primary",label:s.$t("login")},null,S,g)),e.$initStore.setting.login.showRegister?c(`<div class="text-center text-primary q-mb-xl cursor-pointer"${g}><span${g}>${k(s.$t("toRegister"))}</span></div>`):c("<!---->");else return[n(x,{class:"q-mb-md",outlined:"",modelValue:e.loginParams.username,"onUpdate:modelValue":o=>e.loginParams.username=o,"input-style":{fontSize:"16px",color:"#999999!important"},placeholder:s.$t("username")},{prepend:t(()=>[n(l,{"no-spinner":"",width:"24px",height:"24px",src:"/src/assets/default/icons/username.png"})]),_:1},8,["modelValue","onUpdate:modelValue","placeholder"]),n(x,{class:"q-mb-md",modelValue:e.loginParams.password,"onUpdate:modelValue":o=>e.loginParams.password=o,outlined:"","input-style":{fontSize:"16px",color:"#999999!important"},type:e.showTextPassword.password?"text":"password",placeholder:s.$t("password")},{prepend:t(()=>[n(l,{"no-spinner":"",width:"24px",height:"24px",src:"/src/assets/default/icons/password.png"})]),append:t(()=>[n(U,{style:{color:"#999999"},name:e.showTextPassword.password?"visibility":"visibility_off",class:"cursor-pointer",onClick:o=>e.showTextPassword.password=!e.showTextPassword.password},null,8,["name","onClick"])]),_:1},8,["modelValue","onUpdate:modelValue","type","placeholder"]),e.$initStore.setting.login.showVerify?(b(),v(x,{key:0,"input-style":{fontSize:"16px",color:"#999999!important"},class:"q-mb-sm",outlined:"",modelValue:e.loginParams.captchaVal,"onUpdate:modelValue":o=>e.loginParams.captchaVal=o,placeholder:s.$t("code")},{prepend:t(()=>[n(l,{"no-spinner":"",width:"24px",height:"24px",src:"/src/assets/default/icons/code.png"})]),append:t(()=>[e.loginParams.captchaId!==""?(b(),v(l,{key:0,"no-spinner":"",src:e.baseURL+"/captcha/"+e.loginParams.captchaId+"/150-50",width:"150px",height:"50px",onClick:e.refreshCaptchaFunc},null,8,["src","onClick"])):q("",!0)]),_:1},8,["modelValue","onUpdate:modelValue","placeholder"])):q("",!0),n("div",{class:"text-right q-mb-lg"},[n("a",{href:e.onlineInfo.link,class:"text-grey-7 cursor-pointer"},P(s.$t("forgotPassword")),9,["href"])]),n(f,{onClick:o=>e.userLoginFunc(),class:"full-width q-mb-lg",unelevated:"",rounded:"","no-caps":"",size:"lg",color:"primary",label:s.$t("login")},null,8,["onClick","label"]),e.$initStore.setting.login.showRegister?(b(),v("div",{key:1,class:"text-center text-primary q-mb-xl cursor-pointer"},[n("span",{onClick:o=>s.$router.push({name:"Register"})},P(s.$t("toRegister")),9,["onClick"])])):q("",!0)]}),_:1},p)),e.$initStore.setting.home.showOnline?a(i(e.onlineComponents,null,null,p)):a("<!---->"),a("</div></div>")}const B=_.setup;_.setup=(s,a)=>{const p=M();return(p.modules||(p.modules=new Set)).add("src/pages/default/mobile/login.vue"),B?B(s,a):void 0};const ge=W(_,[["ssrRender",$],["__file","login.vue"]]);export{ge as default};

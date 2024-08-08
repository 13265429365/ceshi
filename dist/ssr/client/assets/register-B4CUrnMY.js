import{Q as a}from"./QImg-D2kCY975.js";import{Q as x}from"./QItemSection-aoTsTvB4.js";import{Q as b}from"./QItemLabel-DLppKcAi.js";import{Q as C}from"./QItem-Dc39kTTK.js";import{Q as k}from"./QSelect-5yNjMZ1F.js";import{n as T,z as Q,E as q,A as K,_ as U,s as n,u as d,v as o,W as z,y as s,B as c,D as p,t as I,G as P,X as L,Y as R,O as l,x as m,H as u,N as F,U as B}from"./index-BAN5Iapo.js";import{Q as D}from"./QForm-zTtjdAwz.js";import{u as N}from"./index-CvQOyMs9.js";import"./QChip-DjQSvlt9.js";import"./QMenu-DtDaNURZ.js";import"./selection-D7ga6MDQ.js";import"./format-DyQxkAtJ.js";const _=T({name:"UserRegister",__name:"register",emits:["switchDialogFunc","switchDialogRegister"],setup(i,{expose:r,emit:y}){r();const e=Q(),g=y,{baseURL:w,currentCountry:t,showTextPassword:S,registerParams:V,userRegisterFunc:v,refreshCaptchaFunc:f}=N();q(()=>{f(),t.value=e.countryList[0]});const h={$initStore:e,emit:g,baseURL:w,currentCountry:t,showTextPassword:S,registerParams:V,userRegisterFunc:v,refreshCaptchaFunc:f,toLogin:()=>{g("switchDialogFunc")},get imageSrc(){return K}};return Object.defineProperty(h,"__isScriptSetup",{enumerable:!1,value:!0}),h}}),E={class:"text-center text-weight-bold text-primary text-h4"},O={class:"text-center text-body1 text-weight-regular q-mt-sm text-grey"},j={key:0,class:"row q-col-gutter-sm"},A={class:"row no-wrap items-center"};function G(i,r,y,e,g,w){return n(),d(z,{style:{width:"410px"}},{default:o(()=>[s(B,{class:"q-pa-lg"},{default:o(()=>[c("div",E,p(i.$t("register")),1),c("div",O,p(i.$t("registerSmall")),1),s(D,{class:"q-mt-xl q-gutter-y-sm"},{default:o(()=>[e.$initStore.setting.register.showTelephone?(n(),I("div",j,[s(k,{outlined:"",modelValue:e.currentCountry,"onUpdate:modelValue":r[0]||(r[0]=t=>e.currentCountry=t),options:e.$initStore.countryList,class:"col-4"},{selected:o(()=>[c("div",A,[s(a,{width:"20px",height:"15px",src:e.imageSrc(e.currentCountry.icon),"no-spinner":"",alt:"",class:"q-mr-xs"},null,8,["src"]),P(" +"+p(e.currentCountry.code),1)])]),option:o(t=>[s(C,L(R(t.itemProps)),{default:o(()=>[s(x,{avatar:""},{default:o(()=>[s(a,{src:e.imageSrc(t.opt.icon),"no-spinner":"",alt:""},null,8,["src"])]),_:2},1024),s(x,null,{default:o(()=>[s(b,null,{default:o(()=>[P(p(t.opt.name),1)]),_:2},1024)]),_:2},1024)]),_:2},1040)]),_:1},8,["modelValue","options"]),s(l,{class:"col-8","input-style":{fontSize:"16px",color:"#999999!important"},outlined:"",type:"number",modelValue:e.registerParams.telephone,"onUpdate:modelValue":r[1]||(r[1]=t=>e.registerParams.telephone=t),placeholder:i.$t("telephone")},null,8,["modelValue","placeholder"])])):m("",!0),e.$initStore.setting.register.showEmail?(n(),d(l,{key:1,"input-style":{fontSize:"16px",color:"#999999!important"},outlined:"",class:"q-mb-md",modelValue:e.registerParams.email,"onUpdate:modelValue":r[2]||(r[2]=t=>e.registerParams.email=t),placeholder:i.$t("email")},{prepend:o(()=>[s(a,{"no-spinner":"",width:"24px",height:"24px",src:"/src/assets/default/icons/email.png"})]),_:1},8,["modelValue","placeholder"])):m("",!0),s(l,{outlined:"",class:"q-mb-md","input-style":{fontSize:"16px",color:"#999999!important"},modelValue:e.registerParams.username,"onUpdate:modelValue":r[3]||(r[3]=t=>e.registerParams.username=t),placeholder:i.$t("username")},{prepend:o(()=>[s(a,{"no-spinner":"",width:"24px",height:"24px",src:"/src/assets/default/icons/username.png"})]),_:1},8,["modelValue","placeholder"]),s(l,{class:"q-mb-md","input-style":{fontSize:"16px",color:"#999999!important"},modelValue:e.registerParams.password,"onUpdate:modelValue":r[5]||(r[5]=t=>e.registerParams.password=t),outlined:"",type:e.showTextPassword.password?"text":"password",placeholder:i.$t("password")},{prepend:o(()=>[s(a,{"no-spinner":"",width:"24px",height:"24px",src:"/src/assets/default/icons/password.png"})]),append:o(()=>[s(u,{class:"text-grey-7 cursor-pointer",name:e.showTextPassword.password?"visibility":"visibility_off",onClick:r[4]||(r[4]=t=>e.showTextPassword.password=!e.showTextPassword.password)},null,8,["name"])]),_:1},8,["modelValue","type","placeholder"]),e.$initStore.setting.register.showCmfPass?(n(),d(l,{key:2,"input-style":{fontSize:"16px",color:"#999999!important"},class:"q-mb-md",modelValue:e.registerParams.cmfPassword,"onUpdate:modelValue":r[7]||(r[7]=t=>e.registerParams.cmfPassword=t),outlined:"",type:e.showTextPassword.cmfPassword?"text":"password",placeholder:i.$t("cmfPassword")},{prepend:o(()=>[s(a,{"no-spinner":"",width:"24px",height:"24px",src:"/src/assets/default/icons/password.png"})]),append:o(()=>[s(u,{class:"text-grey-7 cursor-pointer",name:e.showTextPassword.cmfPassword?"visibility":"visibility_off",onClick:r[6]||(r[6]=t=>e.showTextPassword.cmfPassword=!e.showTextPassword.cmfPassword)},null,8,["name"])]),_:1},8,["modelValue","type","placeholder"])):m("",!0),e.$initStore.setting.register.showSecurityKey?(n(),d(l,{key:3,"input-style":{fontSize:"16px",color:"#999999!important"},class:"q-mb-md",outlined:"",modelValue:e.registerParams.securityKey,"onUpdate:modelValue":r[9]||(r[9]=t=>e.registerParams.securityKey=t),type:e.showTextPassword.securityKey?"text":"password",placeholder:i.$t("enterSecretKey")},{prepend:o(()=>[s(a,{"no-spinner":"",width:"24px",height:"24px",src:"/src/assets/default/icons/key.png"})]),append:o(()=>[s(u,{class:"text-grey-7 cursor-pointer",name:e.showTextPassword.securityKey?"visibility":"visibility_off",onClick:r[8]||(r[8]=t=>e.showTextPassword.securityKey=!e.showTextPassword.securityKey)},null,8,["name"])]),_:1},8,["modelValue","type","placeholder"])):m("",!0),e.$initStore.setting.register.showCmfSecurityKey?(n(),d(l,{key:4,"input-style":{fontSize:"16px",color:"#999999!important"},class:"q-mb-md",outlined:"",modelValue:e.registerParams.cmfSecurityKey,"onUpdate:modelValue":r[11]||(r[11]=t=>e.registerParams.cmfSecurityKey=t),type:e.showTextPassword.cmfSecurityKey?"text":"password",placeholder:i.$t("cmfSecretKey")},{prepend:o(()=>[s(a,{"no-spinner":"",width:"24px",height:"24px",src:"/src/assets/default/icons/key.png"})]),append:o(()=>[s(u,{class:"text-grey-7 cursor-pointer",name:e.showTextPassword.cmfSecurityKey?"visibility":"visibility_off",onClick:r[10]||(r[10]=t=>e.showTextPassword.cmfSecurityKey=!e.showTextPassword.cmfSecurityKey)},null,8,["name"])]),_:1},8,["modelValue","type","placeholder"])):m("",!0),e.$initStore.setting.register.showInvite?(n(),d(l,{key:5,"input-style":{fontSize:"16px",color:"#999999!important"},class:"q-mb-md",outlined:"",modelValue:e.registerParams.code,"onUpdate:modelValue":r[12]||(r[12]=t=>e.registerParams.code=t),placeholder:i.$t("inviteCode")},{prepend:o(()=>[s(a,{"no-spinner":"",width:"24px",height:"24px",src:"/src/assets/default/icons/profile.png"})]),_:1},8,["modelValue","placeholder"])):m("",!0),e.$initStore.setting.register.showVerify?(n(),d(l,{key:6,"input-style":{fontSize:"16px",color:"#999999!important"},class:"q-mb-md",outlined:"",modelValue:e.registerParams.captchaVal,"onUpdate:modelValue":r[13]||(r[13]=t=>e.registerParams.captchaVal=t),placeholder:i.$t("code")},{prepend:o(()=>[s(a,{"no-spinner":"",width:"24px",height:"24px",src:"/src/assets/default/icons/code.png"})]),append:o(()=>[e.registerParams.captchaId!==""?(n(),d(a,{key:0,"no-spinner":"",src:e.baseURL+"/captcha/"+e.registerParams.captchaId+"/150-50",width:"150px",height:"50px",onClick:e.refreshCaptchaFunc},null,8,["src","onClick"])):m("",!0)]),_:1},8,["modelValue","placeholder"])):m("",!0),s(F,{onClick:r[14]||(r[14]=t=>{e.userRegisterFunc(),e.emit("switchDialogRegister")}),class:"full-width q-mt-xl",unelevated:"",rounded:"","no-caps":"",style:{height:"44px"},color:"primary",label:i.$t("register")},null,8,["label"]),c("div",{onClick:r[15]||(r[15]=t=>e.toLogin()),class:"text-center q-pb-sm text-primary cursor-pointer"},p(i.$t("toLogin")),1)]),_:1})]),_:1})]),_:1})}const ie=U(_,[["render",G],["__file","register.vue"]]);export{ie as default};
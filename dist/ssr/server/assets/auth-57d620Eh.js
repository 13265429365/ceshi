import{reactive as c,toRefs as h}from"vue";import{b as r,u as p,N as i}from"../server-entry.js";import{useI18n as f}from"vue-i18n/dist/vue-i18n.runtime.node.mjs";const m=s=>r.post("/auth/users/auth/create",s,{showLoading:!0}),A=()=>r.post("/auth/users/auth/info",{},{showLoading:!0}),w=0,e=10,y=20,U=-1,v=()=>{const s=p(),u=f(),t=c({params:{type:1,photo1:"",photo2:"",photo3:""}}),n=()=>{A().then(o=>{t.params=o})},a=()=>{t.params.type=1,m(t.params).then(()=>{t.params.status=e,i("positive",u.t("success"));const o=s.userInfo;o.authInfo.status=e,s.updateUserInfo(o)})};return{...h(t),userAuthInfoFunc:n,createUserAuthFunc:a}};export{U as f,w as n,e as p,y as s,v as u};

import{reactive as d,toRefs as c}from"vue";import{u as i,N as r}from"../server-entry.js";import{u as n,a as I,b as P}from"./info-ChQOlZzO.js";import{useI18n as w}from"vue-i18n/dist/vue-i18n.runtime.node.mjs";const u=1,A=2,U=()=>{const a=i(),o=w(),s=d({userInfo:{authInfo:{},levelInfo:{levelInfo:{}}},userInfoParams:{},passwordParams:{type:u},cmfPassword:"",genderList:[{name:o.t("unknown"),value:0},{name:o.t("male"),value:1},{name:o.t("female"),value:2}],dates:"",currentCountry:{}}),f=()=>{n().then(e=>{s.userInfo=e,a.updateUserInfo(e)})},p=e=>{I(s.userInfoParams).then(()=>{n().then(t=>{r("positive",o.t("success")),a.updateUserInfo(t),typeof e=="function"&&e()})})},m=(e,t)=>{if(s.passwordParams.type=e,s.passwordParams.newPassword!=s.cmfPassword)return r("negative",o.t("twoPasswordsAreDifferent")),!1;P(s.passwordParams).then(()=>{s.passwordParams={type:u},s.cmfPassword="",r("positive",o.t("success")),typeof t=="function"&&t()})};return{...c(s),userInfoFunc:f,updateUserInfoFunc:p,updatePasswordFunc:m}};export{u as p,A as s,U as u};

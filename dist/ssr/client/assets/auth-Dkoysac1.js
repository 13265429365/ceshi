import{aF as a,I as c,aJ as h,k as p,b1 as i,b2 as f}from"./index-BkcOOe94.js";const A=t=>a.post("/auth/users/auth/create",t,{showLoading:!0}),I=()=>a.post("/auth/users/auth/info",{},{showLoading:!0}),d=0,e=10,g=20,w=-1,y=()=>{const t=c(),n=h(),s=p({params:{type:1,photo1:"",photo2:"",photo3:""}}),u=()=>{I().then(o=>{s.params=o})},r=()=>{s.params.type=1,A(s.params).then(()=>{s.params.status=e,f("positive",n.t("success"));const o=t.userInfo;o.authInfo.status=e,t.updateUserInfo(o)})};return{...i(s),userAuthInfoFunc:u,createUserAuthFunc:r}};export{w as f,d as n,e as p,g as s,y as u};
import{aF as m,$ as P,J as T,aJ as b,I as L,z as Y,r as i,k as v,b1 as S,b2 as u}from"./index-BGPSJsC7.js";import{w as $}from"./assets-DBqU0KNT.js";import{u as F}from"./info-B9Xb6Fua.js";import{d as f}from"./date-DIhP-R8E.js";const M=e=>m.post("/auth/wallets/transfer/create",e,{showLoading:!0}),z=e=>m.post("/auth/wallets/transfer/index",e,{showLoading:!0}),R=1,q=11,B=()=>{const e=P(),d=T(),a=b(),n=L(),l=Y(),r=new Date,p=new Date(r.getTime()-7*24*60*60*1e3),y=f.formatDate(r,"YYYY/MM/DD"),I=f.formatDate(p,"YYYY/MM/DD"),g=i(null),o=i(null),s=v({params:{createdAt:{from:I,to:y},type:Number(e.query.assetsId)>0?q:R,pagination:{descending:!0,page:1,rowsPerPage:10,sortBy:"createdAt"}},transferParams:{assetsId:0,money:""},assetsList:[],assetsInfo:{id:0,name:"",icon:"",userAssets:{money:0}}}),h=()=>{const t={id:0,name:a.t("balance"),icon:"",userAssets:{money:n.userInfo.money}};s.assetsList.unshift(t),s.assetsInfo=t,$().then(A=>{A.forEach(D=>{s.assetsList.push(D)})})},w=()=>{if(!s.transferParams.money){u("negative",a.t("enterMoney"));return}l.setting.wallets.showTransferSecurityKey?o.value?.openFunc():c()},c=()=>{M(s.transferParams).then(()=>{F().then(t=>{n.updateUserInfo(t)}),u("positive",a.t("success")),d.push({name:"WalletsTransferRecord",query:{assetsId:s.transferParams.assetsId}})})};return{securityDialogRef:o,pagination:g,...S(s),walletsAssetsListFunc:h,submitFunc:w,createTransferFunc:c}};export{q as a,R as b,z as c,B as t};
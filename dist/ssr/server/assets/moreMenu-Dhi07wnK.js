import{defineComponent as I,useSSRContext as j,resolveComponent as _,mergeProps as k,withCtx as s,createVNode as e,toDisplayString as f}from"vue";import{b as y}from"./order-BjFUygQp.js";import{ssrRenderAttrs as P,ssrRenderComponent as i,ssrInterpolate as W}from"vue/server-renderer";import{_ as A}from"../server-entry.js";const $=I({name:"moreMenuIndex",__name:"moreMenu",props:{mode:{default:()=>y},assetsId:{default:()=>0}},setup(t,{expose:r}){r();const o={get balanceDepositMode(){return y}};return Object.defineProperty(o,"__isScriptSetup",{enumerable:!1,value:!0}),o}});function N(t,r,o,S,n,l,O,V){const C=_("q-btn"),g=_("q-item"),a=_("q-item-section"),m=_("q-img");r(`<div${P(k({class:"row justify-between q-gutter-md q-mb-md"},S))}><div class="col">`),r(i(C,{onClick:b=>t.$router.push({name:"WalletsDeposit",query:{mode:n.mode,assetsId:n.assetsId}}),class:"bg-white q-py-sm rounded-borders full-width","no-caps":"",unelevated:""},{default:s((b,p,q,D)=>{if(p)p(i(g,{class:"no-padding"},{default:s((R,u,w,v)=>{if(u)u(i(a,{avatar:""},{default:s((M,d,h,c)=>{if(d)d(i(m,{"no-spinner":"",class:"q-mr-sm",src:"/src/assets/default/deposit.png",width:"42px",height:"42px"},null,h,c));else return[e(m,{"no-spinner":"",class:"q-mr-sm",src:"/src/assets/default/deposit.png",width:"42px",height:"42px"})]}),_:1},w,v)),u(i(a,null,{default:s((M,d,h,c)=>{if(d)d(`<div${c}>${W(n.mode===l.balanceDepositMode?t.$t("deposit"):t.$t("assetsDeposit"))}</div>`);else return[e("div",null,f(n.mode===l.balanceDepositMode?t.$t("deposit"):t.$t("assetsDeposit")),1)]}),_:1},w,v));else return[e(a,{avatar:""},{default:s(()=>[e(m,{"no-spinner":"",class:"q-mr-sm",src:"/src/assets/default/deposit.png",width:"42px",height:"42px"})]),_:1}),e(a,null,{default:s(()=>[e("div",null,f(n.mode===l.balanceDepositMode?t.$t("deposit"):t.$t("assetsDeposit")),1)]),_:1})]}),_:1},q,D));else return[e(g,{class:"no-padding"},{default:s(()=>[e(a,{avatar:""},{default:s(()=>[e(m,{"no-spinner":"",class:"q-mr-sm",src:"/src/assets/default/deposit.png",width:"42px",height:"42px"})]),_:1}),e(a,null,{default:s(()=>[e("div",null,f(n.mode===l.balanceDepositMode?t.$t("deposit"):t.$t("assetsDeposit")),1)]),_:1})]),_:1})]}),_:1},o)),r('</div><div class="col">'),r(i(C,{onClick:b=>t.$router.push({name:"WalletsWithdraw",query:{mode:n.mode,id:n.assetsId}}),class:"bg-white q-py-sm rounded-borders full-width","no-caps":"",unelevated:""},{default:s((b,p,q,D)=>{if(p)p(i(g,{class:"no-padding"},{default:s((R,u,w,v)=>{if(u)u(i(a,{avatar:""},{default:s((M,d,h,c)=>{if(d)d(i(m,{"no-spinner":"",class:"q-mr-sm",src:"/src/assets/default/withdraw.png",width:"42px",height:"42px"},null,h,c));else return[e(m,{"no-spinner":"",class:"q-mr-sm",src:"/src/assets/default/withdraw.png",width:"42px",height:"42px"})]}),_:1},w,v)),u(i(a,null,{default:s((M,d,h,c)=>{if(d)d(`<div${c}>${W(n.mode===l.balanceDepositMode?t.$t("withdraw"):t.$t("assetsWithdraw"))}</div>`);else return[e("div",null,f(n.mode===l.balanceDepositMode?t.$t("withdraw"):t.$t("assetsWithdraw")),1)]}),_:1},w,v));else return[e(a,{avatar:""},{default:s(()=>[e(m,{"no-spinner":"",class:"q-mr-sm",src:"/src/assets/default/withdraw.png",width:"42px",height:"42px"})]),_:1}),e(a,null,{default:s(()=>[e("div",null,f(n.mode===l.balanceDepositMode?t.$t("withdraw"):t.$t("assetsWithdraw")),1)]),_:1})]}),_:1},q,D));else return[e(g,{class:"no-padding"},{default:s(()=>[e(a,{avatar:""},{default:s(()=>[e(m,{"no-spinner":"",class:"q-mr-sm",src:"/src/assets/default/withdraw.png",width:"42px",height:"42px"})]),_:1}),e(a,null,{default:s(()=>[e("div",null,f(n.mode===l.balanceDepositMode?t.$t("withdraw"):t.$t("assetsWithdraw")),1)]),_:1})]),_:1})]}),_:1},o)),r("</div></div>")}const x=$.setup;$.setup=(t,r)=>{const o=j();return(o.modules||(o.modules=new Set)).add("src/components/mobile/moreMenu.vue"),x?x(t,r):void 0};const G=A($,[["ssrRender",N],["__file","moreMenu.vue"]]);export{G as m};

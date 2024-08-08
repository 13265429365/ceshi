import{defineComponent as B,onMounted as O,resolveComponent as m,mergeProps as E,withCtx as r,createVNode as n,toDisplayString as d,openBlock as f,createBlock as y,createCommentVNode as W,useSSRContext as H}from"vue";import{a as J,d as Q,b as T,e as X,c as Y,f as Z}from"./account-CXZNAavx.js";import{G as _}from"./dialog-D4Hcswnk.js";import{i as ee,a as te,_ as ne}from"../server-entry.js";import{useI18n as le}from"vue-i18n/dist/vue-i18n.runtime.node.mjs";import{ssrRenderAttrs as ie,ssrRenderComponent as s,ssrRenderList as oe,ssrInterpolate as w,ssrRenderStyle as P}from"vue/server-renderer";import"vue-router";import"quasar";import"pinia";import"axios";import"quasar/wrappers";const U=B({name:"WalletsAccountIndex",__name:"index",emits:["update"],setup(l,{expose:o,emit:c}){o();const M=ee(),{deleteParams:V,accountList:e,currentAccountInfo:F,securityDialogRef:I,deleteDialogRef:D,mode:g,accountListFunc:k,submitDeleteFunc:S,deleteAccountFunc:C}=J();O(()=>{k()});const b=le(),p=c;p("update",{title:b.t("withdrawAccount"),right:{callback:()=>{},icon:""}});const v={$initStore:M,deleteParams:V,accountList:e,currentAccountInfo:F,securityDialogRef:I,deleteDialogRef:D,mode:g,accountListFunc:k,submitDeleteFunc:S,deleteAccountFunc:C,$i18n:b,emit:p,get balancePaymentMode(){return Q},get assetsPaymentMode(){return T},get balanceWithdrawalAccountMode(){return X},get assetsWithdrawalAccountMode(){return Y},get bgList(){return Z},GlobalDialog:_,get imageSrc(){return te}};return Object.defineProperty(v,"__isScriptSetup",{enumerable:!1,value:!0}),v}});function ae(l,o,c,M,V,e,F,I){const D=m("q-tabs"),g=m("q-tab"),k=m("q-card"),S=m("q-card-section"),C=m("q-avatar"),b=m("q-img"),p=m("q-btn"),v=m("q-icon"),L=m("q-input");o(`<div${ie(E({class:"column full-height full-width"},M))}><div class="col q-pa-md full-width column justify-between">`),o(s(D,{modelValue:e.mode,"onUpdate:modelValue":[t=>e.mode=t,e.accountListFunc],align:"left","narrow-indicator":"",class:"q-mb-lg","active-color":"primary"},{default:r((t,u,h,x)=>{if(u)u(s(g,{name:e.balanceWithdrawalAccountMode,label:l.$t("withdraw")},null,h,x)),u(s(g,{name:e.assetsWithdrawalAccountMode,label:l.$t("assetsWithdraw")},null,h,x));else return[n(g,{name:e.balanceWithdrawalAccountMode,label:l.$t("withdraw")},null,8,["name","label"]),n(g,{name:e.assetsWithdrawalAccountMode,label:l.$t("assetsWithdraw")},null,8,["name","label"])]}),_:1},c)),o('<div class="col full-width"><!--[-->'),oe(e.accountList,(t,u)=>{o(s(k,{flat:"",key:u,style:e.bgList.get(t.paymentInfo.type),class:"q-mb-sm"},{default:r((h,x,A,G)=>{if(x)x(s(S,null,{default:r((N,a,R,i)=>{if(a)a(`<div class="row justify-between"${i}><div class="row"${i}><div${i}>`),a(s(C,null,{default:r((q,$,K,z)=>{if($)$(s(b,{"no-spinner":"",src:e.imageSrc(t.paymentInfo.icon),width:"48px",height:"48px"},null,K,z));else return[n(b,{"no-spinner":"",src:e.imageSrc(t.paymentInfo.icon),width:"48px",height:"48px"},null,8,["src"])]}),_:2},R,i)),a(`</div><div class="q-ml-md text-white"${i}><div class="q-mt-xs"${i}><div class="text-body1 text-bold"${i}><span${i}>${w(t.paymentInfo.name)}</span>`),e.$initStore.setting.wallets.showAccountUpdate?a(s(p,{rounded:"",unelevated:"",size:"xs",class:"q-ml-sm",style:{border:"1px solid #fff",padding:"0 10px"},onClick:q=>l.$router.push({name:"WalletsAccountUpdate",query:{id:t.id,mode:t.paymentInfo.mode}})},{default:r((q,$,K,z)=>{if($)$(`<div style="${P({"font-size":"12px"})}"${z}>${w(l.$t("edit"))}</div>`);else return[n("div",{style:{"font-size":"12px"}},d(l.$t("edit")),1)]}),_:2},R,i)):a("<!---->"),a(`</div><div class="text-caption text-grey-2"${i}>${w(t.paymentInfo.type==e.balanceWithdrawalAccountMode?t.name:l.$t("digitalCurrency"))}</div></div><div class="q-mt-md"${i}><div class="text-caption text-grey-2"${i}>${w(t.paymentInfo.type==e.balanceWithdrawalAccountMode?l.$t("bankNumber"):l.$t("bankAddress"))}</div>`),e.$initStore.setting.wallets.showAccountNumber?a(`<div class="text-body1 text-bold ellipsis" style="${P({"max-width":"200px"})}"${i}>${w(t.number)}</div>`):a(`<div class="text-body1 text-bold"${i}>${w("****"+t.number.slice(-4))}</div>`),a(`</div></div></div><div class="text-right"${i}>`),e.$initStore.setting.wallets.showAccountDelete?a(s(v,{color:"white",class:"cursor-pointer",size:"18px",name:"cancel",onClick:q=>{e.currentAccountInfo=t,e.deleteDialogRef.openFunc()}},null,R,i)):a("<!---->"),a("</div></div>");else return[n("div",{class:"row justify-between"},[n("div",{class:"row"},[n("div",null,[n(C,null,{default:r(()=>[n(b,{"no-spinner":"",src:e.imageSrc(t.paymentInfo.icon),width:"48px",height:"48px"},null,8,["src"])]),_:2},1024)]),n("div",{class:"q-ml-md text-white"},[n("div",{class:"q-mt-xs"},[n("div",{class:"text-body1 text-bold"},[n("span",{textContent:d(t.paymentInfo.name)},null,8,["textContent"]),e.$initStore.setting.wallets.showAccountUpdate?(f(),y(p,{key:0,rounded:"",unelevated:"",size:"xs",class:"q-ml-sm",style:{border:"1px solid #fff",padding:"0 10px"},onClick:q=>l.$router.push({name:"WalletsAccountUpdate",query:{id:t.id,mode:t.paymentInfo.mode}})},{default:r(()=>[n("div",{style:{"font-size":"12px"}},d(l.$t("edit")),1)]),_:2},1032,["onClick"])):W("",!0)]),n("div",{class:"text-caption text-grey-2",textContent:d(t.paymentInfo.type==e.balanceWithdrawalAccountMode?t.name:l.$t("digitalCurrency"))},null,8,["textContent"])]),n("div",{class:"q-mt-md"},[n("div",{class:"text-caption text-grey-2",textContent:d(t.paymentInfo.type==e.balanceWithdrawalAccountMode?l.$t("bankNumber"):l.$t("bankAddress"))},null,8,["textContent"]),e.$initStore.setting.wallets.showAccountNumber?(f(),y("div",{key:0,class:"text-body1 text-bold ellipsis",style:{"max-width":"200px"},textContent:d(t.number)},null,8,["textContent"])):(f(),y("div",{key:1,class:"text-body1 text-bold",textContent:d("****"+t.number.slice(-4))},null,8,["textContent"]))])])]),n("div",{class:"text-right"},[e.$initStore.setting.wallets.showAccountDelete?(f(),y(v,{key:0,color:"white",class:"cursor-pointer",size:"18px",name:"cancel",onClick:q=>{e.currentAccountInfo=t,e.deleteDialogRef.openFunc()}},null,8,["onClick"])):W("",!0)])])]}),_:2},A,G));else return[n(S,null,{default:r(()=>[n("div",{class:"row justify-between"},[n("div",{class:"row"},[n("div",null,[n(C,null,{default:r(()=>[n(b,{"no-spinner":"",src:e.imageSrc(t.paymentInfo.icon),width:"48px",height:"48px"},null,8,["src"])]),_:2},1024)]),n("div",{class:"q-ml-md text-white"},[n("div",{class:"q-mt-xs"},[n("div",{class:"text-body1 text-bold"},[n("span",{textContent:d(t.paymentInfo.name)},null,8,["textContent"]),e.$initStore.setting.wallets.showAccountUpdate?(f(),y(p,{key:0,rounded:"",unelevated:"",size:"xs",class:"q-ml-sm",style:{border:"1px solid #fff",padding:"0 10px"},onClick:N=>l.$router.push({name:"WalletsAccountUpdate",query:{id:t.id,mode:t.paymentInfo.mode}})},{default:r(()=>[n("div",{style:{"font-size":"12px"}},d(l.$t("edit")),1)]),_:2},1032,["onClick"])):W("",!0)]),n("div",{class:"text-caption text-grey-2",textContent:d(t.paymentInfo.type==e.balanceWithdrawalAccountMode?t.name:l.$t("digitalCurrency"))},null,8,["textContent"])]),n("div",{class:"q-mt-md"},[n("div",{class:"text-caption text-grey-2",textContent:d(t.paymentInfo.type==e.balanceWithdrawalAccountMode?l.$t("bankNumber"):l.$t("bankAddress"))},null,8,["textContent"]),e.$initStore.setting.wallets.showAccountNumber?(f(),y("div",{key:0,class:"text-body1 text-bold ellipsis",style:{"max-width":"200px"},textContent:d(t.number)},null,8,["textContent"])):(f(),y("div",{key:1,class:"text-body1 text-bold",textContent:d("****"+t.number.slice(-4))},null,8,["textContent"]))])])]),n("div",{class:"text-right"},[e.$initStore.setting.wallets.showAccountDelete?(f(),y(v,{key:0,color:"white",class:"cursor-pointer",size:"18px",name:"cancel",onClick:N=>{e.currentAccountInfo=t,e.deleteDialogRef.openFunc()}},null,8,["onClick"])):W("",!0)])])]),_:2},1024)]}),_:2},c))}),o(`<!--]--><div style="${P({border:"1px dashed #31cbd2",height:"40px","background-color":"rgba(1, 172, 102, 0.05)"})}" class="rounded-borders column justify-center row q-mt-md"><div class="text-center text-primary text-weight-bold self-center row">`),o(s(v,{size:"20px",name:"add",class:"self-center"},null,c)),o(` ${w(l.$t("create"))}</div></div></div></div>`),o(s(e.GlobalDialog,{ref:"securityDialogRef",title:l.$t("secretKey"),"on-confirm-callback":e.submitDeleteFunc},{default:r((t,u,h,x)=>{if(u)u(s(L,{outlined:"",modelValue:e.deleteParams.securityKey,"onUpdate:modelValue":A=>e.deleteParams.securityKey=A,type:"password",label:l.$t("enterSecretKey")},null,h,x));else return[n(L,{outlined:"",modelValue:e.deleteParams.securityKey,"onUpdate:modelValue":A=>e.deleteParams.securityKey=A,type:"password",label:l.$t("enterSecretKey")},null,8,["modelValue","onUpdate:modelValue","label"])]}),_:1},c)),o(s(e.GlobalDialog,{ref:"deleteDialogRef",title:l.$t("delete"),message:`${l.$t("delete")}【${e.currentAccountInfo.number}】${l.$t("withdrawAccount")}`,"on-confirm-callback":e.deleteAccountFunc},null,c)),o("</div>")}const j=U.setup;U.setup=(l,o)=>{const c=H();return(c.modules||(c.modules=new Set)).add("src/pages/default/mobile/wallets/account/index.vue"),j?j(l,o):void 0};const we=ne(U,[["ssrRender",ae],["__file","index.vue"]]);export{we as default};
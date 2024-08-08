import{defineComponent as O,resolveComponent as c,withCtx as n,createVNode as o,toDisplayString as $,openBlock as _,createBlock as f,createCommentVNode as A,Fragment as z,renderList as E,useSSRContext as G}from"vue";import{i as J,u as K,a as M,t as Q,s as T,_ as W}from"../server-entry.js";import{useI18n as X}from"vue-i18n/dist/vue-i18n.runtime.node.mjs";import{ssrRenderAttrs as Y,ssrRenderComponent as a,ssrRenderList as Z,ssrInterpolate as ee}from"vue/server-renderer";import"quasar";import"pinia";import"axios";import"vue-router";import"quasar/wrappers";const B=O({name:"HomeLang",__name:"lang",emits:["update"],setup(C,{expose:i,emit:s}){i();const V=J(),x=K(),t=X(),F=u=>{x.updateLang(u.symbol),Q().then(r=>{T(t,r,u.symbol)})},q=s;q("update",{title:t.t("switchLang"),right:{callback:()=>{},icon:""}});const k={$initStore:V,$userStore:x,$i18n:t,switchLang:F,emit:q,get imageSrc(){return M}};return Object.defineProperty(k,"__isScriptSetup",{enumerable:!1,value:!0}),k}});function te(C,i,s,V,x,t,F,q){const k=c("q-list"),u=c("q-item"),r=c("q-item-section"),S=c("q-avatar"),m=c("q-img"),v=c("q-checkbox");i(`<div${Y(V)}>`),i(a(k,{separator:""},{default:n((ne,b,j,D)=>{if(b)b("<!--[-->"),Z(t.$initStore.langList,(e,U)=>{b(a(u,{clickable:"",key:U,onClick:g=>t.switchLang(e)},{default:n((g,p,w,R)=>{if(p)p(a(r,{avatar:""},{default:n((y,l,L,d)=>{if(l)l(a(S,null,{default:n((h,N,H,I)=>{if(N)N(a(m,{"no-spinner":"",src:t.imageSrc(e.icon)},null,H,I));else return[o(m,{"no-spinner":"",src:t.imageSrc(e.icon)},null,8,["src"])]}),_:2},L,d));else return[o(S,null,{default:n(()=>[o(m,{"no-spinner":"",src:t.imageSrc(e.icon)},null,8,["src"])]),_:2},1024)]}),_:2},w,R)),p(a(r,null,{default:n((y,l,L,d)=>{if(l)l(`<div${d}>${ee(e.name)}</div>`);else return[o("div",{textContent:$(e.name)},null,8,["textContent"])]}),_:2},w,R)),p(a(r,{side:""},{default:n((y,l,L,d)=>{if(l)e.symbol==t.$userStore.userLang?l(a(v,{modelValue:e.symbol,"onUpdate:modelValue":h=>e.symbol=h,"true-value":t.$userStore.userLang,"checked-icon":"task_alt","unchecked-icon":"highlight_off"},null,L,d)):l("<!---->");else return[e.symbol==t.$userStore.userLang?(_(),f(v,{key:0,modelValue:e.symbol,"onUpdate:modelValue":h=>e.symbol=h,"true-value":t.$userStore.userLang,"checked-icon":"task_alt","unchecked-icon":"highlight_off"},null,8,["modelValue","onUpdate:modelValue","true-value"])):A("",!0)]}),_:2},w,R));else return[o(r,{avatar:""},{default:n(()=>[o(S,null,{default:n(()=>[o(m,{"no-spinner":"",src:t.imageSrc(e.icon)},null,8,["src"])]),_:2},1024)]),_:2},1024),o(r,null,{default:n(()=>[o("div",{textContent:$(e.name)},null,8,["textContent"])]),_:2},1024),o(r,{side:""},{default:n(()=>[e.symbol==t.$userStore.userLang?(_(),f(v,{key:0,modelValue:e.symbol,"onUpdate:modelValue":y=>e.symbol=y,"true-value":t.$userStore.userLang,"checked-icon":"task_alt","unchecked-icon":"highlight_off"},null,8,["modelValue","onUpdate:modelValue","true-value"])):A("",!0)]),_:2},1024)]}),_:2},j,D))}),b("<!--]-->");else return[(_(!0),f(z,null,E(t.$initStore.langList,(e,U)=>(_(),f(u,{clickable:"",key:U,onClick:g=>t.switchLang(e)},{default:n(()=>[o(r,{avatar:""},{default:n(()=>[o(S,null,{default:n(()=>[o(m,{"no-spinner":"",src:t.imageSrc(e.icon)},null,8,["src"])]),_:2},1024)]),_:2},1024),o(r,null,{default:n(()=>[o("div",{textContent:$(e.name)},null,8,["textContent"])]),_:2},1024),o(r,{side:""},{default:n(()=>[e.symbol==t.$userStore.userLang?(_(),f(v,{key:0,modelValue:e.symbol,"onUpdate:modelValue":g=>e.symbol=g,"true-value":t.$userStore.userLang,"checked-icon":"task_alt","unchecked-icon":"highlight_off"},null,8,["modelValue","onUpdate:modelValue","true-value"])):A("",!0)]),_:2},1024)]),_:2},1032,["onClick"]))),128))]}),_:1},s)),i("</div>")}const P=B.setup;B.setup=(C,i)=>{const s=G();return(s.modules||(s.modules=new Set)).add("src/pages/default/mobile/lang.vue"),P?P(C,i):void 0};const de=W(B,[["ssrRender",te],["__file","lang.vue"]]);export{de as default};
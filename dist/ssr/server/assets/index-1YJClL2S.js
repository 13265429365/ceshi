import{defineComponent as p,watch as a,onMounted as m,mergeProps as c,useSSRContext as u}from"vue";import{a as _}from"./article-s0WmQvvW.js";import{u as l,_ as x}from"../server-entry.js";import{ssrRenderAttrs as f,ssrInterpolate as v}from"vue/server-renderer";import"vue-router";import"quasar";import"pinia";import"axios";import"quasar/wrappers";import"vue-i18n/dist/vue-i18n.runtime.node.mjs";const i=p({name:"ArticleIndex",__name:"index",setup(o,{expose:t}){t();const e=l(),{details:n,articleDetailsFunc:s}=_();a(e,()=>{s()}),m(()=>{s()});const r={$userStore:e,details:n,articleDetailsFunc:s};return Object.defineProperty(r,"__isScriptSetup",{enumerable:!1,value:!0}),r}});function S(o,t,e,n,s,r,$,g){t(`<div${f(c({style:{padding:"80px 108px"}},n))}><div class="text-h5 text-weight-bold text-center q-mb-lg">${v(r.details.name)}</div><div>${r.details.content}</div></div>`)}const d=i.setup;i.setup=(o,t)=>{const e=u();return(e.modules||(e.modules=new Set)).add("src/pages/default/desktop/article/index.vue"),d?d(o,t):void 0};const k=x(i,[["ssrRender",S],["__file","index.vue"]]);export{k as default};
import{defineComponent as w,ref as p,watch as x,useSSRContext as y,resolveComponent as _,withCtx as S,renderSlot as V,createVNode as P}from"vue";import{n as C}from"./noData-DsDz3UZ9.js";import{ssrRenderAttrs as L,ssrRenderComponent as g,ssrRenderSlot as R}from"vue/server-renderer";import{_ as A}from"../server-entry.js";const f=w({name:"paginationIndex",__name:"pagination",props:{request:{required:!0,type:Function,default:()=>()=>{}},params:{required:!0,default:()=>({pagination:{descending:!0,page:1,rowsPerPage:10,sortBy:"createdAt"}})}},setup(o,{expose:a}){const t=o,i=p(!1),l=p([]),e=p({pagination:{descending:!0,page:1,rowsPerPage:10,sortBy:"createdAt"}});x(t.params,n=>{e.value=n});const d=()=>{e.value=t.params,m()},m=async()=>{if(e.value.hasOwnProperty("createdAt")&&!e.value.createdAt)return!1;t.request(e.value).then(n=>{i.value=Math.ceil(n.count/e.value.pagination.rowsPerPage),l.value=n.items})};a({initData:d});const s={props:t,total:i,itemList:l,dataParams:e,initData:d,loadMore:m,noData:C};return Object.defineProperty(s,"__isScriptSetup",{enumerable:!1,value:!0}),s}});function b(o,a,t,i,l,e,d,m){const s=_("q-list"),n=_("q-pagination");a(`<div${L(i)}>`),e.itemList.length>0?a(g(s,{bordered:"",class:"rounded-borders q-pa-md q-mt-lg"},{default:S((M,r,v,u)=>{if(r)R(o.$slots,"default",{itemList:e.itemList},null,r,v,u),r(`<div class="row justify-center q-mt-md"${u}>`),r(g(n,{modelValue:e.dataParams.pagination.page,"onUpdate:modelValue":[c=>e.dataParams.pagination.page=c,e.loadMore],max:e.total,min:1,input:""},null,v,u)),r("</div>");else return[V(o.$slots,"default",{itemList:e.itemList}),P("div",{class:"row justify-center q-mt-md"},[P(n,{modelValue:e.dataParams.pagination.page,"onUpdate:modelValue":[c=>e.dataParams.pagination.page=c,e.loadMore],max:e.total,min:1,input:""},null,8,["modelValue","onUpdate:modelValue","max"])])]}),_:3},t)):a(g(e.noData,null,null,t)),a("</div>")}const q=f.setup;f.setup=(o,a)=>{const t=y();return(t.modules||(t.modules=new Set)).add("src/components/dsektop/pagination.vue"),q?q(o,a):void 0};const O=A(f,[["ssrRender",b],["__file","pagination.vue"]]);export{O as p};

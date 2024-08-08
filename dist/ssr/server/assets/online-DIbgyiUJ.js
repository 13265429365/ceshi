import{defineComponent as d,ref as f,onMounted as p,useSSRContext as u,resolveComponent as v,withCtx as x,createVNode as g}from"vue";import{o as S,a as C,_ as I}from"../server-entry.js";import{ssrRenderAttrs as R,ssrRenderComponent as h,ssrRenderAttr as w}from"vue/server-renderer";const s=d({name:"OnlineChat",__name:"online",setup(r,{expose:n}){n();const e=f({icon:"",link:""});p(()=>{t()});const t=()=>{S().then(i=>{e.value=i})},o={onlineInfo:e,onlineInfoFunc:t,hrefOnlineFunc:()=>{window.location.href=e.value.link},get imageSrc(){return C}};return Object.defineProperty(o,"__isScriptSetup",{enumerable:!1,value:!0}),o}});function b(r,n,e,t,l,o,i,O){const m=v("q-avatar");n(`<div${R(t)}><div>`),n(h(m,{size:"48px",class:"fixed-bottom-right q-mr-lg cursor-pointer shadow-1 z-top",style:{bottom:"80px"}},{default:x((q,c,A,_)=>{if(c)c(`<img${w("src",o.imageSrc(o.onlineInfo.icon))} alt=""${_}>`);else return[g("img",{src:o.imageSrc(o.onlineInfo.icon),alt:""},null,8,["src"])]}),_:1},e)),n("</div></div>")}const a=s.setup;s.setup=(r,n)=>{const e=u();return(e.modules||(e.modules=new Set)).add("src/components/online.vue"),a?a(r,n):void 0};const y=I(s,[["ssrRender",b],["__file","online.vue"]]);export{y as o};
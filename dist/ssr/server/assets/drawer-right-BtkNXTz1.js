import{defineComponent as i,resolveComponent as _,mergeProps as d,useSSRContext as m}from"vue";import{ssrRenderComponent as a}from"vue/server-renderer";import{_ as u}from"../server-entry.js";import"quasar";import"pinia";import"axios";import"vue-router";import"quasar/wrappers";import"vue-i18n/dist/vue-i18n.runtime.node.mjs";const o=i({name:"drawerRightLayouts",__name:"drawer-right",setup(t,{expose:r}){r();const e={};return Object.defineProperty(e,"__isScriptSetup",{enumerable:!1,value:!0}),e}});function c(t,r,e,n,f,l,w,g){const p=_("q-drawer");r(a(p,d({"show-if-above":"",side:"right",bordered:""},n),null,e))}const s=o.setup;o.setup=(t,r)=>{const e=m();return(e.modules||(e.modules=new Set)).add("src/layouts/desktop/drawer-right.vue"),s?s(t,r):void 0};const k=u(o,[["ssrRender",c],["__file","drawer-right.vue"]]);export{k as default};

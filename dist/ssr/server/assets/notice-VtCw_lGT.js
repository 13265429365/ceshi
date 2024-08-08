import{reactive as H,toRefs as I,defineComponent as M,ref as z,onMounted as O,watch as T,useSSRContext as U,resolveComponent as u,withCtx as n,createVNode as e,toDisplayString as a,createTextVNode as w}from"vue";import{h as B}from"./home-Cz1ExWsF.js";import{useRoute as E}from"vue-router";import{ssrRenderAttrs as G,ssrRenderComponent as f,ssrInterpolate as $}from"vue/server-renderer";import{_ as J}from"../server-entry.js";const te=()=>{const t=H({homeData:{banner:[],introduce:"",notice:""}}),i=()=>{B().then(c=>{t.homeData=c})};return{...I(t),homeFunc:i}},k=M({name:"NoticeIndex",__name:"notice",props:{content:{type:String,default:""}},setup(t,{expose:i}){i();const c=E(),m=z(!1),l=t,o=z("");O(()=>{o.value=l.content}),T(()=>l.content,D=>{o.value=D,o.value!=""&&o.value!=" "&&c.name=="HomeIndex"&&(m.value=!0)});const y={$route:c,showDialog:m,props:l,currentValue:o};return Object.defineProperty(y,"__isScriptSetup",{enumerable:!1,value:!0}),y}});function K(t,i,c,m,l,o,y,D){const A=u("q-dialog"),b=u("q-card"),r=u("q-card-section"),v=u("q-icon"),p=u("q-btn");i(`<div${G(m)}>`),i(f(A,{modelValue:o.showDialog,"onUpdate:modelValue":R=>o.showDialog=R},{default:n((R,S,P,F)=>{if(S)S(f(b,{style:{width:"350px"}},{default:n((j,g,q,x)=>{if(g)g(f(r,{class:"q-pb-none relative-position"},{default:n((_,s,h,d)=>{if(s)s(`<div class="text-h6 text-center"${d}>${$(t.$t("notice"))}</div>`),s(f(v,{class:"absolute-right",style:{right:"10px",top:"20px"},name:"close",size:"20px",onClick:C=>o.showDialog=!1},null,h,d));else return[e("div",{class:"text-h6 text-center"},a(t.$t("notice")),1),e(v,{class:"absolute-right",style:{right:"10px",top:"20px"},name:"close",size:"20px",onClick:C=>o.showDialog=!1},null,8,["onClick"])]}),_:1},q,x)),g(f(r,{class:"q-pa-lg"},{default:n((_,s,h,d)=>{if(s)s(`<div${d}>${$(l.content!=""?t.$t(l.content):"")}</div>`);else return[e("div",null,a(l.content!=""?t.$t(l.content):""),1)]}),_:1},q,x)),g(f(r,{class:"q-py-lg"},{default:n((_,s,h,d)=>{if(s)s(`<div class="row justify-center"${d}>`),s(f(p,{onClick:C=>o.showDialog=!1,class:"col-6",unelevated:"",rounded:"","no-caps":"",color:"primary"},{default:n((C,V,L,Q)=>{if(V)V(`${$(t.$t("confirm"))}`);else return[w(a(t.$t("confirm")),1)]}),_:1},h,d)),s("</div>");else return[e("div",{class:"row justify-center"},[e(p,{onClick:C=>o.showDialog=!1,class:"col-6",unelevated:"",rounded:"","no-caps":"",color:"primary"},{default:n(()=>[w(a(t.$t("confirm")),1)]),_:1},8,["onClick"])])]}),_:1},q,x));else return[e(r,{class:"q-pb-none relative-position"},{default:n(()=>[e("div",{class:"text-h6 text-center"},a(t.$t("notice")),1),e(v,{class:"absolute-right",style:{right:"10px",top:"20px"},name:"close",size:"20px",onClick:_=>o.showDialog=!1},null,8,["onClick"])]),_:1}),e(r,{class:"q-pa-lg"},{default:n(()=>[e("div",null,a(l.content!=""?t.$t(l.content):""),1)]),_:1}),e(r,{class:"q-py-lg"},{default:n(()=>[e("div",{class:"row justify-center"},[e(p,{onClick:_=>o.showDialog=!1,class:"col-6",unelevated:"",rounded:"","no-caps":"",color:"primary"},{default:n(()=>[w(a(t.$t("confirm")),1)]),_:1},8,["onClick"])])]),_:1})]}),_:1},P,F));else return[e(b,{style:{width:"350px"}},{default:n(()=>[e(r,{class:"q-pb-none relative-position"},{default:n(()=>[e("div",{class:"text-h6 text-center"},a(t.$t("notice")),1),e(v,{class:"absolute-right",style:{right:"10px",top:"20px"},name:"close",size:"20px",onClick:j=>o.showDialog=!1},null,8,["onClick"])]),_:1}),e(r,{class:"q-pa-lg"},{default:n(()=>[e("div",null,a(l.content!=""?t.$t(l.content):""),1)]),_:1}),e(r,{class:"q-py-lg"},{default:n(()=>[e("div",{class:"row justify-center"},[e(p,{onClick:j=>o.showDialog=!1,class:"col-6",unelevated:"",rounded:"","no-caps":"",color:"primary"},{default:n(()=>[w(a(t.$t("confirm")),1)]),_:1},8,["onClick"])])]),_:1})]),_:1})]}),_:1},c)),i("</div>")}const N=k.setup;k.setup=(t,i)=>{const c=U();return(c.modules||(c.modules=new Set)).add("src/components/notice.vue"),N?N(t,i):void 0};const oe=J(k,[["ssrRender",K],["__file","notice.vue"]]);export{te as h,oe as n};

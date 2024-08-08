import{defineComponent as R,onMounted as F,resolveComponent as A,mergeProps as B,withCtx as c,createTextVNode as D,toDisplayString as M,createVNode as v,openBlock as l,createBlock as d,createCommentVNode as k,useSSRContext as O}from"vue";import{u as T,n as E,p as G,s as H,f as J}from"./auth-57d620Eh.js";import{u as K}from"./uploader-DYgAejq8.js";import{i as L,a as Q,_ as W}from"../server-entry.js";import{ssrRenderAttrs as X,ssrRenderComponent as r,ssrInterpolate as u,ssrRenderStyle as j}from"vue/server-renderer";import"vue-i18n/dist/vue-i18n.runtime.node.mjs";import"quasar";import"compressorjs";import"pinia";import"axios";import"vue-router";import"quasar/wrappers";const V=R({name:"UserAuthIndex",__name:"auth",setup(i,{expose:a}){a();const s=L(),{params:S,createUserAuthFunc:z,userAuthInfoFunc:e}=T();F(()=>{e()});const w={$initStore:s,params:S,createUserAuthFunc:z,userAuthInfoFunc:e,uploader:K,get imageSrc(){return Q},get nowAuth(){return E},get pendingAuth(){return G},get successAuth(){return H},get failedAuth(){return J}};return Object.defineProperty(w,"__isScriptSetup",{enumerable:!1,value:!0}),w}});function Y(i,a,s,S,z,e,w,Z){const P=A("q-banner"),p=A("q-input"),q=A("q-uploader-add-trigger"),b=A("q-card"),f=A("q-icon"),g=A("q-img"),N=A("q-btn");a(`<div${X(B({class:"row justify-center q-py-xl"},S))}><div class="col-6">`),e.params.status==e.failedAuth?(a("<div>"),a(r(P,{rounded:"",class:"bg-red text-white q-mt-sm"},{default:c((n,t,y,h)=>{if(t)t(`${u(e.params.data)}`);else return[D(M(e.params.data),1)]}),_:1},s)),a("</div>")):a("<!---->"),a(`<div class="text-h5 q-mt-md">${u(i.$t("userAuth"))}</div><div class="q-gutter-md q-mt-lg">`),e.$initStore.setting.auth.showRealName?(a(`<div><div class="q-mb-xs">${u(i.$t("idName"))}</div>`),a(r(p,{outlined:"",modelValue:e.params.realName,"onUpdate:modelValue":n=>e.params.realName=n,readonly:e.params.status==e.pendingAuth||e.params.status==e.successAuth,placeholder:i.$t("idName")},null,s)),a("</div>")):a("<!---->"),e.$initStore.setting.auth.showNumber?(a(`<div><div class="q-mb-xs">${u(i.$t("idNumber"))}</div>`),a(r(p,{outlined:"",modelValue:e.params.number,"onUpdate:modelValue":n=>e.params.number=n,readonly:e.params.status==e.pendingAuth||e.params.status==e.successAuth,placeholder:i.$t("idNumber")},null,s)),a("</div>")):a("<!---->"),e.$initStore.setting.auth.showAddress?(a(`<div><div class="q-mb-xs">${u(i.$t("idAddress"))}</div>`),a(r(p,{outlined:"",modelValue:e.params.address,"onUpdate:modelValue":n=>e.params.address=n,readonly:e.params.status==e.pendingAuth||e.params.status==e.successAuth,placeholder:i.$t("idAddress")},null,s)),a("</div>")):a("<!---->"),a(`<div><div>${u(i.$t("idPhoto"))}</div><div class="row q-mt-sm"><div class="col q-mr-xs">`),a(r(e.uploader,{respValue:e.params.photo1,onUploaded:n=>{e.params.photo1=n}},{default:c((n,t,y,h)=>{if(t)e.params.status==e.nowAuth||e.params.status==e.failedAuth?t(r(q,null,null,y,h)):t("<!---->"),t(r(b,{flat:""},{default:c((C,o,x,m)=>{if(o)o(`<div class="column items-center justify-center" style="${j({height:"150px",border:"grey 1px dashed"})}"${m}>`),e.params.photo1==""?o(r(f,{name:"add",color:"grey",size:"40px"},null,x,m)):o(r(g,{"no-spinner":"",src:e.imageSrc(e.params.photo1)},null,x,m)),o("</div>");else return[v("div",{class:"column items-center justify-center",style:{height:"150px",border:"grey 1px dashed"}},[e.params.photo1==""?(l(),d(f,{key:0,name:"add",color:"grey",size:"40px"})):(l(),d(g,{key:1,"no-spinner":"",src:e.imageSrc(e.params.photo1)},null,8,["src"]))])]}),_:1},y,h));else return[e.params.status==e.nowAuth||e.params.status==e.failedAuth?(l(),d(q,{key:0})):k("",!0),v(b,{flat:""},{default:c(()=>[v("div",{class:"column items-center justify-center",style:{height:"150px",border:"grey 1px dashed"}},[e.params.photo1==""?(l(),d(f,{key:0,name:"add",color:"grey",size:"40px"})):(l(),d(g,{key:1,"no-spinner":"",src:e.imageSrc(e.params.photo1)},null,8,["src"]))])]),_:1})]}),_:1},s)),a(`<div class="text-caption text-weight-medium text-center q-mt-sm">${u(i.$t("idPhoto1"))}</div></div>`),e.$initStore.setting.auth.showPhoto2?(a('<div class="col q-ml-xs">'),a(r(e.uploader,{respValue:e.params.photo2,onUploaded:n=>{e.params.photo2=n}},{default:c((n,t,y,h)=>{if(t)e.params.status==e.nowAuth||e.params.status==e.failedAuth?t(r(q,null,null,y,h)):t("<!---->"),t(r(b,{flat:""},{default:c((C,o,x,m)=>{if(o)o(`<div class="column items-center justify-center" style="${j({height:"150px",border:"grey 1px dashed"})}"${m}>`),e.params.photo2==""?o(r(f,{name:"add",color:"grey",size:"40px"},null,x,m)):o(r(g,{"no-spinner":"",src:e.imageSrc(e.params.photo2)},null,x,m)),o("</div>");else return[v("div",{class:"column items-center justify-center",style:{height:"150px",border:"grey 1px dashed"}},[e.params.photo2==""?(l(),d(f,{key:0,name:"add",color:"grey",size:"40px"})):(l(),d(g,{key:1,"no-spinner":"",src:e.imageSrc(e.params.photo2)},null,8,["src"]))])]}),_:1},y,h));else return[e.params.status==e.nowAuth||e.params.status==e.failedAuth?(l(),d(q,{key:0})):k("",!0),v(b,{flat:""},{default:c(()=>[v("div",{class:"column items-center justify-center",style:{height:"150px",border:"grey 1px dashed"}},[e.params.photo2==""?(l(),d(f,{key:0,name:"add",color:"grey",size:"40px"})):(l(),d(g,{key:1,"no-spinner":"",src:e.imageSrc(e.params.photo2)},null,8,["src"]))])]),_:1})]}),_:1},s)),a(`<div class="text-caption text-weight-medium text-center q-mt-sm">${u(i.$t("idPhoto2"))}</div></div>`)):a("<!---->"),e.$initStore.setting.auth.showPhoto3?(a('<div class="col q-ml-xs">'),a(r(e.uploader,{respValue:e.params.photo3,onUploaded:n=>{e.params.photo3=n}},{default:c((n,t,y,h)=>{if(t)e.params.status==e.nowAuth||e.params.status==e.failedAuth?t(r(q,null,null,y,h)):t("<!---->"),t(r(b,{flat:""},{default:c((C,o,x,m)=>{if(o)o(`<div class="column items-center justify-center" style="${j({height:"150px",border:"grey 1px dashed"})}"${m}>`),e.params.photo3==""?o(r(f,{name:"add",color:"grey",size:"40px"},null,x,m)):o(r(g,{"no-spinner":"",src:e.imageSrc(e.params.photo3)},null,x,m)),o("</div>");else return[v("div",{class:"column items-center justify-center",style:{height:"150px",border:"grey 1px dashed"}},[e.params.photo3==""?(l(),d(f,{key:0,name:"add",color:"grey",size:"40px"})):(l(),d(g,{key:1,"no-spinner":"",src:e.imageSrc(e.params.photo3)},null,8,["src"]))])]}),_:1},y,h));else return[e.params.status==e.nowAuth||e.params.status==e.failedAuth?(l(),d(q,{key:0})):k("",!0),v(b,{flat:""},{default:c(()=>[v("div",{class:"column items-center justify-center",style:{height:"150px",border:"grey 1px dashed"}},[e.params.photo3==""?(l(),d(f,{key:0,name:"add",color:"grey",size:"40px"})):(l(),d(g,{key:1,"no-spinner":"",src:e.imageSrc(e.params.photo3)},null,8,["src"]))])]),_:1})]}),_:1},s)),a(`<div class="text-caption text-weight-medium text-center q-mt-sm">${u(i.$t("idPhoto3"))}</div></div>`)):a("<!---->"),a('</div></div><div class="q-mt-xl row justify-end">'),e.params.status==e.nowAuth?a(r(N,{rounded:"",unelevated:"",color:"primary","no-caps":"",label:i.$t("submit"),style:{"min-width":"100px"},size:"md",onClick:e.createUserAuthFunc},null,s)):a("<!---->"),e.params.status==e.failedAuth?a(r(N,{rounded:"",unelevated:"",color:"primary","no-caps":"",label:i.$t("reSubmit"),style:{"min-width":"100px"},size:"md",onClick:e.createUserAuthFunc},null,s)):a("<!---->"),a("</div></div></div></div>")}const U=V.setup;V.setup=(i,a)=>{const s=O();return(s.modules||(s.modules=new Set)).add("src/pages/default/desktop/users/auth.vue"),U?U(i,a):void 0};const se=W(V,[["ssrRender",Y],["__file","auth.vue"]]);export{se as default};

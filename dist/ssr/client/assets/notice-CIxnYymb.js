import{h as f}from"./home-RyNCgyNw.js";import{k as _,b1 as v,n as h,$ as g,r as m,E as x,w,_ as D,s as y,t as C,y as a,v as r,W as V,U as c,B as u,D as d,H as b,N as k,G as B,K as N}from"./index-BAN5Iapo.js";const E=()=>{const t=_({homeData:{banner:[],introduce:"",notice:""}}),e=()=>{f().then(o=>{t.homeData=o})};return{...v(t),homeFunc:e}},Q=h({name:"NoticeIndex",__name:"notice",props:{content:{type:String,default:""}},setup(t,{expose:e}){e();const o=g(),n=m(!1),i=t,s=m("");x(()=>{s.value=i.content}),w(()=>i.content,p=>{s.value=p,s.value!=""&&s.value!=" "&&o.name=="HomeIndex"&&(n.value=!0)});const l={$route:o,showDialog:n,props:i,currentValue:s};return Object.defineProperty(l,"__isScriptSetup",{enumerable:!1,value:!0}),l}}),S={class:"text-h6 text-center"},$={class:"row justify-center"};function I(t,e,o,n,i,s){return y(),C("div",null,[a(N,{modelValue:n.showDialog,"onUpdate:modelValue":e[2]||(e[2]=l=>n.showDialog=l)},{default:r(()=>[a(V,{style:{width:"350px"}},{default:r(()=>[a(c,{class:"q-pb-none relative-position"},{default:r(()=>[u("div",S,d(t.$t("notice")),1),a(b,{class:"absolute-right",style:{right:"10px",top:"20px"},name:"close",size:"20px",onClick:e[0]||(e[0]=l=>n.showDialog=!1)})]),_:1}),a(c,{class:"q-pa-lg"},{default:r(()=>[u("div",null,d(o.content!=""?t.$t(o.content):""),1)]),_:1}),a(c,{class:"q-py-lg"},{default:r(()=>[u("div",$,[a(k,{onClick:e[1]||(e[1]=l=>n.showDialog=!1),class:"col-6",unelevated:"",rounded:"","no-caps":"",color:"primary"},{default:r(()=>[B(d(t.$t("confirm")),1)]),_:1})])]),_:1})]),_:1})]),_:1},8,["modelValue"])])}const H=D(Q,[["render",I],["__file","notice.vue"]]);export{E as h,H as n};

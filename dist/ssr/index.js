var _=Object.defineProperty;var k=(e,r)=>()=>(e&&(r=e(e=0)),r);var F=(e,r)=>{for(var t in r)_(e,t,{get:r[t],enumerable:!0})};var S={};F(S,{default:()=>Q});import{ssrMiddleware as B}from"quasar/wrappers";var Q,P=k(()=>{"use strict";Q=B(({app:e,resolve:r,render:t,serve:o})=>{e.get(r.urlPath("*"),(a,s)=>{s.setHeader("Content-Type","text/html"),t({req:a,res:s}).then(n=>{s.send(n)}).catch(n=>{n.url?n.code?s.redirect(n.code,n.url):s.redirect(n.url):n.code===404?s.status(404).send("404 | Page Not Found"):s.status(500).send("500 | Internal Server Error")})})})});import{join as d,basename as K}from"node:path";import{readFileSync as W}from"node:fs";import{fileURLToPath as X}from"node:url";import{renderToString as Y}from"vue/server-renderer";import Z from"serialize-javascript";import x from"./render-template.js";import C from"./server/server-entry.js";import v from"express";import O from"compression";import{ssrClose as D,ssrCreate as I,ssrListen as L,ssrServeStaticContent as M,ssrRenderPreloadTag as N}from"quasar/wrappers";var w=I(()=>{let e=v();return e.disable("x-powered-by"),e.use(O()),e}),R=L(async({app:e,devHttpsApp:r,port:t,isReady:o})=>(await o(),(r||e).listen(t,()=>{console.log("Server listening at port "+t)}))),pe=D(({listenResult:e})=>e.close()),U=1e3*60*60*24*30,E=M((e,r)=>v.static(e,{maxAge:U,...r})),A=/\.js$/,G=/\.css$/,H=/\.woff$/,q=/\.woff2$/,J=/\.gif$/,V=/\.jpe?g$/,z=/\.png$/,u=N(e=>A.test(e)===!0?`<link rel="modulepreload" href="${e}" crossorigin>`:G.test(e)===!0?`<link rel="stylesheet" href="${e}" crossorigin>`:H.test(e)===!0?`<link rel="preload" href="${e}" as="font" type="font/woff" crossorigin>`:q.test(e)===!0?`<link rel="preload" href="${e}" as="font" type="font/woff2" crossorigin>`:J.test(e)===!0?`<link rel="preload" href="${e}" as="image" type="image/gif" crossorigin>`:V.test(e)===!0?`<link rel="preload" href="${e}" as="image" type="image/jpeg" crossorigin>`:z.test(e)===!0?`<link rel="preload" href="${e}" as="image" type="image/png" crossorigin>`:"");function f(e){return Promise.all([Promise.resolve().then(()=>(P(),S))]).then(async r=>{let t=r.map(o=>o.default);for(let o=0;o<t.length;o++)try{await t[o](e)}catch(a){console.error("[Quasar SSR] middleware error:",a);return}})}var ee=process.env.PORT||3011,re=/\/\//g,i="/",y=i==="/"?e=>e||"/":e=>e?(i+e).replace(re,"/"):i,c=X(new URL(".",import.meta.url)),T=d(c,"client"),m=JSON.parse(W(d(c,"./quasar.manifest.json"),"utf-8"));function $(){return d(T,...arguments)}function te(e,r){let t="",o=new Set;return e.forEach(a=>{let s=m[a];s!==void 0&&s.forEach(n=>{if(o.has(n)===!0)return;o.add(n);let h=K(n);if(m[h]!==void 0)for(let p of m[h])o.has(p)===!1&&(t+=u(p,r),o.add(p));t+=u(n,r)})}),t}var oe="document.currentScript.remove()";function ne(e){let r=e.nonce!==void 0?' nonce="'+e.nonce+'"':"",t=Z(e.state,{isJSON:!0});return"<script"+r+">window.__INITIAL_STATE__="+t+";"+oe+"</script>"}async function se(e){let r=[];Object.assign(e,{_meta:{},onRendered:t=>{r.push(t)}});try{let t=await C(e),o=await Y(t,e);return r.forEach(a=>{a()}),typeof e.rendered=="function"&&e.rendered(),e._meta.runtimePageContent=o,e.state!==void 0&&(e._meta.headTags=ne(e)+e._meta.headTags),e._meta.endingHeadTags+=te(e.modules,{ssrContext:e}),x(e)}catch(t){throw t}}var b=(e,r={})=>E($(e),r),l={port:ee,resolve:{urlPath:y,root(){return d(c,...arguments)},public:$},publicPath:i,folders:{root:c,public:T},render:e=>se(e),serve:{static:b}},g=w(l);l.app=g;g.use(y("/"),b("."));var j=()=>f(l),ae=(e,r,t)=>j().then(()=>g(e,r,t)),Te=R({isReady:j,ssrHandler:ae,...l});export{Te as default};
import{r as g,f as y,E as c,c as z,g as w,T as f,a9 as O,as as v,h as x,ab as b}from"./index-BAN5Iapo.js";function E(){const r=g(!y.value);return r.value===!1&&c(()=>{r.value=!0}),{isHydrated:r}}const m=typeof ResizeObserver<"u",h=m===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"},H=z({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(r,{emit:p}){let i=null,t,s={width:-1,height:-1};function u(e){e===!0||r.debounce===0||r.debounce==="0"?a():i===null&&(i=setTimeout(a,r.debounce))}function a(){if(i!==null&&(clearTimeout(i),i=null),t){const{offsetWidth:e,offsetHeight:n}=t;(e!==s.width||n!==s.height)&&(s={width:e,height:n},p("resize",s))}}const{proxy:l}=w();if(l.trigger=u,m===!0){let e;const n=d=>{t=l.$el.parentNode,t?(e=new ResizeObserver(u),e.observe(t),a()):d!==!0&&v(()=>{n(!0)})};return c(()=>{n()}),f(()=>{i!==null&&clearTimeout(i),e!==void 0&&(e.disconnect!==void 0?e.disconnect():t&&e.unobserve(t))}),O}else{let e=function(){i!==null&&(clearTimeout(i),i=null),o!==void 0&&(o.removeEventListener!==void 0&&o.removeEventListener("resize",u,b.passive),o=void 0)},n=function(){e(),t&&t.contentDocument&&(o=t.contentDocument.defaultView,o.addEventListener("resize",u,b.passive),a())};const{isHydrated:d}=E();let o;return c(()=>{v(()=>{t=l.$el,t&&n()})}),f(e),()=>{if(d.value===!0)return x("object",{class:"q--avoid-card-border",style:h.style,tabindex:-1,type:"text/html",data:h.url,"aria-hidden":"true",onLoad:n})}}}});export{H as Q};

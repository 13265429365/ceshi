import{c as R,g as _,i as $,e as v,l as L,r as d,f as O,a as l,w as s,T as S,m as I,h}from"./index-BAN5Iapo.js";import{Q as P}from"./QResizeObserver-Dzscdk3d.js";const K=R({name:"QFooter",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(o,{slots:z,emit:m}){const{proxy:{$q:c}}=_(),t=$(L,v);if(t===v)return console.error("QFooter needs to be child of QLayout"),v;const r=d(parseInt(o.heightHint,10)),n=d(!0),g=d(O.value===!0||t.isContainer.value===!0?0:window.innerHeight),f=l(()=>o.reveal===!0||t.view.value.indexOf("F")!==-1||c.platform.is.ios&&t.isContainer.value===!0),y=l(()=>t.isContainer.value===!0?t.containerHeight.value:g.value),b=l(()=>{if(o.modelValue!==!0)return 0;if(f.value===!0)return n.value===!0?r.value:0;const e=t.scroll.value.position+y.value+r.value-t.height.value;return e>0?e:0}),w=l(()=>o.modelValue!==!0||f.value===!0&&n.value!==!0),q=l(()=>o.modelValue===!0&&w.value===!0&&o.reveal===!0),x=l(()=>"q-footer q-layout__section--marginal "+(f.value===!0?"fixed":"absolute")+"-bottom"+(o.bordered===!0?" q-footer--bordered":"")+(w.value===!0?" q-footer--hidden":"")+(o.modelValue!==!0?" q-layout--prevent-focus"+(f.value!==!0?" hidden":""):"")),F=l(()=>{const e=t.rows.value.bottom,a={};return e[0]==="l"&&t.left.space===!0&&(a[c.lang.rtl===!0?"right":"left"]=`${t.left.size}px`),e[2]==="r"&&t.right.space===!0&&(a[c.lang.rtl===!0?"left":"right"]=`${t.right.size}px`),a});function u(e,a){t.update("footer",e,a)}function i(e,a){e.value!==a&&(e.value=a)}function H({height:e}){i(r,e),u("size",e)}function Q(){if(o.reveal!==!0)return;const{direction:e,position:a,inflectionPoint:B}=t.scroll.value;i(n,e==="up"||a-B<100||t.height.value-y.value-a-r.value<300)}function C(e){q.value===!0&&i(n,!0),m("focusin",e)}s(()=>o.modelValue,e=>{u("space",e),i(n,!0),t.animate()}),s(b,e=>{u("offset",e)}),s(()=>o.reveal,e=>{e===!1&&i(n,o.modelValue)}),s(n,e=>{t.animate(),m("reveal",e)}),s([r,t.scroll,t.height],Q),s(()=>c.screen.height,e=>{t.isContainer.value!==!0&&i(g,e)});const V={};return t.instances.footer=V,o.modelValue===!0&&u("size",r.value),u("space",o.modelValue),u("offset",b.value),S(()=>{t.instances.footer===V&&(t.instances.footer=void 0,u("size",0),u("offset",0),u("space",!1))}),()=>{const e=I(z.default,[h(P,{debounce:0,onResize:H})]);return o.elevated===!0&&e.push(h("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),h("footer",{class:x.value,style:F.value,onFocusin:C},e)}}});export{K as Q};
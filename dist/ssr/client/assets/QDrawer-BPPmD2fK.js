import{c as ge,am as ke,a1 as qe,an as xe,g as Be,a2 as Te,ae as Ce,i as Se,e as H,l as Me,r as k,a as i,ap as $e,ar as Oe,w as o,E as De,as as Z,T as Le,L as We,h as $,at as p,b as Ae,au as Pe}from"./index-BGPSJsC7.js";import{T as N}from"./TouchPan-B1K5NlI7.js";import{b as O}from"./format-DyQxkAtJ.js";const ee=150,Qe=ge({name:"QDrawer",inheritAttrs:!1,props:{...ke,...qe,side:{type:String,default:"left",validator:a=>["left","right"].includes(a)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},noMiniAnimation:Boolean,breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:a=>["default","desktop","mobile"].includes(a),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...xe,"onLayout","miniState"],setup(a,{slots:D,emit:y,attrs:R}){const f=Be(),{proxy:{$q:v}}=f,ae=Te(a,v),{preventBodyScroll:L}=Pe(),{registerTimeout:j,removeTimeout:te}=Ce(),t=Se(Me,H);if(t===H)return console.error("QDrawer needs to be child of QLayout"),H;let W,b=null,q;const n=k(a.behavior==="mobile"||a.behavior!=="desktop"&&t.totalWidth.value<=a.breakpoint),x=i(()=>a.mini===!0&&n.value!==!0),s=i(()=>x.value===!0?a.miniWidth:a.width),u=k(a.showIfAbove===!0&&n.value===!1?!0:a.modelValue===!0),E=i(()=>a.persistent!==!0&&(n.value===!0||ie.value===!0));function U(e,l){if(le(),e!==!1&&t.animate(),d(0),n.value===!0){const r=t.instances[S.value];r!==void 0&&r.belowBreakpoint===!0&&r.hide(!1),m(1),t.isContainer.value!==!0&&L(!0)}else m(0),e!==!1&&F(!1);j(()=>{e!==!1&&F(!0),l!==!0&&y("show",e)},ee)}function K(e,l){ue(),e!==!1&&t.animate(),m(0),d(w.value*s.value),Q(),l!==!0?j(()=>{y("hide",e)},ee):te()}const{show:A,hide:B}=$e({showing:u,hideOnRouteChange:E,handleShow:U,handleHide:K}),{addToHistory:le,removeFromHistory:ue}=Oe(u,B,E),C={belowBreakpoint:n,hide:B},c=i(()=>a.side==="right"),w=i(()=>(v.lang.rtl===!0?-1:1)*(c.value===!0?1:-1)),X=k(0),g=k(!1),P=k(!1),G=k(s.value*w.value),S=i(()=>c.value===!0?"left":"right"),_=i(()=>u.value===!0&&n.value===!1&&a.overlay===!1?a.miniToOverlay===!0?a.miniWidth:s.value:0),z=i(()=>a.overlay===!0||a.miniToOverlay===!0||t.view.value.indexOf(c.value?"R":"L")!==-1||v.platform.is.ios===!0&&t.isContainer.value===!0),T=i(()=>a.overlay===!1&&u.value===!0&&n.value===!1),ie=i(()=>a.overlay===!0&&u.value===!0&&n.value===!1),ne=i(()=>"fullscreen q-drawer__backdrop"+(u.value===!1&&g.value===!1?" hidden":"")),oe=i(()=>({backgroundColor:`rgba(0,0,0,${X.value*.4})`})),J=i(()=>c.value===!0?t.rows.value.top[2]==="r":t.rows.value.top[0]==="l"),re=i(()=>c.value===!0?t.rows.value.bottom[2]==="r":t.rows.value.bottom[0]==="l"),se=i(()=>{const e={};return t.header.space===!0&&J.value===!1&&(z.value===!0?e.top=`${t.header.offset}px`:t.header.space===!0&&(e.top=`${t.header.size}px`)),t.footer.space===!0&&re.value===!1&&(z.value===!0?e.bottom=`${t.footer.offset}px`:t.footer.space===!0&&(e.bottom=`${t.footer.size}px`)),e}),de=i(()=>{const e={width:`${s.value}px`,transform:`translateX(${G.value}px)`};return n.value===!0?e:Object.assign(e,se.value)}),ve=i(()=>"q-drawer__content fit "+(t.isContainer.value!==!0?"scroll":"overflow-auto")),ce=i(()=>`q-drawer q-drawer--${a.side}`+(P.value===!0?" q-drawer--mini-animate":"")+(a.bordered===!0?" q-drawer--bordered":"")+(ae.value===!0?" q-drawer--dark q-dark":"")+(g.value===!0?" no-transition":u.value===!0?"":" q-layout--prevent-focus")+(n.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${x.value===!0?"mini":"standard"}`+(z.value===!0||T.value!==!0?" fixed":"")+(a.overlay===!0||a.miniToOverlay===!0?" q-drawer--on-top":"")+(J.value===!0?" q-drawer--top-padding":""))),fe=i(()=>{const e=v.lang.rtl===!0?a.side:S.value;return[[N,be,void 0,{[e]:!0,mouse:!0}]]}),me=i(()=>{const e=v.lang.rtl===!0?S.value:a.side;return[[N,Y,void 0,{[e]:!0,mouse:!0}]]}),he=i(()=>{const e=v.lang.rtl===!0?S.value:a.side;return[[N,Y,void 0,{[e]:!0,mouse:!0,mouseAllDir:!0}]]});function I(){we(n,a.behavior==="mobile"||a.behavior!=="desktop"&&t.totalWidth.value<=a.breakpoint)}o(n,e=>{e===!0?(W=u.value,u.value===!0&&B(!1)):a.overlay===!1&&a.behavior!=="mobile"&&W!==!1&&(u.value===!0?(d(0),m(0),Q()):A(!1))}),o(()=>a.side,(e,l)=>{t.instances[l]===C&&(t.instances[l]=void 0,t[l].space=!1,t[l].offset=0),t.instances[e]=C,t[e].size=s.value,t[e].space=T.value,t[e].offset=_.value}),o(t.totalWidth,()=>{(t.isContainer.value===!0||document.qScrollPrevented!==!0)&&I()}),o(()=>a.behavior+a.breakpoint,I),o(t.isContainer,e=>{u.value===!0&&L(e!==!0),e===!0&&I()}),o(t.scrollbarWidth,()=>{d(u.value===!0?0:void 0)}),o(_,e=>{h("offset",e)}),o(T,e=>{y("onLayout",e),h("space",e)}),o(c,()=>{d()}),o(s,e=>{d(),V(a.miniToOverlay,e)}),o(()=>a.miniToOverlay,e=>{V(e,s.value)}),o(()=>v.lang.rtl,()=>{d()}),o(()=>a.mini,()=>{a.noMiniAnimation||a.modelValue===!0&&(ye(),t.animate())}),o(x,e=>{y("miniState",e)});function d(e){e===void 0?Z(()=>{e=u.value===!0?0:s.value,d(w.value*e)}):(t.isContainer.value===!0&&c.value===!0&&(n.value===!0||Math.abs(e)===s.value)&&(e+=w.value*t.scrollbarWidth.value),G.value=e)}function m(e){X.value=e}function F(e){const l=e===!0?"remove":t.isContainer.value!==!0?"add":"";l!==""&&document.body.classList[l]("q-body--drawer-toggle")}function ye(){b!==null&&clearTimeout(b),f.proxy&&f.proxy.$el&&f.proxy.$el.classList.add("q-drawer--mini-animate"),P.value=!0,b=setTimeout(()=>{b=null,P.value=!1,f&&f.proxy&&f.proxy.$el&&f.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function be(e){if(u.value!==!1)return;const l=s.value,r=O(e.distance.x,0,l);if(e.isFinal===!0){r>=Math.min(75,l)===!0?A():(t.animate(),m(0),d(w.value*l)),g.value=!1;return}d((v.lang.rtl===!0?c.value!==!0:c.value)?Math.max(l-r,0):Math.min(0,r-l)),m(O(r/l,0,1)),e.isFirst===!0&&(g.value=!0)}function Y(e){if(u.value!==!0)return;const l=s.value,r=e.direction===a.side,M=(v.lang.rtl===!0?r!==!0:r)?O(e.distance.x,0,l):0;if(e.isFinal===!0){Math.abs(M)<Math.min(75,l)===!0?(t.animate(),m(1),d(0)):B(),g.value=!1;return}d(w.value*M),m(O(1-M/l,0,1)),e.isFirst===!0&&(g.value=!0)}function Q(){L(!1),F(!0)}function h(e,l){t.update(a.side,e,l)}function we(e,l){e.value!==l&&(e.value=l)}function V(e,l){h("size",e===!0?a.miniWidth:l)}return t.instances[a.side]=C,V(a.miniToOverlay,s.value),h("space",T.value),h("offset",_.value),a.showIfAbove===!0&&a.modelValue!==!0&&u.value===!0&&a["onUpdate:modelValue"]!==void 0&&y("update:modelValue",!0),De(()=>{y("onLayout",T.value),y("miniState",x.value),W=a.showIfAbove===!0;const e=()=>{(u.value===!0?U:K)(!1,!0)};if(t.totalWidth.value!==0){Z(e);return}q=o(t.totalWidth,()=>{q(),q=void 0,u.value===!1&&a.showIfAbove===!0&&n.value===!1?A(!1):e()})}),Le(()=>{q!==void 0&&q(),b!==null&&(clearTimeout(b),b=null),u.value===!0&&Q(),t.instances[a.side]===C&&(t.instances[a.side]=void 0,h("size",0),h("offset",0),h("space",!1))}),()=>{const e=[];n.value===!0&&(a.noSwipeOpen===!1&&e.push(We($("div",{key:"open",class:`q-drawer__opener fixed-${a.side}`,"aria-hidden":"true"}),fe.value)),e.push(p("div",{ref:"backdrop",class:ne.value,style:oe.value,"aria-hidden":"true",onClick:B},void 0,"backdrop",a.noSwipeBackdrop!==!0&&u.value===!0,()=>he.value)));const l=x.value===!0&&D.mini!==void 0,r=[$("div",{...R,key:""+l,class:[ve.value,R.class]},l===!0?D.mini():Ae(D.default))];return a.elevated===!0&&u.value===!0&&r.push($("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),e.push(p("aside",{ref:"content",class:ce.value,style:de.value},r,"contentclose",a.noSwipeClose!==!0&&n.value===!0,()=>me.value)),$("div",{class:"q-drawer-container"},e)}}});export{Qe as Q};
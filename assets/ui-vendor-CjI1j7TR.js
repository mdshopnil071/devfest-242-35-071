function Ce(m){return m&&m.__esModule&&Object.prototype.hasOwnProperty.call(m,"default")?m.default:m}var ie={exports:{}},u={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fe;function xe(){if(fe)return u;fe=1;var m=Symbol.for("react.element"),y=Symbol.for("react.portal"),_=Symbol.for("react.fragment"),x=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),E=Symbol.for("react.provider"),O=Symbol.for("react.context"),z=Symbol.for("react.forward_ref"),j=Symbol.for("react.suspense"),F=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),q=Symbol.iterator;function te(e){return e===null||typeof e!="object"?null:(e=q&&e[q]||e["@@iterator"],typeof e=="function"?e:null)}var Z={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},W=Object.assign,X={};function p(e,t,n){this.props=e,this.context=t,this.refs=X,this.updater=n||Z}p.prototype.isReactComponent={},p.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},p.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function J(){}J.prototype=p.prototype;function V(e,t,n){this.props=e,this.context=t,this.refs=X,this.updater=n||Z}var I=V.prototype=new J;I.constructor=V,W(I,p.prototype),I.isPureReactComponent=!0;var K=Array.isArray,G=Object.prototype.hasOwnProperty,H={current:null},Q={key:!0,ref:!0,__self:!0,__source:!0};function Y(e,t,n){var o,c={},i=null,a=null;if(t!=null)for(o in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(i=""+t.key),t)G.call(t,o)&&!Q.hasOwnProperty(o)&&(c[o]=t[o]);var s=arguments.length-2;if(s===1)c.children=n;else if(1<s){for(var l=Array(s),h=0;h<s;h++)l[h]=arguments[h+2];c.children=l}if(e&&e.defaultProps)for(o in s=e.defaultProps,s)c[o]===void 0&&(c[o]=s[o]);return{$$typeof:m,type:e,key:i,ref:a,props:c,_owner:H.current}}function ne(e,t){return{$$typeof:m,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function U(e){return typeof e=="object"&&e!==null&&e.$$typeof===m}function ae(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var ee=/\/+/g;function D(e,t){return typeof e=="object"&&e!==null&&e.key!=null?ae(""+e.key):t.toString(36)}function P(e,t,n,o,c){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(i){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case m:case y:a=!0}}if(a)return a=e,c=c(a),e=o===""?"."+D(a,0):o,K(c)?(n="",e!=null&&(n=e.replace(ee,"$&/")+"/"),P(c,t,n,"",function(h){return h})):c!=null&&(U(c)&&(c=ne(c,n+(!c.key||a&&a.key===c.key?"":(""+c.key).replace(ee,"$&/")+"/")+e)),t.push(c)),1;if(a=0,o=o===""?".":o+":",K(e))for(var s=0;s<e.length;s++){i=e[s];var l=o+D(i,s);a+=P(i,t,n,l,c)}else if(l=te(e),typeof l=="function")for(e=l.call(e),s=0;!(i=e.next()).done;)i=i.value,l=o+D(i,s++),a+=P(i,t,n,l,c);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function N(e,t,n){if(e==null)return e;var o=[],c=0;return P(e,o,"","",function(i){return t.call(n,i,c++)}),o}function re(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var M={current:null},L={transition:null},oe={ReactCurrentDispatcher:M,ReactCurrentBatchConfig:L,ReactCurrentOwner:H};function r(){throw Error("act(...) is not supported in production builds of React.")}return u.Children={map:N,forEach:function(e,t,n){N(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return N(e,function(){t++}),t},toArray:function(e){return N(e,function(t){return t})||[]},only:function(e){if(!U(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},u.Component=p,u.Fragment=_,u.Profiler=S,u.PureComponent=V,u.StrictMode=x,u.Suspense=j,u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=oe,u.act=r,u.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o=W({},e.props),c=e.key,i=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,a=H.current),t.key!==void 0&&(c=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(l in t)G.call(t,l)&&!Q.hasOwnProperty(l)&&(o[l]=t[l]===void 0&&s!==void 0?s[l]:t[l])}var l=arguments.length-2;if(l===1)o.children=n;else if(1<l){s=Array(l);for(var h=0;h<l;h++)s[h]=arguments[h+2];o.children=s}return{$$typeof:m,type:e.type,key:c,ref:i,props:o,_owner:a}},u.createContext=function(e){return e={$$typeof:O,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:E,_context:e},e.Consumer=e},u.createElement=Y,u.createFactory=function(e){var t=Y.bind(null,e);return t.type=e,t},u.createRef=function(){return{current:null}},u.forwardRef=function(e){return{$$typeof:z,render:e}},u.isValidElement=U,u.lazy=function(e){return{$$typeof:T,_payload:{_status:-1,_result:e},_init:re}},u.memo=function(e,t){return{$$typeof:F,type:e,compare:t===void 0?null:t}},u.startTransition=function(e){var t=L.transition;L.transition={};try{e()}finally{L.transition=t}},u.unstable_act=r,u.useCallback=function(e,t){return M.current.useCallback(e,t)},u.useContext=function(e){return M.current.useContext(e)},u.useDebugValue=function(){},u.useDeferredValue=function(e){return M.current.useDeferredValue(e)},u.useEffect=function(e,t){return M.current.useEffect(e,t)},u.useId=function(){return M.current.useId()},u.useImperativeHandle=function(e,t,n){return M.current.useImperativeHandle(e,t,n)},u.useInsertionEffect=function(e,t){return M.current.useInsertionEffect(e,t)},u.useLayoutEffect=function(e,t){return M.current.useLayoutEffect(e,t)},u.useMemo=function(e,t){return M.current.useMemo(e,t)},u.useReducer=function(e,t,n){return M.current.useReducer(e,t,n)},u.useRef=function(e){return M.current.useRef(e)},u.useState=function(e){return M.current.useState(e)},u.useSyncExternalStore=function(e,t,n){return M.current.useSyncExternalStore(e,t,n)},u.useTransition=function(){return M.current.useTransition()},u.version="18.3.1",u}var pe;function Se(){return pe||(pe=1,ie.exports=xe()),ie.exports}var B=Se();const lr=Ce(B);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee=m=>m.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),ye=(...m)=>m.filter((y,_,x)=>!!y&&y.trim()!==""&&x.indexOf(y)===_).join(" ").trim();/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var $e={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re=B.forwardRef(({color:m="currentColor",size:y=24,strokeWidth:_=2,absoluteStrokeWidth:x,className:S="",children:E,iconNode:O,...z},j)=>B.createElement("svg",{ref:j,...$e,width:y,height:y,stroke:m,strokeWidth:x?Number(_)*24/Number(y):_,className:ye("lucide",S),...z},[...O.map(([F,T])=>B.createElement(F,T)),...Array.isArray(E)?E:[E]]));/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=(m,y)=>{const _=B.forwardRef(({className:x,...S},E)=>B.createElement(Re,{ref:E,iconNode:y,className:ye(`lucide-${Ee(m)}`,x),...S}));return _.displayName=`${m}`,_};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],ur=f("BookOpen",Ne);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fe=[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]],hr=f("Building2",Fe);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],dr=f("Calendar",Te);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ie=[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]],fr=f("CheckCheck",Ie);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pe=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],pr=f("Check",Pe);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ae=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],yr=f("CircleAlert",Ae);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oe=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],vr=f("CircleCheckBig",Oe);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const je=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],mr=f("CircleCheck",je);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qe=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],kr=f("CircleHelp",qe);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Le=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],Mr=f("CircleX",Le);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Be=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]],gr=f("Clock",Be);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ze=[["path",{d:"M12 13v8",key:"1l5pq0"}],["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"m8 17 4-4 4 4",key:"1quai1"}]],_r=f("CloudUpload",ze);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ve=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],br=f("Copy",Ve);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const He=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]],wr=f("Download",He);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ue=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],Cr=f("ExternalLink",Ue);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const De=[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m3 15 2 2 4-4",key:"1lhrkk"}]],xr=f("FileCheck2",De);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ze=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m9 15 2 2 4-4",key:"1grp1n"}]],Sr=f("FileCheck",Ze);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const We=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1",key:"1oajmo"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1",key:"mpwhp6"}]],Er=f("FileJson",We);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xe=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]],$r=f("FileSpreadsheet",Xe);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Je=[["path",{d:"M21 7h-3a2 2 0 0 1-2-2V2",key:"9rb54x"}],["path",{d:"M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17Z",key:"1059l0"}],["path",{d:"M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15",key:"16874u"}],["path",{d:"M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11",key:"k2ox98"}]],Rr=f("FileStack",Je);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ke=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],Nr=f("FileText",Ke);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ge=[["path",{d:"m5 8 6 6",key:"1wu5hv"}],["path",{d:"m4 14 6-6 2-3",key:"1k1g8d"}],["path",{d:"M2 5h12",key:"or177f"}],["path",{d:"M7 2h1",key:"1t2jsx"}],["path",{d:"m22 22-5-10-5 10",key:"don7ne"}],["path",{d:"M14 18h6",key:"1m8k6r"}]],Fr=f("Languages",Ge);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qe=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],Tr=f("Layers",Qe);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ye=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],Ir=f("LoaderCircle",Ye);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const er=[["path",{d:"M12 16h.01",key:"1drbdi"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",key:"1fd625"}]],Pr=f("OctagonAlert",er);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rr=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],Ar=f("RotateCcw",rr);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tr=[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]],Or=f("Sparkles",tr);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nr=[["path",{d:"M5 22h14",key:"ehvnwv"}],["path",{d:"M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z",key:"1sy9ra"}],["path",{d:"M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-3-3c-1.66 0-3 1-3 3s1 2 1 3.5V13",key:"cnxgux"}]],jr=f("Stamp",nr);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ar=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],qr=f("Trash2",ar);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const or=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]],Lr=f("Upload",or);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cr=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["polyline",{points:"16 11 18 13 22 9",key:"1pwet4"}]],Br=f("UserCheck",cr);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ir=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],zr=f("X",ir);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sr=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],Vr=f("Zap",sr);var se={};(function m(y,_,x,S){var E=!!(y.Worker&&y.Blob&&y.Promise&&y.OffscreenCanvas&&y.OffscreenCanvasRenderingContext2D&&y.HTMLCanvasElement&&y.HTMLCanvasElement.prototype.transferControlToOffscreen&&y.URL&&y.URL.createObjectURL),O=typeof Path2D=="function"&&typeof DOMMatrix=="function",z=(function(){if(!y.OffscreenCanvas)return!1;try{var r=new OffscreenCanvas(1,1),e=r.getContext("2d");e.fillRect(0,0,1,1);var t=r.transferToImageBitmap();e.createPattern(t,"no-repeat")}catch{return!1}return!0})();function j(){}function F(r){var e=_.exports.Promise,t=e!==void 0?e:y.Promise;return typeof t=="function"?new t(r):(r(j,j),null)}var T=(function(r,e){return{transform:function(t){if(r)return t;if(e.has(t))return e.get(t);var n=new OffscreenCanvas(t.width,t.height),o=n.getContext("2d");return o.drawImage(t,0,0),e.set(t,n),n},clear:function(){e.clear()}}})(z,new Map),q=(function(){var r=Math.floor(16.666666666666668),e,t,n={},o=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(e=function(c){var i=Math.random();return n[i]=requestAnimationFrame(function a(s){o===s||o+r-1<s?(o=s,delete n[i],c()):n[i]=requestAnimationFrame(a)}),i},t=function(c){n[c]&&cancelAnimationFrame(n[c])}):(e=function(c){return setTimeout(c,r)},t=function(c){return clearTimeout(c)}),{frame:e,cancel:t}})(),te=(function(){var r,e,t={};function n(o){function c(i,a){o.postMessage({options:i||{},callback:a})}o.init=function(a){var s=a.transferControlToOffscreen();o.postMessage({canvas:s},[s])},o.fire=function(a,s,l){if(e)return c(a,null),e;var h=Math.random().toString(36).slice(2);return e=F(function(v){function k(g){g.data.callback===h&&(delete t[h],o.removeEventListener("message",k),e=null,T.clear(),l(),v())}o.addEventListener("message",k),c(a,h),t[h]=k.bind(null,{data:{callback:h}})}),e},o.reset=function(){o.postMessage({reset:!0});for(var a in t)t[a](),delete t[a]}}return function(){if(r)return r;if(!x&&E){var o=["var CONFETTI, SIZE = {}, module = {};","("+m.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{r=new Worker(URL.createObjectURL(new Blob([o])))}catch(c){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",c),null}n(r)}return r}})(),Z={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function W(r,e){return e?e(r):r}function X(r){return r!=null}function p(r,e,t){return W(r&&X(r[e])?r[e]:Z[e],t)}function J(r){return r<0?0:Math.floor(r)}function V(r,e){return Math.floor(Math.random()*(e-r))+r}function I(r){return parseInt(r,16)}function K(r){return r.map(G)}function G(r){var e=String(r).replace(/[^0-9a-f]/gi,"");return e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),{r:I(e.substring(0,2)),g:I(e.substring(2,4)),b:I(e.substring(4,6))}}function H(r){var e=p(r,"origin",Object);return e.x=p(e,"x",Number),e.y=p(e,"y",Number),e}function Q(r){r.width=document.documentElement.clientWidth,r.height=document.documentElement.clientHeight}function Y(r){var e=r.getBoundingClientRect();r.width=e.width,r.height=e.height}function ne(r){var e=document.createElement("canvas");return e.style.position="fixed",e.style.top="0px",e.style.left="0px",e.style.pointerEvents="none",e.style.zIndex=r,e}function U(r,e,t,n,o,c,i,a,s){r.save(),r.translate(e,t),r.rotate(c),r.scale(n,o),r.arc(0,0,1,i,a,s),r.restore()}function ae(r){var e=r.angle*(Math.PI/180),t=r.spread*(Math.PI/180);return{x:r.x,y:r.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:r.startVelocity*.5+Math.random()*r.startVelocity,angle2D:-e+(.5*t-Math.random()*t),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:r.color,shape:r.shape,tick:0,totalTicks:r.ticks,decay:r.decay,drift:r.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:r.gravity*3,ovalScalar:.6,scalar:r.scalar,flat:r.flat}}function ee(r,e){e.x+=Math.cos(e.angle2D)*e.velocity+e.drift,e.y+=Math.sin(e.angle2D)*e.velocity+e.gravity,e.velocity*=e.decay,e.flat?(e.wobble=0,e.wobbleX=e.x+10*e.scalar,e.wobbleY=e.y+10*e.scalar,e.tiltSin=0,e.tiltCos=0,e.random=1):(e.wobble+=e.wobbleSpeed,e.wobbleX=e.x+10*e.scalar*Math.cos(e.wobble),e.wobbleY=e.y+10*e.scalar*Math.sin(e.wobble),e.tiltAngle+=.1,e.tiltSin=Math.sin(e.tiltAngle),e.tiltCos=Math.cos(e.tiltAngle),e.random=Math.random()+2);var t=e.tick++/e.totalTicks,n=e.x+e.random*e.tiltCos,o=e.y+e.random*e.tiltSin,c=e.wobbleX+e.random*e.tiltCos,i=e.wobbleY+e.random*e.tiltSin;if(r.fillStyle="rgba("+e.color.r+", "+e.color.g+", "+e.color.b+", "+(1-t)+")",r.beginPath(),O&&e.shape.type==="path"&&typeof e.shape.path=="string"&&Array.isArray(e.shape.matrix))r.fill(M(e.shape.path,e.shape.matrix,e.x,e.y,Math.abs(c-n)*.1,Math.abs(i-o)*.1,Math.PI/10*e.wobble));else if(e.shape.type==="bitmap"){var a=Math.PI/10*e.wobble,s=Math.abs(c-n)*.1,l=Math.abs(i-o)*.1,h=e.shape.bitmap.width*e.scalar,v=e.shape.bitmap.height*e.scalar,k=new DOMMatrix([Math.cos(a)*s,Math.sin(a)*s,-Math.sin(a)*l,Math.cos(a)*l,e.x,e.y]);k.multiplySelf(new DOMMatrix(e.shape.matrix));var g=r.createPattern(T.transform(e.shape.bitmap),"no-repeat");g.setTransform(k),r.globalAlpha=1-t,r.fillStyle=g,r.fillRect(e.x-h/2,e.y-v/2,h,v),r.globalAlpha=1}else if(e.shape==="circle")r.ellipse?r.ellipse(e.x,e.y,Math.abs(c-n)*e.ovalScalar,Math.abs(i-o)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI):U(r,e.x,e.y,Math.abs(c-n)*e.ovalScalar,Math.abs(i-o)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI);else if(e.shape==="star")for(var d=Math.PI/2*3,b=4*e.scalar,w=8*e.scalar,C=e.x,R=e.y,A=5,$=Math.PI/A;A--;)C=e.x+Math.cos(d)*w,R=e.y+Math.sin(d)*w,r.lineTo(C,R),d+=$,C=e.x+Math.cos(d)*b,R=e.y+Math.sin(d)*b,r.lineTo(C,R),d+=$;else r.moveTo(Math.floor(e.x),Math.floor(e.y)),r.lineTo(Math.floor(e.wobbleX),Math.floor(o)),r.lineTo(Math.floor(c),Math.floor(i)),r.lineTo(Math.floor(n),Math.floor(e.wobbleY));return r.closePath(),r.fill(),e.tick<e.totalTicks}function D(r,e,t,n,o){var c=e.slice(),i=r.getContext("2d"),a,s,l=F(function(h){function v(){a=s=null,i.clearRect(0,0,n.width,n.height),T.clear(),o(),h()}function k(){x&&!(n.width===S.width&&n.height===S.height)&&(n.width=r.width=S.width,n.height=r.height=S.height),!n.width&&!n.height&&(t(r),n.width=r.width,n.height=r.height),i.clearRect(0,0,n.width,n.height),c=c.filter(function(g){return ee(i,g)}),c.length?a=q.frame(k):v()}a=q.frame(k),s=v});return{addFettis:function(h){return c=c.concat(h),l},canvas:r,promise:l,reset:function(){a&&q.cancel(a),s&&s()}}}function P(r,e){var t=!r,n=!!p(e||{},"resize"),o=!1,c=p(e,"disableForReducedMotion",Boolean),i=E&&!!p(e||{},"useWorker"),a=i?te():null,s=t?Q:Y,l=r&&a?!!r.__confetti_initialized:!1,h=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,v;function k(d,b,w){for(var C=p(d,"particleCount",J),R=p(d,"angle",Number),A=p(d,"spread",Number),$=p(d,"startVelocity",Number),ve=p(d,"decay",Number),me=p(d,"gravity",Number),ke=p(d,"drift",Number),le=p(d,"colors",K),Me=p(d,"ticks",Number),ue=p(d,"shapes"),ge=p(d,"scalar"),_e=!!p(d,"flat"),he=H(d),de=C,ce=[],be=r.width*he.x,we=r.height*he.y;de--;)ce.push(ae({x:be,y:we,angle:R,spread:A,startVelocity:$,color:le[de%le.length],shape:ue[V(0,ue.length)],ticks:Me,decay:ve,gravity:me,drift:ke,scalar:ge,flat:_e}));return v?v.addFettis(ce):(v=D(r,ce,s,b,w),v.promise)}function g(d){var b=c||p(d,"disableForReducedMotion",Boolean),w=p(d,"zIndex",Number);if(b&&h)return F(function($){$()});t&&v?r=v.canvas:t&&!r&&(r=ne(w),document.body.appendChild(r)),n&&!l&&s(r);var C={width:r.width,height:r.height};a&&!l&&a.init(r),l=!0,a&&(r.__confetti_initialized=!0);function R(){if(a){var $={getBoundingClientRect:function(){if(!t)return r.getBoundingClientRect()}};s($),a.postMessage({resize:{width:$.width,height:$.height}});return}C.width=C.height=null}function A(){v=null,n&&(o=!1,y.removeEventListener("resize",R)),t&&r&&(document.body.contains(r)&&document.body.removeChild(r),r=null,l=!1)}return n&&!o&&(o=!0,y.addEventListener("resize",R,!1)),a?a.fire(d,C,A):k(d,C,A)}return g.reset=function(){a&&a.reset(),v&&v.reset()},g}var N;function re(){return N||(N=P(null,{useWorker:!0,resize:!0})),N}function M(r,e,t,n,o,c,i){var a=new Path2D(r),s=new Path2D;s.addPath(a,new DOMMatrix(e));var l=new Path2D;return l.addPath(s,new DOMMatrix([Math.cos(i)*o,Math.sin(i)*o,-Math.sin(i)*c,Math.cos(i)*c,t,n])),l}function L(r){if(!O)throw new Error("path confetti are not supported in this browser");var e,t;typeof r=="string"?e=r:(e=r.path,t=r.matrix);var n=new Path2D(e),o=document.createElement("canvas"),c=o.getContext("2d");if(!t){for(var i=1e3,a=i,s=i,l=0,h=0,v,k,g=0;g<i;g+=2)for(var d=0;d<i;d+=2)c.isPointInPath(n,g,d,"nonzero")&&(a=Math.min(a,g),s=Math.min(s,d),l=Math.max(l,g),h=Math.max(h,d));v=l-a,k=h-s;var b=10,w=Math.min(b/v,b/k);t=[w,0,0,w,-Math.round(v/2+a)*w,-Math.round(k/2+s)*w]}return{type:"path",path:e,matrix:t}}function oe(r){var e,t=1,n="#000000",o='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof r=="string"?e=r:(e=r.text,t="scalar"in r?r.scalar:t,o="fontFamily"in r?r.fontFamily:o,n="color"in r?r.color:n);var c=10*t,i=""+c+"px "+o,a=new OffscreenCanvas(c,c),s=a.getContext("2d");s.font=i;var l=s.measureText(e),h=Math.ceil(l.actualBoundingBoxRight+l.actualBoundingBoxLeft),v=Math.ceil(l.actualBoundingBoxAscent+l.actualBoundingBoxDescent),k=2,g=l.actualBoundingBoxLeft+k,d=l.actualBoundingBoxAscent+k;h+=k+k,v+=k+k,a=new OffscreenCanvas(h,v),s=a.getContext("2d"),s.font=i,s.fillStyle=n,s.fillText(e,g,d);var b=1/t;return{type:"bitmap",bitmap:a.transferToImageBitmap(),matrix:[b,0,0,b,-h*b/2,-v*b/2]}}_.exports=function(){return re().apply(this,arguments)},_.exports.reset=function(){re().reset()},_.exports.create=P,_.exports.shapeFromPath=L,_.exports.shapeFromText=oe})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),se,!1);const Hr=se.exports;se.exports.create;export{hr as B,fr as C,wr as D,Cr as E,Rr as F,Fr as L,Pr as O,Ar as R,Or as S,qr as T,Br as U,zr as X,Vr as Z,dr as a,Tr as b,Sr as c,B as d,Er as e,yr as f,Ce as g,_r as h,Nr as i,Lr as j,br as k,$r as l,jr as m,kr as n,gr as o,Mr as p,mr as q,Se as r,vr as s,ur as t,Ir as u,xr as v,Hr as w,pr as x,lr as y};

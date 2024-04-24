var Dr=Object.defineProperty;var Ur=(e,r,t)=>r in e?Dr(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t;var I=(e,r,t)=>(Ur(e,typeof r!="symbol"?r+"":r,t),t);import{d as Mr,_ as ve}from"../static/preload-helper-D58fUZad.js";import{g as de,c as M}from"../static/commonjsHelpers-DZNb-E5g.js";function F(e){if(typeof e!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}function xe(e,r){for(var t="",n=0,a=-1,o=0,i,s=0;s<=e.length;++s){if(s<e.length)i=e.charCodeAt(s);else{if(i===47)break;i=47}if(i===47){if(!(a===s-1||o===1))if(a!==s-1&&o===2){if(t.length<2||n!==2||t.charCodeAt(t.length-1)!==46||t.charCodeAt(t.length-2)!==46){if(t.length>2){var c=t.lastIndexOf("/");if(c!==t.length-1){c===-1?(t="",n=0):(t=t.slice(0,c),n=t.length-1-t.lastIndexOf("/")),a=s,o=0;continue}}else if(t.length===2||t.length===1){t="",n=0,a=s,o=0;continue}}r&&(t.length>0?t+="/..":t="..",n=2)}else t.length>0?t+="/"+e.slice(a+1,s):t=e.slice(a+1,s),n=s-a-1;a=s,o=0}else i===46&&o!==-1?++o:o=-1}return t}function Hr(e,r){var t=r.dir||r.root,n=r.base||(r.name||"")+(r.ext||"");return t?t===r.root?t+n:t+e+n:n}var B={resolve:function(){for(var r="",t=!1,n,a=arguments.length-1;a>=-1&&!t;a--){var o;a>=0?o=arguments[a]:(n===void 0&&(n=Mr.process.cwd()),o=n),F(o),o.length!==0&&(r=o+"/"+r,t=o.charCodeAt(0)===47)}return r=xe(r,!t),t?r.length>0?"/"+r:"/":r.length>0?r:"."},normalize:function(r){if(F(r),r.length===0)return".";var t=r.charCodeAt(0)===47,n=r.charCodeAt(r.length-1)===47;return r=xe(r,!t),r.length===0&&!t&&(r="."),r.length>0&&n&&(r+="/"),t?"/"+r:r},isAbsolute:function(r){return F(r),r.length>0&&r.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var r,t=0;t<arguments.length;++t){var n=arguments[t];F(n),n.length>0&&(r===void 0?r=n:r+="/"+n)}return r===void 0?".":B.normalize(r)},relative:function(r,t){if(F(r),F(t),r===t||(r=B.resolve(r),t=B.resolve(t),r===t))return"";for(var n=1;n<r.length&&r.charCodeAt(n)===47;++n);for(var a=r.length,o=a-n,i=1;i<t.length&&t.charCodeAt(i)===47;++i);for(var s=t.length,c=s-i,l=o<c?o:c,v=-1,d=0;d<=l;++d){if(d===l){if(c>l){if(t.charCodeAt(i+d)===47)return t.slice(i+d+1);if(d===0)return t.slice(i+d)}else o>l&&(r.charCodeAt(n+d)===47?v=d:d===0&&(v=0));break}var C=r.charCodeAt(n+d),E=t.charCodeAt(i+d);if(C!==E)break;C===47&&(v=d)}var j="";for(d=n+v+1;d<=a;++d)(d===a||r.charCodeAt(d)===47)&&(j.length===0?j+="..":j+="/..");return j.length>0?j+t.slice(i+v):(i+=v,t.charCodeAt(i)===47&&++i,t.slice(i))},_makeLong:function(r){return r},dirname:function(r){if(F(r),r.length===0)return".";for(var t=r.charCodeAt(0),n=t===47,a=-1,o=!0,i=r.length-1;i>=1;--i)if(t=r.charCodeAt(i),t===47){if(!o){a=i;break}}else o=!1;return a===-1?n?"/":".":n&&a===1?"//":r.slice(0,a)},basename:function(r,t){if(t!==void 0&&typeof t!="string")throw new TypeError('"ext" argument must be a string');F(r);var n=0,a=-1,o=!0,i;if(t!==void 0&&t.length>0&&t.length<=r.length){if(t.length===r.length&&t===r)return"";var s=t.length-1,c=-1;for(i=r.length-1;i>=0;--i){var l=r.charCodeAt(i);if(l===47){if(!o){n=i+1;break}}else c===-1&&(o=!1,c=i+1),s>=0&&(l===t.charCodeAt(s)?--s===-1&&(a=i):(s=-1,a=c))}return n===a?a=c:a===-1&&(a=r.length),r.slice(n,a)}else{for(i=r.length-1;i>=0;--i)if(r.charCodeAt(i)===47){if(!o){n=i+1;break}}else a===-1&&(o=!1,a=i+1);return a===-1?"":r.slice(n,a)}},extname:function(r){F(r);for(var t=-1,n=0,a=-1,o=!0,i=0,s=r.length-1;s>=0;--s){var c=r.charCodeAt(s);if(c===47){if(!o){n=s+1;break}continue}a===-1&&(o=!1,a=s+1),c===46?t===-1?t=s:i!==1&&(i=1):t!==-1&&(i=-1)}return t===-1||a===-1||i===0||i===1&&t===a-1&&t===n+1?"":r.slice(t,a)},format:function(r){if(r===null||typeof r!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof r);return Hr("/",r)},parse:function(r){F(r);var t={root:"",dir:"",base:"",ext:"",name:""};if(r.length===0)return t;var n=r.charCodeAt(0),a=n===47,o;a?(t.root="/",o=1):o=0;for(var i=-1,s=0,c=-1,l=!0,v=r.length-1,d=0;v>=o;--v){if(n=r.charCodeAt(v),n===47){if(!l){s=v+1;break}continue}c===-1&&(l=!1,c=v+1),n===46?i===-1?i=v:d!==1&&(d=1):i!==-1&&(d=-1)}return i===-1||c===-1||d===0||d===1&&i===c-1&&i===s+1?c!==-1&&(s===0&&a?t.base=t.name=r.slice(1,c):t.base=t.name=r.slice(s,c)):(s===0&&a?(t.name=r.slice(1,i),t.base=r.slice(1,c)):(t.name=r.slice(s,i),t.base=r.slice(s,c)),t.ext=r.slice(i,c)),s>0?t.dir=r.slice(0,s-1):a&&(t.dir="/"),t},sep:"/",delimiter:":",win32:null,posix:null};B.posix=B;var Gr=B;const T=de(Gr);function Br(){this.__data__=[],this.size=0}var Nr=Br;function zr(e,r){return e===r||e!==e&&r!==r}var te=zr,kr=te;function Vr(e,r){for(var t=e.length;t--;)if(kr(e[t][0],r))return t;return-1}var ne=Vr,Kr=ne,qr=Array.prototype,Jr=qr.splice;function Wr(e){var r=this.__data__,t=Kr(r,e);if(t<0)return!1;var n=r.length-1;return t==n?r.pop():Jr.call(r,t,1),--this.size,!0}var Yr=Wr,Xr=ne;function Zr(e){var r=this.__data__,t=Xr(r,e);return t<0?void 0:r[t][1]}var Qr=Zr,et=ne;function rt(e){return et(this.__data__,e)>-1}var tt=rt,nt=ne;function at(e,r){var t=this.__data__,n=nt(t,e);return n<0?(++this.size,t.push([e,r])):t[n][1]=r,this}var it=at,st=Nr,ot=Yr,ct=Qr,ft=tt,ut=it;function N(e){var r=-1,t=e==null?0:e.length;for(this.clear();++r<t;){var n=e[r];this.set(n[0],n[1])}}N.prototype.clear=st;N.prototype.delete=ot;N.prototype.get=ct;N.prototype.has=ft;N.prototype.set=ut;var ae=N,lt=ae;function vt(){this.__data__=new lt,this.size=0}var dt=vt;function gt(e){var r=this.__data__,t=r.delete(e);return this.size=r.size,t}var ht=gt;function pt(e){return this.__data__.get(e)}var _t=pt;function bt(e){return this.__data__.has(e)}var yt=bt,$t=typeof M=="object"&&M&&M.Object===Object&&M,rr=$t,mt=rr,Tt=typeof self=="object"&&self&&self.Object===Object&&self,wt=mt||Tt||Function("return this")(),z=wt,At=z,Ct=At.Symbol,tr=Ct,Pe=tr,nr=Object.prototype,jt=nr.hasOwnProperty,Ot=nr.toString,J=Pe?Pe.toStringTag:void 0;function xt(e){var r=jt.call(e,J),t=e[J];try{e[J]=void 0;var n=!0}catch{}var a=Ot.call(e);return n&&(r?e[J]=t:delete e[J]),a}var Pt=xt,St=Object.prototype,It=St.toString;function Ft(e){return It.call(e)}var Rt=Ft,Se=tr,Et=Pt,Lt=Rt,Dt="[object Null]",Ut="[object Undefined]",Ie=Se?Se.toStringTag:void 0;function Mt(e){return e==null?e===void 0?Ut:Dt:Ie&&Ie in Object(e)?Et(e):Lt(e)}var ie=Mt;function Ht(e){var r=typeof e;return e!=null&&(r=="object"||r=="function")}var H=Ht,Gt=ie,Bt=H,Nt="[object AsyncFunction]",zt="[object Function]",kt="[object GeneratorFunction]",Vt="[object Proxy]";function Kt(e){if(!Bt(e))return!1;var r=Gt(e);return r==zt||r==kt||r==Nt||r==Vt}var ge=Kt,qt=z,Jt=qt["__core-js_shared__"],Wt=Jt,ue=Wt,Fe=function(){var e=/[^.]+$/.exec(ue&&ue.keys&&ue.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();function Yt(e){return!!Fe&&Fe in e}var Xt=Yt,Zt=Function.prototype,Qt=Zt.toString;function en(e){if(e!=null){try{return Qt.call(e)}catch{}try{return e+""}catch{}}return""}var rn=en,tn=ge,nn=Xt,an=H,sn=rn,on=/[\\^$.*+?()[\]{}|]/g,cn=/^\[object .+?Constructor\]$/,fn=Function.prototype,un=Object.prototype,ln=fn.toString,vn=un.hasOwnProperty,dn=RegExp("^"+ln.call(vn).replace(on,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function gn(e){if(!an(e)||nn(e))return!1;var r=tn(e)?dn:cn;return r.test(sn(e))}var hn=gn;function pn(e,r){return e==null?void 0:e[r]}var _n=pn,bn=hn,yn=_n;function $n(e,r){var t=yn(e,r);return bn(t)?t:void 0}var he=$n,mn=he,Tn=z,wn=mn(Tn,"Map"),ar=wn,An=he,Cn=An(Object,"create"),se=Cn,Re=se;function jn(){this.__data__=Re?Re(null):{},this.size=0}var On=jn;function xn(e){var r=this.has(e)&&delete this.__data__[e];return this.size-=r?1:0,r}var Pn=xn,Sn=se,In="__lodash_hash_undefined__",Fn=Object.prototype,Rn=Fn.hasOwnProperty;function En(e){var r=this.__data__;if(Sn){var t=r[e];return t===In?void 0:t}return Rn.call(r,e)?r[e]:void 0}var Ln=En,Dn=se,Un=Object.prototype,Mn=Un.hasOwnProperty;function Hn(e){var r=this.__data__;return Dn?r[e]!==void 0:Mn.call(r,e)}var Gn=Hn,Bn=se,Nn="__lodash_hash_undefined__";function zn(e,r){var t=this.__data__;return this.size+=this.has(e)?0:1,t[e]=Bn&&r===void 0?Nn:r,this}var kn=zn,Vn=On,Kn=Pn,qn=Ln,Jn=Gn,Wn=kn;function k(e){var r=-1,t=e==null?0:e.length;for(this.clear();++r<t;){var n=e[r];this.set(n[0],n[1])}}k.prototype.clear=Vn;k.prototype.delete=Kn;k.prototype.get=qn;k.prototype.has=Jn;k.prototype.set=Wn;var Yn=k,Ee=Yn,Xn=ae,Zn=ar;function Qn(){this.size=0,this.__data__={hash:new Ee,map:new(Zn||Xn),string:new Ee}}var ea=Qn;function ra(e){var r=typeof e;return r=="string"||r=="number"||r=="symbol"||r=="boolean"?e!=="__proto__":e===null}var ta=ra,na=ta;function aa(e,r){var t=e.__data__;return na(r)?t[typeof r=="string"?"string":"hash"]:t.map}var oe=aa,ia=oe;function sa(e){var r=ia(this,e).delete(e);return this.size-=r?1:0,r}var oa=sa,ca=oe;function fa(e){return ca(this,e).get(e)}var ua=fa,la=oe;function va(e){return la(this,e).has(e)}var da=va,ga=oe;function ha(e,r){var t=ga(this,e),n=t.size;return t.set(e,r),this.size+=t.size==n?0:1,this}var pa=ha,_a=ea,ba=oa,ya=ua,$a=da,ma=pa;function V(e){var r=-1,t=e==null?0:e.length;for(this.clear();++r<t;){var n=e[r];this.set(n[0],n[1])}}V.prototype.clear=_a;V.prototype.delete=ba;V.prototype.get=ya;V.prototype.has=$a;V.prototype.set=ma;var Ta=V,wa=ae,Aa=ar,Ca=Ta,ja=200;function Oa(e,r){var t=this.__data__;if(t instanceof wa){var n=t.__data__;if(!Aa||n.length<ja-1)return n.push([e,r]),this.size=++t.size,this;t=this.__data__=new Ca(n)}return t.set(e,r),this.size=t.size,this}var xa=Oa,Pa=ae,Sa=dt,Ia=ht,Fa=_t,Ra=yt,Ea=xa;function K(e){var r=this.__data__=new Pa(e);this.size=r.size}K.prototype.clear=Sa;K.prototype.delete=Ia;K.prototype.get=Fa;K.prototype.has=Ra;K.prototype.set=Ea;var La=K,Da=he,Ua=function(){try{var e=Da(Object,"defineProperty");return e({},"",{}),e}catch{}}(),ir=Ua,Le=ir;function Ma(e,r,t){r=="__proto__"&&Le?Le(e,r,{configurable:!0,enumerable:!0,value:t,writable:!0}):e[r]=t}var pe=Ma,Ha=pe,Ga=te;function Ba(e,r,t){(t!==void 0&&!Ga(e[r],t)||t===void 0&&!(r in e))&&Ha(e,r,t)}var sr=Ba;function Na(e){return function(r,t,n){for(var a=-1,o=Object(r),i=n(r),s=i.length;s--;){var c=i[e?s:++a];if(t(o[c],c,o)===!1)break}return r}}var za=Na,ka=za,Va=ka(),Ka=Va,X={exports:{}};X.exports;(function(e,r){var t=z,n=r&&!r.nodeType&&r,a=n&&!0&&e&&!e.nodeType&&e,o=a&&a.exports===n,i=o?t.Buffer:void 0,s=i?i.allocUnsafe:void 0;function c(l,v){if(v)return l.slice();var d=l.length,C=s?s(d):new l.constructor(d);return l.copy(C),C}e.exports=c})(X,X.exports);var qa=X.exports,Ja=z,Wa=Ja.Uint8Array,Ya=Wa,De=Ya;function Xa(e){var r=new e.constructor(e.byteLength);return new De(r).set(new De(e)),r}var Za=Xa,Qa=Za;function ei(e,r){var t=r?Qa(e.buffer):e.buffer;return new e.constructor(t,e.byteOffset,e.length)}var ri=ei;function ti(e,r){var t=-1,n=e.length;for(r||(r=Array(n));++t<n;)r[t]=e[t];return r}var ni=ti,ai=H,Ue=Object.create,ii=function(){function e(){}return function(r){if(!ai(r))return{};if(Ue)return Ue(r);e.prototype=r;var t=new e;return e.prototype=void 0,t}}(),si=ii;function oi(e,r){return function(t){return e(r(t))}}var ci=oi,fi=ci,ui=fi(Object.getPrototypeOf,Object),or=ui,li=Object.prototype;function vi(e){var r=e&&e.constructor,t=typeof r=="function"&&r.prototype||li;return e===t}var cr=vi,di=si,gi=or,hi=cr;function pi(e){return typeof e.constructor=="function"&&!hi(e)?di(gi(e)):{}}var _i=pi;function bi(e){return e!=null&&typeof e=="object"}var W=bi,yi=ie,$i=W,mi="[object Arguments]";function Ti(e){return $i(e)&&yi(e)==mi}var wi=Ti,Me=wi,Ai=W,fr=Object.prototype,Ci=fr.hasOwnProperty,ji=fr.propertyIsEnumerable,Oi=Me(function(){return arguments}())?Me:function(e){return Ai(e)&&Ci.call(e,"callee")&&!ji.call(e,"callee")},ur=Oi,xi=Array.isArray,lr=xi,Pi=9007199254740991;function Si(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=Pi}var vr=Si,Ii=ge,Fi=vr;function Ri(e){return e!=null&&Fi(e.length)&&!Ii(e)}var _e=Ri,Ei=_e,Li=W;function Di(e){return Li(e)&&Ei(e)}var Ui=Di,Z={exports:{}};function Mi(){return!1}var Hi=Mi;Z.exports;(function(e,r){var t=z,n=Hi,a=r&&!r.nodeType&&r,o=a&&!0&&e&&!e.nodeType&&e,i=o&&o.exports===a,s=i?t.Buffer:void 0,c=s?s.isBuffer:void 0,l=c||n;e.exports=l})(Z,Z.exports);var dr=Z.exports,Gi=ie,Bi=or,Ni=W,zi="[object Object]",ki=Function.prototype,Vi=Object.prototype,gr=ki.toString,Ki=Vi.hasOwnProperty,qi=gr.call(Object);function Ji(e){if(!Ni(e)||Gi(e)!=zi)return!1;var r=Bi(e);if(r===null)return!0;var t=Ki.call(r,"constructor")&&r.constructor;return typeof t=="function"&&t instanceof t&&gr.call(t)==qi}var Wi=Ji,Yi=ie,Xi=vr,Zi=W,Qi="[object Arguments]",es="[object Array]",rs="[object Boolean]",ts="[object Date]",ns="[object Error]",as="[object Function]",is="[object Map]",ss="[object Number]",os="[object Object]",cs="[object RegExp]",fs="[object Set]",us="[object String]",ls="[object WeakMap]",vs="[object ArrayBuffer]",ds="[object DataView]",gs="[object Float32Array]",hs="[object Float64Array]",ps="[object Int8Array]",_s="[object Int16Array]",bs="[object Int32Array]",ys="[object Uint8Array]",$s="[object Uint8ClampedArray]",ms="[object Uint16Array]",Ts="[object Uint32Array]",p={};p[gs]=p[hs]=p[ps]=p[_s]=p[bs]=p[ys]=p[$s]=p[ms]=p[Ts]=!0;p[Qi]=p[es]=p[vs]=p[rs]=p[ds]=p[ts]=p[ns]=p[as]=p[is]=p[ss]=p[os]=p[cs]=p[fs]=p[us]=p[ls]=!1;function ws(e){return Zi(e)&&Xi(e.length)&&!!p[Yi(e)]}var As=ws;function Cs(e){return function(r){return e(r)}}var js=Cs,Q={exports:{}};Q.exports;(function(e,r){var t=rr,n=r&&!r.nodeType&&r,a=n&&!0&&e&&!e.nodeType&&e,o=a&&a.exports===n,i=o&&t.process,s=function(){try{var c=a&&a.require&&a.require("util").types;return c||i&&i.binding&&i.binding("util")}catch{}}();e.exports=s})(Q,Q.exports);var Os=Q.exports,xs=As,Ps=js,He=Os,Ge=He&&He.isTypedArray,Ss=Ge?Ps(Ge):xs,hr=Ss;function Is(e,r){if(!(r==="constructor"&&typeof e[r]=="function")&&r!="__proto__")return e[r]}var pr=Is,Fs=pe,Rs=te,Es=Object.prototype,Ls=Es.hasOwnProperty;function Ds(e,r,t){var n=e[r];(!(Ls.call(e,r)&&Rs(n,t))||t===void 0&&!(r in e))&&Fs(e,r,t)}var Us=Ds,Ms=Us,Hs=pe;function Gs(e,r,t,n){var a=!t;t||(t={});for(var o=-1,i=r.length;++o<i;){var s=r[o],c=n?n(t[s],e[s],s,t,e):void 0;c===void 0&&(c=e[s]),a?Hs(t,s,c):Ms(t,s,c)}return t}var Bs=Gs;function Ns(e,r){for(var t=-1,n=Array(e);++t<e;)n[t]=r(t);return n}var zs=Ns,ks=9007199254740991,Vs=/^(?:0|[1-9]\d*)$/;function Ks(e,r){var t=typeof e;return r=r??ks,!!r&&(t=="number"||t!="symbol"&&Vs.test(e))&&e>-1&&e%1==0&&e<r}var _r=Ks,qs=zs,Js=ur,Ws=lr,Ys=dr,Xs=_r,Zs=hr,Qs=Object.prototype,eo=Qs.hasOwnProperty;function ro(e,r){var t=Ws(e),n=!t&&Js(e),a=!t&&!n&&Ys(e),o=!t&&!n&&!a&&Zs(e),i=t||n||a||o,s=i?qs(e.length,String):[],c=s.length;for(var l in e)(r||eo.call(e,l))&&!(i&&(l=="length"||a&&(l=="offset"||l=="parent")||o&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||Xs(l,c)))&&s.push(l);return s}var to=ro;function no(e){var r=[];if(e!=null)for(var t in Object(e))r.push(t);return r}var ao=no,io=H,so=cr,oo=ao,co=Object.prototype,fo=co.hasOwnProperty;function uo(e){if(!io(e))return oo(e);var r=so(e),t=[];for(var n in e)n=="constructor"&&(r||!fo.call(e,n))||t.push(n);return t}var lo=uo,vo=to,go=lo,ho=_e;function po(e){return ho(e)?vo(e,!0):go(e)}var br=po,_o=Bs,bo=br;function yo(e){return _o(e,bo(e))}var $o=yo,Be=sr,mo=qa,To=ri,wo=ni,Ao=_i,Ne=ur,ze=lr,Co=Ui,jo=dr,Oo=ge,xo=H,Po=Wi,So=hr,ke=pr,Io=$o;function Fo(e,r,t,n,a,o,i){var s=ke(e,t),c=ke(r,t),l=i.get(c);if(l){Be(e,t,l);return}var v=o?o(s,c,t+"",e,r,i):void 0,d=v===void 0;if(d){var C=ze(c),E=!C&&jo(c),j=!C&&!E&&So(c);v=c,C||E||j?ze(s)?v=s:Co(s)?v=wo(s):E?(d=!1,v=mo(c,!0)):j?(d=!1,v=To(c,!0)):v=[]:Po(c)||Ne(c)?(v=s,Ne(s)?v=Io(s):(!xo(s)||Oo(s))&&(v=Ao(c))):d=!1}d&&(i.set(c,v),a(v,c,n,o,i),i.delete(c)),Be(e,t,v)}var Ro=Fo,Eo=La,Lo=sr,Do=Ka,Uo=Ro,Mo=H,Ho=br,Go=pr;function yr(e,r,t,n,a){e!==r&&Do(r,function(o,i){if(a||(a=new Eo),Mo(o))Uo(e,r,i,t,yr,n,a);else{var s=n?n(Go(e,i),o,i+"",e,r,a):void 0;s===void 0&&(s=o),Lo(e,i,s)}},Ho)}var Bo=yr;function No(e){return e}var $r=No;function zo(e,r,t){switch(t.length){case 0:return e.call(r);case 1:return e.call(r,t[0]);case 2:return e.call(r,t[0],t[1]);case 3:return e.call(r,t[0],t[1],t[2])}return e.apply(r,t)}var ko=zo,Vo=ko,Ve=Math.max;function Ko(e,r,t){return r=Ve(r===void 0?e.length-1:r,0),function(){for(var n=arguments,a=-1,o=Ve(n.length-r,0),i=Array(o);++a<o;)i[a]=n[r+a];a=-1;for(var s=Array(r+1);++a<r;)s[a]=n[a];return s[r]=t(i),Vo(e,this,s)}}var qo=Ko;function Jo(e){return function(){return e}}var Wo=Jo,Yo=Wo,Ke=ir,Xo=$r,Zo=Ke?function(e,r){return Ke(e,"toString",{configurable:!0,enumerable:!1,value:Yo(r),writable:!0})}:Xo,Qo=Zo,ec=800,rc=16,tc=Date.now;function nc(e){var r=0,t=0;return function(){var n=tc(),a=rc-(n-t);if(t=n,a>0){if(++r>=ec)return arguments[0]}else r=0;return e.apply(void 0,arguments)}}var ac=nc,ic=Qo,sc=ac,oc=sc(ic),cc=oc,fc=$r,uc=qo,lc=cc;function vc(e,r){return lc(uc(e,r,fc),e+"")}var dc=vc,gc=te,hc=_e,pc=_r,_c=H;function bc(e,r,t){if(!_c(t))return!1;var n=typeof r;return(n=="number"?hc(t)&&pc(r,t.length):n=="string"&&r in t)?gc(t[r],e):!1}var yc=bc,$c=dc,mc=yc;function Tc(e){return $c(function(r,t){var n=-1,a=t.length,o=a>1?t[a-1]:void 0,i=a>2?t[2]:void 0;for(o=e.length>3&&typeof o=="function"?(a--,o):void 0,i&&mc(t[0],t[1],i)&&(o=a<3?void 0:o,a=1),r=Object(r);++n<a;){var s=t[n];s&&e(r,s,n,o)}return r})}var wc=Tc,Ac=Bo,Cc=wc,jc=Cc(function(e,r,t){Ac(e,r,t)}),Oc=jc;const qe=de(Oc);class G{constructor(r){I(this,"path");I(this,"getRelativePath",r=>T.join(".",T.relative(this.path,r)));I(this,"getAbsolutePath",()=>T.resolve(this.path));this.path=r}}var ee={exports:{}};/*! https://mths.be/punycode v1.4.1 by @mathias */ee.exports;(function(e,r){(function(t){var n=r&&!r.nodeType&&r,a=e&&!e.nodeType&&e,o=typeof M=="object"&&M;(o.global===o||o.window===o||o.self===o)&&(t=o);var i,s=2147483647,c=36,l=1,v=26,d=38,C=700,E=72,j=128,ye="-",Pr=/^xn--/,Sr=/[^\x20-\x7E]/,Ir=/[\x2E\u3002\uFF0E\uFF61]/g,Fr={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},ce=c-l,P=Math.floor,q=String.fromCharCode,Y;function D(f){throw new RangeError(Fr[f])}function $e(f,u){for(var g=f.length,_=[];g--;)_[g]=u(f[g]);return _}function me(f,u){var g=f.split("@"),_="";g.length>1&&(_=g[0]+"@",f=g[1]),f=f.replace(Ir,".");var b=f.split("."),m=$e(b,u).join(".");return _+m}function Te(f){for(var u=[],g=0,_=f.length,b,m;g<_;)b=f.charCodeAt(g++),b>=55296&&b<=56319&&g<_?(m=f.charCodeAt(g++),(m&64512)==56320?u.push(((b&1023)<<10)+(m&1023)+65536):(u.push(b),g--)):u.push(b);return u}function we(f){return $e(f,function(u){var g="";return u>65535&&(u-=65536,g+=q(u>>>10&1023|55296),u=56320|u&1023),g+=q(u),g}).join("")}function Rr(f){return f-48<10?f-22:f-65<26?f-65:f-97<26?f-97:c}function Ae(f,u){return f+22+75*(f<26)-((u!=0)<<5)}function Ce(f,u,g){var _=0;for(f=g?P(f/C):f>>1,f+=P(f/u);f>ce*v>>1;_+=c)f=P(f/ce);return P(_+(ce+1)*f/(f+d))}function je(f){var u=[],g=f.length,_,b=0,m=j,y=E,w,O,S,R,$,A,x,L,U;for(w=f.lastIndexOf(ye),w<0&&(w=0),O=0;O<w;++O)f.charCodeAt(O)>=128&&D("not-basic"),u.push(f.charCodeAt(O));for(S=w>0?w+1:0;S<g;){for(R=b,$=1,A=c;S>=g&&D("invalid-input"),x=Rr(f.charCodeAt(S++)),(x>=c||x>P((s-b)/$))&&D("overflow"),b+=x*$,L=A<=y?l:A>=y+v?v:A-y,!(x<L);A+=c)U=c-L,$>P(s/U)&&D("overflow"),$*=U;_=u.length+1,y=Ce(b-R,_,R==0),P(b/_)>s-m&&D("overflow"),m+=P(b/_),b%=_,u.splice(b++,0,m)}return we(u)}function Oe(f){var u,g,_,b,m,y,w,O,S,R,$,A=[],x,L,U,fe;for(f=Te(f),x=f.length,u=j,g=0,m=E,y=0;y<x;++y)$=f[y],$<128&&A.push(q($));for(_=b=A.length,b&&A.push(ye);_<x;){for(w=s,y=0;y<x;++y)$=f[y],$>=u&&$<w&&(w=$);for(L=_+1,w-u>P((s-g)/L)&&D("overflow"),g+=(w-u)*L,u=w,y=0;y<x;++y)if($=f[y],$<u&&++g>s&&D("overflow"),$==u){for(O=g,S=c;R=S<=m?l:S>=m+v?v:S-m,!(O<R);S+=c)fe=O-R,U=c-R,A.push(q(Ae(R+fe%U,0))),O=P(fe/U);A.push(q(Ae(O,0))),m=Ce(g,L,_==b),g=0,++_}++g,++u}return A.join("")}function Er(f){return me(f,function(u){return Pr.test(u)?je(u.slice(4).toLowerCase()):u})}function Lr(f){return me(f,function(u){return Sr.test(u)?"xn--"+Oe(u):u})}if(i={version:"1.4.1",ucs2:{decode:Te,encode:we},decode:je,encode:Oe,toASCII:Lr,toUnicode:Er},n&&a)if(e.exports==n)a.exports=i;else for(Y in i)i.hasOwnProperty(Y)&&(n[Y]=i[Y]);else t.punycode=i})(M)})(ee,ee.exports);ee.exports;function xc(e,r){for(var t=0,n=e.length-1;n>=0;n--){var a=e[n];a==="."?e.splice(n,1):a===".."?(e.splice(n,1),t++):t&&(e.splice(n,1),t--)}if(r)for(;t--;t)e.unshift("..");return e}function Pc(){for(var e="",r=!1,t=arguments.length-1;t>=-1&&!r;t--){var n=t>=0?arguments[t]:"/";if(typeof n!="string")throw new TypeError("Arguments to path.resolve must be strings");if(!n)continue;e=n+"/"+e,r=n.charAt(0)==="/"}return e=xc(Sc(e.split("/"),function(a){return!!a}),!r).join("/"),(r?"/":"")+e||"."}function Sc(e,r){if(e.filter)return e.filter(r);for(var t=[],n=0;n<e.length;n++)r(e[n],n,e)&&t.push(e[n]);return t}var mr=function(e){function r(){var n=this||self;return delete e.prototype.__magic__,n}if(typeof globalThis=="object")return globalThis;if(this)return r();e.defineProperty(e.prototype,"__magic__",{configurable:!0,get:r});var t=__magic__;return t}(Object),Ic=mr.URL;mr.URLSearchParams;var Fc=/%/g,Rc=/\\/g,Ec=/\n/g,Lc=/\r/g,Dc=/\t/g,Uc=47;function Mc(e){return e.includes("%")&&(e=e.replace(Fc,"%25")),e.includes("\\")&&(e=e.replace(Rc,"%5C")),e.includes(`
`)&&(e=e.replace(Ec,"%0A")),e.includes("\r")&&(e=e.replace(Lc,"%0D")),e.includes("	")&&(e=e.replace(Dc,"%09")),e}var Tr=function(r){var t=new Ic("file://"),n=Pc(r),a=r.charCodeAt(r.length-1);return a===Uc&&n[n.length-1]!=="/"&&(n+="/"),t.pathname=Mc(n),t};const wr=async e=>await ve(()=>import(e),[]),Hc=async(e,r)=>{var a;return r===""?e:((a=(await wr(Tr(r).toString())).default.build)==null?void 0:a.assetsDir)??e},Gc=async(e,r)=>r===""?e:(await wr(Tr(r).toString())).default.publicDir||e,Ar="assets",Cr="public",Je={rootFolders:{source:"src",dist:"dist",sitesConfig:"sites-config",functions:"functions"},subfolders:{templates:"templates",serverlessFunctions:"functions",assets:Ar,public:Cr,clientBundle:"client",serverBundle:"server",renderBundle:"render",renderer:"renderer",static:"static",plugin:"plugin"},sitesConfigFiles:{ci:"ci.json",features:"features.json",siteStream:"site-stream.json",serving:"serving.json",sitemap:"sitemap.json",redirects:"redirects.csv",auth:"auth.json"},distConfigFiles:{templates:"templates.json",artifacts:"artifacts.json",functionMetadata:"functionMetadata.json"},rootFiles:{config:"config.yaml"},envVarConfig:{envVarDir:"",envVarPrefix:"YEXT_PUBLIC"}},re=class re{constructor(r){I(this,"config");I(this,"getTemplatePaths",()=>{const r=T.join(this.config.rootFolders.source,this.config.subfolders.templates);return this.config.scope?[new G(T.join(r,this.config.scope)),new G(r)]:[new G(r)]});I(this,"getSitesConfigPath",()=>new G(T.join(this.config.rootFolders.sitesConfig,this.config.scope??"")));I(this,"getScopedDistPath",()=>new G(T.join(this.config.rootFolders.dist,this.config.scope??"")));I(this,"getConfigYamlPath",()=>new G(T.join(this.config.scope??"",this.config.rootFiles.config)));const t=qe(Je,r);this.config=t}};I(re,"init",async r=>{const t=qe(Je,r),n=await Hc(Ar,T.resolve("vite.config.js"));t.subfolders.assets=n;const a=await Gc(Cr,T.resolve("vite.config.js"));return t.subfolders.public=a,new re(t)});let le=re;const Bc=e=>{const r=e.split("/");return r.pop(),r.map(()=>"../").reduce((t,n)=>t+n,"")},We=e=>e.split(T.sep).join(T.posix.sep);var be={exports:{}},h=String,jr=function(){return{isColorSupported:!1,reset:h,bold:h,dim:h,italic:h,underline:h,inverse:h,hidden:h,strikethrough:h,black:h,red:h,green:h,yellow:h,blue:h,magenta:h,cyan:h,white:h,gray:h,bgBlack:h,bgRed:h,bgGreen:h,bgYellow:h,bgBlue:h,bgMagenta:h,bgCyan:h,bgWhite:h}};be.exports=jr();be.exports.createColors=jr;var Nc=be.exports;const zc=de(Nc),kc=e=>`<title>${e.title?e.title:"Yext Pages Site"}</title>
    <meta charset="${e.charset||"UTF-8"}">
    <meta name="viewport" content="${e.viewport||"width=device-width, initial-scale=1"}">
    ${e.tags?e.tags.map(Vc).join(`
`):""}
    ${e.other?e.other:""}`.split(`
`).filter(r=>r.trim()!="").join(`
`),Vc=e=>{switch(e.type){case"base":case"link":case"meta":return`<${e.type} ${Ye(e.attributes)}>`;case"style":case"script":case"noscript":case"template":return`<${e.type} ${Ye(e.attributes)}></${e.type}>`;default:return console.log(zc.yellow(`[WARNING]: Tag type ${e.type} is unsupported by the Tag interface. Please use "other" to render this tag.`)),""}},Ye=e=>Object.keys(e).map(r=>`${r}="${e[r]}"`).join(" "),Kc=(e,r)=>{var t,n;return e!=null&&e.lang?e.lang:(t=r==null?void 0:r.document)!=null&&t.locale?(n=r==null?void 0:r.document)==null?void 0:n.locale:"en"},qc=(e,r,t)=>{const n=Xe(We(r)),a=Xe(We(e));return`
        const componentURL = new URL("${n}", import.meta.url)
        const component = await import(componentURL);

        const renderURL = new URL("${a}", import.meta.url)
        const render = await import(renderURL);

        render.render(
        {
            Page: component.default,
            pageProps: ${Jc(t)},
        }
        );
    `},Jc=e=>`JSON.parse(decodeURIComponent("${encodeURIComponent(JSON.stringify(e))}"))`,Xe=e=>e.startsWith("/")?e:"/"+e,Wc=(e,r,t,n)=>(r=r.replace("<!--app-lang-->",t),e&&(r=Qc(r,`<script type="module">${e}<\/script>`)),n&&(r=xr(r,kc(n))),r),Yc=(e,r,t,n,a,o)=>{let i=Wc(e,r,a,o);return i=xr(i,Xc(t,n)),i},Xc=(e,r)=>Array.from(Or(e,r,new Set)).map(t=>`<link rel="stylesheet" href="/${t}"/>`).join(`
`),Or=(e,r,t)=>{const n=structuredClone(Object.entries(r).find(([s])=>s===e));if(!n)return new Set;const[a,o]=n;t.add(a);const i=new Set(o.css);return(o.imports||[]).flatMap(s=>Array.from(Or(s,r,t))).forEach(s=>i.add(s)),i},Ze="<head>",xr=(e,r)=>{let t=e.indexOf(Ze);if(t===-1)throw new Error("_server.tsx: No head tag is defined");return t+=Ze.length,e.slice(0,t)+r+e.slice(t)},Zc="</head>",Qc=(e,r)=>{const t=e.indexOf(Zc);if(t===-1)throw new Error("_server.tsx: No head tag is defined");return e.slice(0,t)+r+e.slice(t)},ef=async(e,r,t,n,a,o)=>{if(!a)throw new Error("Manifest is undefined");const i=r.getHeadConfig?r.getHeadConfig(e):void 0,s=T.join(o.getTemplatePaths()[0].path,`${r.templateName}.tsx`);let c;t&&(c=qc(n.client,a.clientPaths[r.templateName],e));const l=await n.server.render({Page:r.default,pageProps:e}),v=n.server.indexHtml.replace(n.server.replacementTag,l);return Yc(c,v,s,a.bundlerManifest,Kc(i,e),i)},rf=e=>{if(tf(e.filename,e.config),!e.getPath)throw new Error(`Template ${e.filename} is missing an exported getPath function.`);if(!e.default&&!e.render)throw new Error(`Template ${e.filename} does not have the necessary exports to produce page. A module should either have a React component as a default export or a render function.`)},tf=(e,r)=>{if(!r.name)throw new Error(`Template ${e} is missing a "name" in the config function.`);if(r.streamId&&r.stream)throw new Error(`Template ${e} must not define both a "streamId" and a "stream".`)},nf=(e,r)=>{let t=e.split(T.sep)[e.split(T.sep).length-1];const n=t.slice(t.lastIndexOf("."));let a=t.slice(0,t.lastIndexOf("."));return r&&(t=t.split(n)[0].slice(0,t.split(n)[0].lastIndexOf("."))+n,a=a.slice(0,a.lastIndexOf("."))),{base:t,name:a}},af=(e,r)=>!e&&(!r||!r.$id),sf=(e,r,t)=>{const n=nf(e,t),a={...r,config:of(n.name,r.config),path:e,filename:n.base,templateName:n.name};return rf(a),a},of=(e,r)=>{const t=cf(r==null?void 0:r.stream);return{name:(r==null?void 0:r.name)??e,hydrate:(r==null?void 0:r.hydrate)??!0,...r,stream:t,templateType:af(r==null?void 0:r.streamId,t)?"static":"entity"}},cf=e=>{if(e)return e.localization.locales&&e.localization.locales.length>0?{...e,localization:{locales:e.localization.locales,primary:!1}}:{...e,localization:{primary:!0}}},ff=(e,r)=>{if(!e||typeof e!="string")throw new Error(`getPath does not return a valid string in template '${r}'`)},Qe=new Map,uf=async(e,r,t)=>{const n=r.serverPaths[e].replace(t.config.subfolders.assets,"..");if(!n)throw new Error(`Could not find path for feature ${e}`);let a=Qe.get(n);return a||(a=await ve(()=>import(n),[]),Qe.set(n,a)),sf(n,a,!0)},lf=async(e,r)=>{const t=e.renderPaths._server.replace(r.config.subfolders.assets,"..");return{server:await vf(t),client:e.renderPaths._client}},er=new Map,vf=async e=>{let r=er.get(e);return r||(r=await ve(()=>import(e),[]),er.set(e,r)),r},df=async(e,r,t,n,a)=>{var l;e.transformProps&&(r=await e.transformProps(r));const o=e.getPath(r);ff(o,e.templateName);const i=r.pathOverride??o,s={...r,path:o,relativePrefixToRoot:Bc(i)};return{content:await gf(e,s,t,n,a),path:o,redirects:((l=e.getRedirects)==null?void 0:l.call(e,s))??[]}},gf=async(e,r,t,n,a)=>{const{default:o,render:i,getHeadConfig:s}=e;if(!o&&!i)throw new Error(`Cannot render html from template '${e.config.name}'. Template is missing render function or default export.`);return i?(s&&console.warn(`getHeadConfig for template ${e.config.name} will not be called since a custom render function is defined.`),i(r)):await ef(r,e,e.config.hydrate,t,n,a)};var bf=async(e,r)=>{const t=new le(r.projectStructure),n=await uf(e.document.__.name,r,t),a=await lf(r,t);return await df(n,e,a,r,t)};export{bf as default};

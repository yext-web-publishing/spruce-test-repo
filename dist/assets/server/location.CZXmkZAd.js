import{j as s,P as c,B as d}from"../static/index-CcsU9V5J.js";import{F as m}from"../static/yext-favicon-Cgjx2BvB.js";import{B as p,D as g,H as u,A as h}from"../static/Hours-CQ0fpklp.js";import"../static/index-B5OtZns-.js";import"../static/commonjsHelpers-DZNb-E5g.js";import"../static/index-BOtJShKb.js";import"../static/preload-helper-D58fUZad.js";const D={stream:{$id:"location-stream",filter:{entityTypes:["location"]},fields:["id","uid","meta","name","address","mainPhone","description","hours","slug","geocodedCoordinate","photoGallery"],localization:{locales:["en","fr","de","es","it","ar"],primary:!1},transform:{replaceOptionValuesWithDisplayNames:["paymentOptions"]}}},B=({document:e})=>e.slug?e.slug:`${e.locale}/${e.address.region}/${e.address.city}/${e.address.line1}-${e.id.toString()}`,F=({document:e})=>[`index-old/${e.locale}/${e.id.toString()}`],H=({document:e})=>({title:e.name,charset:"UTF-8",viewport:"width=device-width, initial-scale=1",tags:[{type:"meta",attributes:{name:"description",content:e.description}},{type:"link",attributes:{rel:"icon",type:"image/x-icon",href:m}}]}),w=async e=>{const{dm_directoryParents:t,name:r}=e.document;return(t||[]).push({name:r,slug:""}),{...e,document:{...e.document,dm_directoryParents:t}}},C=({relativePrefixToRoot:e,document:t})=>{const{name:r,address:i,hours:a,mainPhone:n,services:l,description:o,siteDomain:x}=t;return s.jsx(s.Fragment,{children:s.jsxs(c,{children:[s.jsx(d,{name:r,address:i}),s.jsxs("div",{className:"centered-container",children:[s.jsx(p,{baseUrl:e}),s.jsxs("div",{className:"grid gap-x-10 gap-y-10 md:grid-cols-2",children:[s.jsx(g,{address:i,phone:n,services:l}),a&&s.jsx(u,{title:"Restaurant Hours",hours:a}),o&&s.jsx(h,{name:r,description:o})]})]})]})})},N=({document:e})=>`${e.slug}`,R=({document:e})=>[{source:`alternate-source-${e.id}`,status:301}];export{D as config,C as default,N as getDestination,H as getHeadConfig,B as getPath,F as getRedirects,R as getSources,w as transformProps};

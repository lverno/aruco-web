import{E as b,s as l}from"./index-c5ee12bd.js";const r=[];function h(e,o){return{subscribe:p(e,o).subscribe}}function p(e,o=b){let i;const n=new Set;function u(t){if(l(e,t)&&(e=t,i)){const c=!r.length;for(const s of n)s[1](),r.push(s,e);if(c){for(let s=0;s<r.length;s+=2)r[s][0](r[s+1]);r.length=0}}}function f(t){u(t(e))}function a(t,c=b){const s=[t,c];return n.add(s),n.size===1&&(i=o(u)||b),t(e),()=>{n.delete(s),n.size===0&&(i(),i=null)}}return{set:u,update:f,subscribe:a}}export{h as r,p as w};

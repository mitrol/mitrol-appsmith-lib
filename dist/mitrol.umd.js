!function(e,o){"object"==typeof exports&&"undefined"!=typeof module?module.exports=o():"function"==typeof define&&define.amd?define(o):(e="undefined"!=typeof globalThis?globalThis:e||self).mitrol=o()}(this,(function(){"use strict";return{apiUrl:"",formUrl:"",estadoAgente:"",post:async(e,o)=>{var t=new Headers;t.append("Authorization","Bearer "+o);var r={method:"POST",headers:t,redirect:"follow"};let l=mitrol.apiUrl+e;const n=await fetch(l,r);return console.log("post - urlWS: ",l),console.log("post - response: ",n),await n.json()},get:async(e,o)=>{var t=new Headers;t.append("Authorization","Bearer "+o);var r={method:"GET",headers:t,redirect:"follow"};let l=mitrol.apiUrl+e;const n=await fetch(mitrol.apiUrl+e,r);return console.log("get - urlWS: ",l),await n.json()},getOutboundCampaigns:async e=>{let o=mitrol.getUrlParams("jwt"),t=`/api/${e}/campaigns`,r=await mitrol.get(t,o);r=await r.value;let l=[];for(let e=0;e<r.length;e++)"Saliente"==r[e].nombreModoCampania&&l.push(r[e]);return l},getUrlParams:e=>{var o="",t="",r=!1;for(let l=0;void 0!==mitrol.formUrl[l];l++)if(r){if("&"===mitrol.formUrl[l]||void 0===mitrol.formUrl[l])break;o+=mitrol.formUrl[l]}else mitrol.formUrl[l]===e[t.length]?(t+=mitrol.formUrl[l])===e&&(l++,r=!0):t="";return console.log(`getUrlParams - paramName: ${e} | paramValue: ${o}`),o},agentState:async()=>{try{const e=`/api/${String(await mitrol.getUrlParams("loginId"))}/agent-state`;console.log(`agentState - endpoint ${e}`);let o=String(await mitrol.getUrlParams("jwt")),t=await mitrol.get(e,o);return console.log(`agentState - El response es: ${JSON.stringify(t)}`),t.displayName}catch(e){return console.error(`Error on agentState: ${e}`),null}},call:async e=>{try{let o,t=mitrol.getUrlParams("loginId"),r=mitrol.getUrlParams("idCampania"),l=mitrol.getUrlParams("idLlamada"),n=mitrol.getUrlParams("jwt");return"Preview"===mitrol.estadoAgente?(console.log("call"),o=`/api/${t}/call?idCampania=${r}&destino=${e}`,console.log(`call - calling endpoint ${o}`)):(console.log("callOnInteraction"),o=`/api/${t}/call?idCampania=${r}&destino=${e}&interactionId=${l}`,console.log(`callOnInteraccion - calling endpoint ${o}`)),mitrol.post(o,n).then((e=>(console.log(`call - El response es: ${JSON.stringify(e)}`),0==e.code?(console.log(`call - ${e.idInteraccion}`),[e.idInteraccion,e.code]):(console.log(`call sin ruta - ${e.idInteraccion}`),[null,null])))).catch((e=>(console.error("Error realizando la llamada:",e),[null,null])))}catch(e){return console.error(`Error on call/callOnInteraccion: ${e}`),[null,null]}},hangup:async e=>{try{const o=`/api/${String(await mitrol.getUrlParams("loginId"))}/hangup?idInteraccion=${e}`;console.log(`hangup - endpoint ${o}`);let t=String(await mitrol.getUrlParams("jwt")),r=await mitrol.post(o,t);return console.log(`hangup - El response es: ${JSON.stringify(r)}`),0==r.code?(console.log("hangup - success"),!0):(console.log("hangup - failed"),!1)}catch(e){return console.error(`Error on hangup: ${e}`),!1}},hold:async e=>{try{const o=`/api/${String(await mitrol.getUrlParams("loginId"))}/hold?idInteraccion=${e}`;console.log(`hold - endpoint ${o}`);let t=String(await mitrol.getUrlParams("jwt")),r=await mitrol.post(o,t);return console.log(`hold - El response es: ${JSON.stringify(r)}`),0==r.code?(console.log("hold - success"),!0):(console.log("hold - failed"),!1)}catch(e){return console.error(`Error on hold: ${e}`),null}},resume:async e=>{try{const o=`/api/${String(await mitrol.getUrlParams("loginId"))}/resume?idInteraccion=${e}`;console.log(`resume - endpoint ${o}`);let t=String(await mitrol.getUrlParams("jwt")),r=await mitrol.post(o,t);return console.log(`resume - El response es: ${JSON.stringify(r)}`),0==r.code?(console.log("resume - success"),!0):(console.log("resume - failed"),!1)}catch(e){return console.error(`Error on resume: ${e}`),null}},getResultadoGestion:async e=>{try{let o=[],t=[];for(let r=0;r<e.length;r++)o.some((o=>o.name===e[r].parent_name&&o.code===e[r].parent_name))||o.push({name:e[r].parent_name,code:e[r].parent_name}),t.some((o=>o.name===e[r].child_name&&o.code===e[r].idResultadoGestionChild))||t.push({name:e[r].child_name,code:e[r].idResultadoGestionChild});return console.log(`getResultadoGestion - Las categorias son: ${JSON.stringify(o)}. Las subcategorias son: ${JSON.stringify(t)}.`),[o,t]}catch(e){return console.error(`Error on getResultadoGestion: ${e}`),[null,null]}},setResultadoUI:async(e,o)=>{try{let t=[];for(let r=0;r<e.length;r++)o===e[r].parent_name&&t.push({name:e[r].child_name,code:e[r].idResultadoGestionChild});return console.log(`setUIResultadoGestion - ${JSON.stringify(t)}`),t}catch(e){return console.error(`Error on setUIResultadoChild: ${e}`),null}},setResultadoGestion:async(e,o,t)=>{try{const r=`/api/${String(await mitrol.getUrlParams("loginId"))}/interactionresult?idInteraccion=${e}&crmId=${o}&idResultadoGestionInterno=${t}&idResultadoGestionExterno=${t}`;let l=String(await mitrol.getUrlParams("jwt")),n=await mitrol.get(r,l);if(console.log(`setResultadoGestion - ${JSON.stringify(n)}`),0!=n.code)return console.log("setResultadoGestion - failed"),!1;console.log("setResultadoGestion - success"),await mitrol.closeinteraction(e)}catch(e){return console.error(`Error on setResultadoGestion: ${e}`),null}},closeinteraction:async e=>{try{const o=`/api/${String(await mitrol.getUrlParams("loginId"))}/closeinteraction?idInteraccion=${e}`;console.log(`closeinteraction - endpoint ${o}`);let t=String(await mitrol.getUrlParams("jwt")),r=await mitrol.get(o,t);return console.log(`closeinteraction - El response es: ${JSON.stringify(r)}`),0==r.code?(console.log("closeinteraction - interaccion cerrada"),!0):(console.log("closeinteraction - no se pudo cerrar la interaccion"),!1)}catch(e){return console.error(`Error on closeinteraction: ${e}`),null}}}}));

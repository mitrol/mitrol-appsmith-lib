!function(e,o){"object"==typeof exports&&"undefined"!=typeof module?module.exports=o():"function"==typeof define&&define.amd?define(o):(e="undefined"!=typeof globalThis?globalThis:e||self).mitrol=o()}(this,(function(){"use strict";return{apiUrl:"",formUrl:"",estadoAgente:"",post:async(e,o)=>{var t=new Headers;t.append("Authorization","Bearer "+o);var r={method:"POST",headers:t,redirect:"follow"};let n=mitrol.apiUrl+e;const l=await fetch(n,r);return console.log("post - urlWS: ",n),console.log("post - response: ",l),await l.json()},get:async(e,o)=>{var t=new Headers;t.append("Authorization","Bearer "+o);var r={method:"GET",headers:t,redirect:"follow"};let n=mitrol.apiUrl+e;const l=await fetch(mitrol.apiUrl+e,r);return console.log("get - urlWS: ",n),await l.json()},getOutboundCampaigns:async e=>{let o=mitrol.getUrlParams("jwt"),t=`/api/${e}/campaigns`,r=await mitrol.get(t,o);r=await r.value;let n=[];for(let e=0;e<r.length;e++)"Saliente"==r[e].nombreModoCampania&&n.push(r[e]);return n},getUrlParams:e=>{var o="",t="",r=!1;for(let n=0;void 0!==mitrol.formUrl[n];n++)if(r){if("&"===mitrol.formUrl[n]||void 0===mitrol.formUrl[n])break;o+=mitrol.formUrl[n]}else mitrol.formUrl[n]===e[t.length]?(t+=mitrol.formUrl[n])===e&&(n++,r=!0):t="";return console.log(`getUrlParams - paramName: ${e} | paramValue: ${o}`),o},agentState:async()=>{try{const e=`/api/${String(await mitrol.getUrlParams("loginId"))}/agent-state`;console.log(`agentState - endpoint ${e}`);let o=String(await mitrol.getUrlParams("jwt")),t=await mitrol.get(e,o);return console.log(`agentState - El response es: ${JSON.stringify(t)}`),t.displayName}catch(e){return console.error(`Error on agentState: ${e}`),null}},call:async e=>{try{let o,t=mitrol.getUrlParams("loginId"),r=mitrol.getUrlParams("idCampania"),n=mitrol.getUrlParams("idLlamada"),l=mitrol.getUrlParams("jwt");"Preview"===mitrol.estadoAgente?(console.log("call"),o=`/api/${t}/call?idCampania=${r}&destino=${e}`,console.log(`call - calling endpoint ${o}`)):(console.log("callOnInteraction"),o=`/api/${t}/call?idCampania=${r}&destino=${e}&interactionId=${n}`,console.log(`callOnInteraccion - calling endpoint ${o}`)),mitrol.post(o,l).then((e=>null!=e.idInteraccion?(console.log(`call - ${e.idInteraccion}`),[e.idInteraccion,"Conectando"]):(console.log(`call sin ruta - ${e.idInteraccion}`),[null,"Preview"]))).catch((e=>(console.error("Error realizando la llamada:",e),[null,"Preview"])))}catch(e){return console.error(`Error on call/callOnInteraccion: ${e}`),[null,"Preview"]}},hangup:async e=>{try{const o=`/api/${String(await mitrol.getUrlParams("loginId"))}/hangup?idInteraccion=${e}`;console.log(`hangup - endpoint ${o}`);let t=String(await mitrol.getUrlParams("jwt")),r=await mitrol.post(o,t);return console.log(`hangup - El response es: ${JSON.stringify(r)}`),"Success"==r.value?(console.log("hangup - success"),!0):(console.log("hangup - failed"),!1)}catch(e){return console.error(`Error on hangup: ${e}`),!1}},hold:async e=>{try{const o=`/api/${String(await mitrol.getUrlParams("loginId"))}/hold?idInteraccion=${e}`;console.log(`hold - endpoint ${o}`);let t=String(await mitrol.getUrlParams("jwt")),r=await mitrol.post(o,t);return console.log(`hold - El response es: ${JSON.stringify(r)}`),"Success"==r.value?(console.log("hold - success"),!0):(console.log("hold - failed"),!1)}catch(e){return console.error(`Error on hold: ${e}`),null}},resume:async e=>{try{const o=`/api/${String(await mitrol.getUrlParams("loginId"))}/resume?idInteraccion=${e}`;console.log(`resume - endpoint ${o}`);let t=String(await mitrol.getUrlParams("jwt")),r=await mitrol.post(o,t);return console.log(`resume - El response es: ${JSON.stringify(r)}`),"Success"==r.value?(console.log("resume - success"),!0):(console.log("resume - failed"),!1)}catch(e){return console.error(`Error on resume: ${e}`),null}},getResultadoGestion:async e=>{try{let o=[],t=[];for(let r=0;r<e.length;r++)o.some((o=>o.name===e[r].parent_name&&o.code===e[r].parent_name))||o.push({name:e[r].parent_name,code:e[r].parent_name}),t.some((o=>o.name===e[r].child_name&&o.code===e[r].idResultadoGestionChild))||t.push({name:e[r].child_name,code:e[r].idResultadoGestionChild});return console.log(`getResultadoGestion - Las categorias son: ${JSON.stringify(o)}. Las subcategorias son: ${JSON.stringify(t)}.`),[o,t]}catch(e){return console.error(`Error on getResultadoGestion: ${e}`),[null,null]}},setResultadoUI:async(e,o)=>{try{let t=[];for(let r=0;r<e.length;r++)o===e[r].parent_name&&t.push({name:e[r].child_name,code:e[r].idResultadoGestionChild});return console.log(`setUIResultadoGestion - ${JSON.stringify(t)}`),t}catch(e){return console.error(`Error on setUIResultadoChild: ${e}`),null}},setResultadoGestion:async(e,o,t)=>{try{const r=`/api/${String(await mitrol.getUrlParams("loginId"))}/interactionresult?idInteraccion=${e}&crmId=${o}&idResultadoGestionInterno=${t}&idResultadoGestionExterno=${t}`;let n=String(await mitrol.getUrlParams("jwt")),l=await mitrol.get(r,n);if(console.log(`setResultadoGestion - ${JSON.stringify(l)}`),0!=l.code)return console.log("setResultadoGestion - failed"),!1;console.log("setResultadoGestion - success"),await mitrol.closeinteraction(e)}catch(e){return console.error(`Error on setResultadoGestion: ${e}`),null}},closeinteraction:async e=>{try{const o=`/api/${String(await mitrol.getUrlParams("loginId"))}/closeinteraction?idInteraccion=${e}`;console.log(`closeinteraction - endpoint ${o}`);let t=String(await mitrol.getUrlParams("jwt")),r=await mitrol.get(o,t);return console.log(`closeinteraction - El response es: ${JSON.stringify(r)}`),"Success"==r.value?(console.log("closeinteraction - interaccion cerrada"),!0):(console.log("closeinteraction - no se pudo cerrar la interaccion"),!1)}catch(e){return console.error(`Error on closeinteraction: ${e}`),null}}}}));

!function(e,o){"object"==typeof exports&&"undefined"!=typeof module?module.exports=o():"function"==typeof define&&define.amd?define(o):(e="undefined"!=typeof globalThis?globalThis:e||self).mitrol=o()}(this,(function(){"use strict";return{apiUrl:"",formUrl:"",estadoAgente:"",post:async(e,o)=>{var t=new Headers;t.append("Authorization","Bearer "+o);var r={method:"POST",headers:t,redirect:"follow"};let n=mitrol.apiUrl+e;const a=await fetch(n,r);return console.log("post - urlWS: ",n),console.log("post - response: ",a),await a.json()},get:async(e,o)=>{var t=new Headers;t.append("Authorization","Bearer "+o);var r={method:"GET",headers:t,redirect:"follow"};let n=mitrol.apiUrl+e;const a=await fetch(mitrol.apiUrl+e,r);return console.log("get - urlWS: ",n),await a.json()},getOutboundCampaigns:async e=>{let o=mitrol.getUrlParams("jwt"),t=`/api/${e}/campaigns`,r=await mitrol.get(t,o);r=await r.value;let n=[];for(let e=0;e<r.length;e++)"Saliente"==r[e].nombreModoCampania&&n.push(r[e]);return n},getUrlParams:e=>{var o="",t="",r=!1;for(let n=0;void 0!==mitrol.formUrl[n];n++)if(r){if("&"===mitrol.formUrl[n]||void 0===mitrol.formUrl[n])break;o+=mitrol.formUrl[n]}else mitrol.formUrl[n]===e[t.length]?(t+=mitrol.formUrl[n])===e&&(n++,r=!0):t="";return console.log(`getUrlParams - paramName: ${e} | paramValue: ${o}`),o},hangup:async e=>{try{const o=`/api/${String(await mitrol.getUrlParams("loginId"))}/hangup?idInteraccion=${e}`;console.log(`hangup - endpoint ${o}`);let t=String(await mitrol.getUrlParams("jwt")),r=await mitrol.post(o,t);return console.log(`hangup - El response es: ${JSON.stringify(r)}`),"Success"==r.value?(console.log("hangup - success"),!0):(console.log("hangup - failed"),!1)}catch(e){return console.error(`Error on hangup: ${e}`),!1}},setResultadoGestion:async(e,o,t)=>{try{let r=String(await mitrol.getUrlParams("loginId")),n=String(await mitrol.getUrlParams("jwt")),a=`/api/${r}/interactionresult?idInteraccion=${e}&crmId=${o}&idResultadoGestionInterno=${t}&idResultadoGestionExterno=${t}`;return 200==(await mitrol.get(a,n)).status?(console.log("setResultadoGestion - success"),!0):(console.log("setResultadoGestion - failed"),!1)}catch(e){return console.error(`Error on setResultadoGestion: ${e}`),null}},getResultadoGestion:async e=>{try{let o=[],t=[];for(let r=0;r<e.length;r++)o.some((o=>o.name===e[r].parent_name&&o.code===e[r].parent_name))||o.push({name:e[r].parent_name,code:e[r].parent_name}),t.some((o=>o.name===e[r].child_name&&o.code===e[r].idResultadoGestionChild))||t.push({name:e[r].child_name,code:e[r].idResultadoGestionChild});return console.log(`getResultadoGestion - Las categorias son: ${JSON.stringify(o)}. Las subcategorias son: ${JSON.stringify(t)}.`),[o,t]}catch(e){return console.error(`Error on getResultadoGestion: ${e}`),[null,null]}},setResultadoUI:async(e,o)=>{try{let t=[];for(let r=0;r<e.length;r++)o===e[r].parent_name&&t.push({name:e[r].child_name,code:e[r].idResultadoGestionChild});return console.log(`setUIResultadoGestion - ${t}`),t}catch(e){return console.error(`Error on setUIResultadoChild: ${e}`),null}},hold:async e=>{try{const o=`/api/${String(await mitrol.getUrlParams("loginId"))}/hold?idInteraccion=${e}`;console.log(`hold - endpoint ${o}`);let t=String(await mitrol.getUrlParams("jwt")),r=await mitrol.post(o,t);return console.log(`hold - El response es: ${JSON.stringify(r)}`),"Success"==r.value?(console.log("hold - success"),!0):(console.log("hold - failed"),!1)}catch(e){return console.error(`Error on hold: ${e}`),null}},resume:async e=>{try{const o=`/api/${String(await mitrol.getUrlParams("loginId"))}/resume?idInteraccion=${e}`;console.log(`resume - endpoint ${o}`);let t=String(await mitrol.getUrlParams("jwt")),r=await mitrol.post(o,t);return console.log(`resume - El response es: ${JSON.stringify(r)}`),"Success"==r.value?(console.log("resume - success"),!0):(console.log("resume - failed"),!1)}catch(e){return console.error(`Error on resume: ${e}`),null}},agentState:async()=>{try{const e=`/api/${String(await mitrol.getUrlParams("loginId"))}/agent-state`;console.log(`agentState - endpoint ${e}`);let o=String(await mitrol.getUrlParams("jwt")),t=await mitrol.get(e,o);return console.log(`agentState - El response es: ${JSON.stringify(t)}`),t.displayName}catch(e){return console.error(`Error on agentState: ${e}`),null}},closeinteraction:async e=>{try{const o=`/api/${String(await mitrol.getUrlParams("loginId"))}/closeinteraction?idInteraccion=${e}`;console.log(`closeinteraction - endpoint ${o}`);let t=String(await mitrol.getUrlParams("jwt")),r=await mitrol.get(o,t);return console.log(`closeinteractionate - El response es: ${JSON.stringify(r)}`),"Success"==r.value?(console.log("closeinteraction - interaccion cerrada"),!0):(console.log("closeinteraction - no se pudo cerrar la interaccion"),!1)}catch(e){return console.error(`Error on closeinteraction: ${e}`),null}},call:async e=>{try{let o=mitrol.getUrlParams("loginId"),t=mitrol.getUrlParams("jwt"),r=mitrol.getUrlParams("idCampania"),n=mitrol.getUrlParams("idLlamada");if("Preview"==mitrol.estadoAgente){const n=`/api/${o}/call?idCampania=${r}&destino=${e}`;console.log(`call - calling endpoint ${n}`);let a=await mitrol.post(n,t);return console.log(`call - response.idInteraccion: ${a.idInteraccion}`),a.idInteraccion}{const a=`/api/${o}/call?idCampania=${r}&destino=${e}&interactionId=${n}`;console.log(`callOnInteraccion - calling endpoint ${a}`);await mitrol.post(a,t);return console.log(`callOnInteraccion - idInteraccion: ${n}`),idInterracion}}catch(e){return console.error(`Error on call/callOnInteraccion: ${e}`),null}},activacionBotones:async()=>"Preview"==mitrol.estadoAgente?"inactive":"active"}}));

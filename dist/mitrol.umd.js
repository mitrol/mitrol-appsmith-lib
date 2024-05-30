!function(e,o){"object"==typeof exports&&"undefined"!=typeof module?module.exports=o():"function"==typeof define&&define.amd?define(o):(e="undefined"!=typeof globalThis?globalThis:e||self).mitrol=o()}(this,(function(){"use strict";return{apiUrl:"",formUrl:"",post:async(e,o)=>{var t=new Headers;t.append("Authorization","Bearer "+o);var r={method:"POST",headers:t,redirect:"follow"};let l=mitrol.apiUrl+e;const a=await fetch(l,r);return console.log("post - urlWS: ",l),console.log("post - response: ",a),await a.json()},get:async(e,o)=>{var t=new Headers;t.append("Authorization","Bearer "+o);var r={method:"GET",headers:t,redirect:"follow"};let l=mitrol.apiUrl+e;const a=await fetch(mitrol.apiUrl+e,r);return console.log("get - urlWS: ",l),await a.json()},call:async(e,o)=>{try{const t=`/api/${mitrol.getUrlParams("loginId")}/call?idCampania=${o}&destino=${e}`;console.log(`call - calling endpoint ${t}`);let r=mitrol.getUrlParams("jwt"),l=await mitrol.post(t,r);return console.log(`call - res.idInteraccion: ${l.idInteraccion}`),l.idInteraccion}catch(e){return console.error(`Error on call: ${e}`),!1}},callOnInteraction:async e=>{try{const o=`/api/${mitrol.getUrlParams("loginId")}/call?idCampania=${mitrol.getUrlParams("idcampania")}&destino=${e}&interactionId=${mitrol.getUrlParams("idLlamada")}`;console.log(`call - calling endpoint ${o}`);let t=mitrol.getUrlParams("jwt"),r=await mitrol.post(o,t);return console.log(`call - res.idInteraccion: ${r.idInteraccion}`),r.idInteraccion}catch(e){return console.error(`Error on call: ${e}`),!1}},getOutboundCampaigns:async e=>{let o=mitrol.getUrlParams("jwt"),t=`/api/${e}/campaigns`,r=await mitrol.get(t,o);r=await r.value;let l=[];for(let e=0;e<r.length;e++)"Saliente"==r[e].nombreModoCampania&&l.push(r[e]);return l},getUrlParams:e=>{var o="",t="",r=!1;for(let l=0;void 0!==mitrol.formUrl[l];l++)if(r){if("&"===mitrol.formUrl[l]||void 0===mitrol.formUrl[l])break;o+=mitrol.formUrl[l]}else mitrol.formUrl[l]===e[t.length]?(t+=mitrol.formUrl[l])===e&&(l++,r=!0):t="";return console.log(`getUrlParams - paramName: ${e} | paramValue: ${o}`),o},hangup:async e=>{try{const o=`/api/${String(await mitrol.getUrlParams("loginId"))}/hangup?idInteraccion=${e}`;console.log(`hangup - endpoint ${o}`);let t=String(await mitrol.getUrlParams("jwt")),r=await mitrol.post(o,t);return console.log(`hangup - El response es: ${r}`),200===r.status?(console.log("hangup - success"),!0):(console.log("hangup - failed"),!1)}catch(e){return console.error(`Error on hangup: ${e}`),!1}},setResultadoGestion:async(e,o,t)=>{try{let r=String(await mitrol.getUrlParams("loginId")),l=String(await mitrol.getUrlParams("jwt")),a=`/api/${r}/interactionresult?idInteraccion=${e}&crmId=${o}&idResultadoGestionInterno=${t}&idResultadoGestionExterno=${t}`;return 200===(await mitrol.get(a,l)).status?(console.log("setResultadoGestion - success"),!0):(console.log("setResultadoGestion - failed"),!1)}catch(e){return console.error(`Error on setResultadoGestion: ${e}`),null}},getResultadoGestion:async e=>{try{let o=[],t=[];for(let r=0;r<e.length;r++)o.some((o=>o.name===e[r].parent_name&&o.code===e[r].parent_name))||o.push({name:e[r].parent_name,code:e[r].parent_name}),t.some((o=>o.name===e[r].child_name&&o.code===e[r].idResultadoGestionChild))||t.push({name:e[r].child_name,code:e[r].idResultadoGestionChild});return console.log(`getResultadoGestion - Las categorias son: ${JSON.stringify(o)}. Las subcategorias son: ${JSON.stringify(t)}.`),[o,t]}catch(e){return console.error(`Error on getResultadoGestion: ${e}`),[null,null]}},setResultadoUI:async(e,o)=>{try{let t=[];for(let r=0;r<e.length;r++)o===e[r].parent_name&&t.push({name:e[r].child_name,code:e[r].idResultadoGestionChild});return console.log(`setUIResultadoGestion - ${t}`),t}catch(e){return console.error(`Error on setUIResultadoChild: ${e}`),null}},hold:async e=>{try{const o=`/api/${String(await mitrol.getUrlParams("loginId"))}/hold?idInteraccion=${e}`;console.log(`hold - endpoint ${o}`);let t=String(await mitrol.getUrlParams("jwt")),r=await mitrol.post(o,t);return console.log(`hold - El response es: ${r}`),200===r.status?(console.log("hold - success"),!0):(console.log("hold - failed"),!1)}catch(e){return console.error(`Error on hold: ${e}`),null}},resume:async e=>{try{const o=`/api/${String(await mitrol.getUrlParams("loginId"))}/resume?idInteraccion=${e}`;console.log(`resume - endpoint ${o}`);let t=String(await mitrol.getUrlParams("jwt")),r=await mitrol.post(o,t);return console.log(`resume - El response es: ${r}`),200===r.status?(console.log("resume - success"),!0):(console.log("resume - failed"),!1)}catch(e){return console.error(`Error on resume: ${e}`),null}}}}));

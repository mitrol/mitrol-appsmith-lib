!function(r,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(r="undefined"!=typeof globalThis?globalThis:r||self).mitrol=e()}(this,(function(){"use strict";return{apiUrl:"",formUrl:"",post:async(r,e)=>{var t=new Headers;t.append("Authorization","Bearer "+e);var a={method:"POST",headers:t,redirect:"follow"};const o=await fetch(apiUrl+r,a);return await o.json()},get:async(r,e)=>{var t=new Headers;t.append("Authorization","Bearer "+e);var a={method:"GET",headers:t,redirect:"follow"};const o=await fetch(apiUrl+r,a);return await o.json()},call:async(r,e)=>{try{const t=`/api/call?idCampania=${e}&destino=${r}`;console.log(`call - calling endpoint ${t}`);let a=getUrlParams("jwt");await post(t,a).then((r=>r.idInteraccion))}catch(r){return console.error(`Error on call: ${r}`),!1}},hold:async r=>{let e=getUrlParams("jwt"),t=`/api/hold?idInteraccion=${r}`;try{return await post(t,e),!0}catch(r){return console.error(`Error on hold: ${r}`),!1}},resume:async r=>{let e=getUrlParams("jwt"),t=`/api/resume?idInteraccion=${r}`;try{return post(t,e),!0}catch(r){return console.error(`Error on resume: ${r}`),!1}},hangup:async r=>{try{let e=getUrlParams("jwt");const t=`/api/hangup?idInteraccion=${r}`;return await post(t,e),!0}catch(r){return console.error(`Error on hangup: ${r}`),!1}},getOutboundCampaigns:async r=>{let e=getUrlParams("jwt"),t=`/api/${r}/campaigns`,a=await get(t,e);a=await a.value;let o=[];for(let r=0;r<a.length;r++)"Saliente"==a[r].nombreModoCampania&&o.push(a[r]);return o},setResultadoGestion:async(r,e)=>{try{let t=getUrlParams("jwt"),a=`/interactionresult?idInteraccion=${r}&idResultadoGestionInterno=${e}`;return await get(a,t),!0}catch(r){return console.error(`Error on setResultadoGestion: ${r}`),!1}},getResultadoGestion:async()=>{},getUrlParams:async r=>{var e="",t="",a=!1;console.log(`getUrlParams - mitrol.formUrl: ${mitrol.formUrl}`);for(let o=0;void 0!==mitrol.formUrl[o];o++)if(a){if("&"===mitrol.formUrl[o]||void 0===mitrol.formUrl[o])break;e+=mitrol.formUrl[o]}else mitrol.formUrl[o]===r[t.length]?(t+=mitrol.formUrl[o])===r&&(o++,a=!0):t="";return console.log(`getUrlParams - paramName: ${r} | paramValue: ${e}`),e}}}));

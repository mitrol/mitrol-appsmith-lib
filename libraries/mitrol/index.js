export default {
  /**
   * @module mitrol Provides methods to interact with Mitrol
   */

apiUrl: "",
formUrl: "",
/**
 * @method post Call endpoint POST
 * @param {endpoint} string , endpoint to call
 * @param {jwt} string , jwt token
 * @return {Promise} Promise object represents the response of the call
 */
post: async (endpoint, jwt) => {
  //set headers
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+ jwt);
  //req opts
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };
  //exec fetch concatenating global url with specific endpoint
      //TODO: fix apiURL global
  const response = await fetch(apiUrl+endpoint , requestOptions)
  return await response.json()
},

/**
* @method get Call endpoint GET
* @param {endpoint} string , endpoint to call
* @param {jwt} string , jwt token
* @return {Promise} Promise object represents the response of the call
*/
get: async (endpoint, jwt) => {
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer "+ jwt);
//req opts
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
}

//exec fetch concatenating global url with specific endpoint
const response = await fetch(apiUrl+endpoint , requestOptions)
return await response.json()
},

  /**
   * @method call Call using webpad api call endpoint
   * @param {client} number, telephone number to call
   * @param {number} idcampania - idcampania to set to idinteraccion
   * @param {varchar} jwt - jwt token
   * @return {idInteraccion} idInteraccion generated of the call
   */
	call: async (client, idcampania) => {
    try {
      const endpoint = `/api/call?idCampania=${idcampania}&destino=${client}`
      console.log(`call - calling endpoint ${endpoint}`)
      let jwt = getUrlParams("jwt")
      await post(endpoint, jwt)
      .then((res) => {
        //TODO: define responses of webpadAPI to know how to handle success
        return res.idInteraccion
      })  
    } catch (error) {
      console.error(`Error on call: ${error}`)
      return false
    }
	},
  /**
   * @method hold hold idinteraccion using webpad API
   * @param {idInteraccion} varchar - idInteraccion to hold
   * @return {bool} bool represents the machine state of function
   */
  hold: async (idInteraccion) => {
    let jwt = getUrlParams("jwt")
		//armado de url para post request y ejecucion de funcion
		let endpoint = `/api/hold?idInteraccion=${idInteraccion}`
    try {
      await post(endpoint, jwt)
      //TODO: define responses of webpadAPI to know how to handle success
      return true
    }
    catch (error) {
      console.error(`Error on hold: ${error}`)
      return false
    }
	},
  /**
   * @method resume resume call using webpad API
   * @param {idInteraccion} varchar - idInteraccion to resume
   * @return {bool} bool represents the machine state of function
   */
	resume: async (idInteraccion) => {
		let jwt = getUrlParams("jwt")
		//armado de url para post request y ejecucion de funcion
		let endpoint = `/api/resume?idInteraccion=${idInteraccion}`
    try {
      post(endpoint, jwt)
      //TODO: define responses of webpadAPI to know how to handle success
      return true  
    } catch (error) {
      console.error(`Error on resume: ${error}`)
      return false
    }
	},
  /**
   * @method hangup end call using webpad API
   * @param {idInteraccion} varchar - idInteraccion to end
   * @return {bool} bool represents the machine state of function
   */
	hangup: async (idInteraccion) => {
    try {
		let jwt = getUrlParams("jwt")
		const endpoint = `/api/hangup?idInteraccion=${idInteraccion}`
		await post(endpoint, jwt)  
    //TODO: define responses of webpadAPI to know how to handle success
    return true
    } catch (error) {
      console.error(`Error on hangup: ${error}`)
      return false
    }
	},
  /**
   * @method getOutboundCampaigns get all outbound campaigns
   * @param {loginId} varchar - loginId to get campaigns
   * @return {Array} Array of outbound campaigns
   */
	getOutboundCampaigns: async (loginId) => {
    let jwt = getUrlParams("jwt")
    let endpoint = `/api/${loginId}/campaigns`
    let campanias = await get(endpoint, jwt)
    campanias = await campanias.value
    let outboundCampaigns = []
    for (let i = 0; i < campanias.length; i++) {
    if(campanias[i].nombreModoCampania == 'Saliente'	){
      outboundCampaigns.push(campanias[i])
      }
    }
    return outboundCampaigns
	},
  /**
   * @method getInboundCampaigns get all inbound campaigns
   * @param {idInteraccion} varchar - idInteraccion to set resultado gestion to.
   * @param {idResultadoGestionInterno} - ID of resultado gestion to be set
   * @return {Array} Array of inbound campaigns
   */
  setResultadoGestion: async (idInteraccion, idResultadoGestionInterno) => {
    try {
    //TODO: define how to obtain jwt from onload
    let jwt = getUrlParams("jwt")
    let endpoint = `/interactionresult?idInteraccion=${idInteraccion}&idResultadoGestionInterno=${idResultadoGestionInterno}`
    await get(endpoint, jwt)
    //TODO: define responses of webpadAPI to know how to handle success
    return true
    } catch (error) {
      console.error(`Error on setResultadoGestion: ${error}`)
      return false
      }
    },
    
    getResultadoGestion: async () => {
    //TODO: define getResultadosGestion and others
    },
    /**
     * 
     * @param {*} param Name of value on URL
     * @returns {*} paramValue according to the value on get URL
     */
    getUrlParams: async (param) => {
      var paramValue = "";
      var copyParam = "";
      var isParam = false;
      var isParamValue = false;
      console.log(`getUrlParams - mitrol.formUrl: ${mitrol.formUrl}`)
      for(let i = 0; mitrol.formUrl[i] !== undefined; i++) {
        // Check the word character per character
        if (!isParamValue) {
          if (mitrol.formUrl[i] === param[copyParam.length]) {
            copyParam += mitrol.formUrl[i];
            isParam = copyParam === param;
            if (isParam) {
              i++;  // Skip over the "="
              isParamValue = true;
            }
          } else {
            copyParam = "";
          }
        } else {
          if (mitrol.formUrl[i] === '&' || mitrol.formUrl[i] === undefined) {
            break;
          }
          paramValue += mitrol.formUrl[i];
        }
      }
      console.log(`getUrlParams - paramName: ${param} | paramValue: ${paramValue}`)
      return paramValue;
    }
}
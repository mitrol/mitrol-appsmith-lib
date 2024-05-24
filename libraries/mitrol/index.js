export default {
  /**
   * @module mitrol Provides methods to interact with Mitrol
   */

  apiUrl: "",
  formUrl: "",
  /**
   * @method post Call endpoint POST
   * @param {string} endpoint , endpoint to call
   * @param {string} jwt , jwt token
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
    let urlWS = mitrol.apiUrl+endpoint
    const response = await fetch(urlWS , requestOptions)
    console.log("post - urlWS: ", urlWS)
    console.log("post - response: ", response)
    return await response.json()
  },
  /**
  * @method get Call endpoint GET
  * @param {string} endpoint , endpoint to call
  * @param {string} jwt , jwt token
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
  let urlWS = mitrol.apiUrl+endpoint
  const response = await fetch(mitrol.apiUrl+endpoint , requestOptions)
  console.log("get - urlWS: ", urlWS)
  return await response.json()
  },
  /**
   * @method call Call using webpad api call endpoint
   * @param {number} client, telephone number to call
   * @param {number} idcampania - idcampania to set to idinteraccion
   * @param {varchar} jwt - jwt token
   * @return {idInteraccion} idInteraccion generated of the call
   */
	call: async (client, idcampania) => {
    try {
      let loginId = mitrol.getUrlParams("loginId")
      const endpoint = `/api/${loginId}/call?idCampania=${idcampania}&destino=${client}`
      console.log(`call - calling endpoint ${endpoint}`)
      let jwt = mitrol.getUrlParams("jwt")
      let res = await mitrol.post(endpoint, jwt)
      console.log(`call - res.idInteraccion: ${res.idInteraccion}`)
      return res.idInteraccion
      
    } catch (error) {
      console.error(`Error on call: ${error}`)
      return false
    }
	},
  /**
   * @method callOnInteraction Call using webpad api call endpoint
   * @param {number} client, telephone number to call
   * @return {idInteraccion} idInteraccion generated of the call
   */
	callOnInteraction: async (client) => {
    try {
      let loginId = mitrol.getUrlParams("loginId")
      let idcampania = mitrol.getUrlParams("idcampania")
      let idInterracion = mitrol.getUrlParams("idLlamada")
      const endpoint = `/api/${loginId}/call?idCampania=${idcampania}&destino=${client}&interactionId=${idInterracion}`
      console.log(`call - calling endpoint ${endpoint}`)
      let jwt = mitrol.getUrlParams("jwt")
      let res = await mitrol.post(endpoint, jwt)
      console.log(`call - res.idInteraccion: ${res.idInteraccion}`)
      return res.idInteraccion
      
    } catch (error) {
      console.error(`Error on call: ${error}`)
      return false
    }
	},
  /**
   * @method hold hold idinteraccion using webpad API
   * @param {varchar} idInteraccion - idInteraccion to hold
   * @return {bool} bool represents the machine state of function
   */
  hold: async (idInteraccion) => {
    let jwt = mitrol.getUrlParams("jwt")
		//armado de url para post request y ejecucion de funcion
		let endpoint = `/api/hold?idInteraccion=${idInteraccion}`
    try {
      await mitrol.post(endpoint, jwt)
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
   * @param {varchar} idInteraccion - idInteraccion to resume
   * @return {bool} bool represents the machine state of function
   */
	resume: async (idInteraccion) => {
		let jwt = mitrol.getUrlParams("jwt")
		//armado de url para post request y ejecucion de funcion
		let endpoint = `/api/resume?idInteraccion=${idInteraccion}`
    try {
      mitrol.post(endpoint, jwt)
      //TODO: define responses of webpadAPI to know how to handle success
      return true  
    } catch (error) {
      console.error(`Error on resume: ${error}`)
      return false
    }
	},
  /**
   * @method getOutboundCampaigns get all outbound campaigns
   * @param {varchar} loginId - loginId to get campaigns
   * @return {Array} Array of outbound campaigns
   */
	getOutboundCampaigns: async (loginId) => {
    let jwt = mitrol.getUrlParams("jwt")
    let endpoint = `/api/${loginId}/campaigns`
    let campanias = await mitrol.get(endpoint, jwt)
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
   * @method getUrlParams return value of param from url
   * @param {string} param - string of param to obtain
   * @return {paramValue} value of the param obtained
   */
  getUrlParams: (param) => {
    var paramValue = "";
    var copyParam = "";
    var isParam = false;
    var isParamValue = false;
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
  },
  /**
   * @method hangup end call using webpad API
   * @param {varchar} idInteraccion
   * @return {boolean} 
   */
  hangup: async (idInteraccion) => {
    try{
      let loginId = String(await mitrol.getUrlParams("loginId"));
      let jwt = String(await mitrol.getUrlParams("jwt"));
      let endpoint = `/api/${loginId}/hangup?idInteraccion=${idInteraccion}`
      let response = await mitrol.post(endpoint, jwt)
      if (response.status === 200){
        console.log(`hangup - success`)
        return true
      }else{
        console.log(`hangup - failed`)
        return false
      }
    } catch (error) {
        console.error(`Error on hangup: ${error}`)
        return false
    }
  },
   /**
   * @method setResultadoGestion
   * @param {varchar} idInteraccion
   * @param {}idCliente
   * @param {varchar} idResultadoGestionInterno- ID of resultado gestion to be set
   * @return {} 
   */
  setResultadoGestion: async (idInteraccion, idCliente, idResultadoGestion) => {
    try{
      let loginId = String(await mitrol.getUrlParams("loginId"));
      let jwt = String(await mitrol.getUrlParams("jwt"));
      let endpoint = `/api/${loginId}/interactionresult?idInteraccion=${idInteraccion}&crmId=${idCliente}&idResultadoGestionInterno=${idResultadoGestion}&idResultadoGestionExterno=${idResultadoGestion}`
      let response = await mitrol.get(endpoint, jwt)
      console.log(`setResultadoGestion - ${response}`)
      if (response.status === 200){
        console.log(`setResultadoGestion - success`)
        return true
      }else{
        console.log(`setResultadoGestion - failed`)
        return false
      }
    } catch (error) {
        console.error(`Error on setResultadoGestion: ${error}`)
        return null
    }
  },
   /**
   * @method getResultadoGestion return ordered tree object of resultadosGestion
   * @param {Array} resultadosGestion - resultadosGestion to be ordered by previous db query
   * @return {}
   */
  getResultadoGestion: async (resultadosGestion) => {
    try{
      let parents = []
      let children = []
      for (let i = 0 ; i < resultadosGestion.length; i++){
        if(!parents.some(parent => parent.name === resultadosGestion[i]['parent_name'] && parent.code === resultadosGestion[i]['parent_name'])){
          parents.push({"name":resultadosGestion[i]['parent_name'], "code":resultadosGestion[i]['parent_name']})
        }
        if(!children.some(child => child.name === resultadosGestion[i]['child_name'] && child.code === resultadosGestion[i]['idResultadoGestionChild'])){
					children.push({"name":resultadosGestion[i]['child_name'], "code":resultadosGestion[i]['idResultadoGestionChild']})
			  }
      }
      console.log(`getResultadoGestion - Las categorias son: ${JSON.stringify(parents)}. Las subcategorias son: ${JSON.stringify(children)}.`)
      return [parents, children]
    } catch (error) {
        console.error(`Error on getResultadoGestion: ${error}`)
        return [null, null];
    }
  },
  /**
   * @method getResultadoGestion return ordered tree object of resultadosGestion
   * @param {Array} resultadosGestion - resultadosGestion to be ordered by previous db query
   * @param {varchar} selectPadre
   * @return {}
   */
  setResultadoUI: async (resultadosGestion, selectPadre) => {
    try{
      let children = []
      for (let i = 0; i < resultadosGestion.length;i++){
        if(selectPadre === resultadosGestion[i]['parent_name']){
            children.push({"name":resultadosGestion[i]['child_name'], "code":resultadosGestion[i]['idResultadoGestionChild']})
        }
      }
      console.log(`setUIResultadoGestion - ${children}`)
      return children
    } catch (error) {
        console.error(`Error on setUIResultadoChild: ${error}`)
        return null
    }
  }
}
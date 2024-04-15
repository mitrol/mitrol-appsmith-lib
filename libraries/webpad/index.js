import { getUrlParams } from './globals/index.js';
import {get, post} from './requests/index.js';
export default {
  /**
   * @module webpad Provides methods to interact with webpad API
   */

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
      //TODO: define how to obtain jwt from onload
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
    //TODO: define how to obtain jwt from onload
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
    //TODO: define how to obtain jwt from onload
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
    //TODO: define how to obtain jwt from onload
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
    //TODO: define how to obtain jwt from onload
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
    }
}
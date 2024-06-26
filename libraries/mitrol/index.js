export default {
    /**
     * @module mitrol Provides methods to interact with Mitrol
    **/
    apiUrl: "",
    formUrl: "",
    estadoAgente: "",
    /**
     * @method post Call endpoint POST
     * @param {string} endpoint , endpoint to call
     * @param {string} jwt , jwt token
     * @return {Promise} Promise object represents the response of the call
    **/
    post: async (endpoint, jwt) => {
        //set headers
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + jwt);
        //req opts
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        let urlWS = mitrol.apiUrl + endpoint
        const response = await fetch(urlWS, requestOptions)
        console.log("post - urlWS: ", urlWS)
        console.log("post - response: ", response)
        return await response.json()
    },
    /**
    * @method get Call endpoint GET
    * @param {string} endpoint , endpoint to call
    * @param {string} jwt , jwt token
    * @return {Promise} Promise object represents the response of the call
    **/
    get: async (endpoint, jwt) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + jwt);
        //req opts
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        let urlWS = mitrol.apiUrl + endpoint
        const response = await fetch(mitrol.apiUrl + endpoint, requestOptions)
        console.log("get - urlWS: ", urlWS)
        return await response.json()
    },
    /**
     * @method getOutboundCampaigns get all outbound campaigns
     * @param {varchar} loginId - loginId to get campaigns
     * @return {Array} Array of outbound campaigns
    **/
    getOutboundCampaigns: async (loginId) => {
        let jwt = mitrol.getUrlParams("jwt")
        let endpoint = `/api/${loginId}/campaigns`
        let campanias = await mitrol.get(endpoint, jwt)
        campanias = await campanias.value
        let outboundCampaigns = []
        for (let i = 0; i < campanias.length; i++) {
            if (campanias[i].nombreModoCampania == 'Saliente') {
                outboundCampaigns.push(campanias[i])
            }
        }
        return outboundCampaigns
    },
    /**
     * @method getUrlParams return value of param from url
     * @param {string} param - string of param to obtain
     * @return {paramValue} value of the param obtained
    **/
    getUrlParams: (param) => {
        var paramValue = "";
        var copyParam = "";
        var isParam = false;
        var isParamValue = false;
        for (let i = 0; mitrol.formUrl[i] !== undefined; i++) {
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
    * @method agentState muestra el estado del agente
    * @return {}
    **/
    agentState: async () => {
        try {
            let loginId = String(await mitrol.getUrlParams("loginId"))
            const endpoint = `/api/${loginId}/agent-state`
            console.log(`agentState - endpoint ${endpoint}`)
            let jwt = String(await mitrol.getUrlParams("jwt"))
            let response = await mitrol.get(endpoint, jwt)
            console.log(`agentState - El response es: ${JSON.stringify(response)}`)
            return response.displayName
        } catch (error) {
            console.error(`Error on agentState: ${error}`)
            return null
        }
    },
    /**
     * @method call realizar llamada
     * @param {client} client - numero de telefono 
     * @return {}
    **/
    call: async (client) => {
        try {
            let loginId = mitrol.getUrlParams("loginId");
            let idCampania = mitrol.getUrlParams("idCampania");
            let idInteraccion = mitrol.getUrlParams("idLlamada");
            let jwt = mitrol.getUrlParams("jwt");
            let endpoint;
            if (mitrol.estadoAgente === "Preview") {
                console.log("call")
                endpoint = `/api/${loginId}/call?idCampania=${idCampania}&destino=${client}`;
                console.log(`call - calling endpoint ${endpoint}`);
            } else {
                console.log("callOnInteraction")
                endpoint = `/api/${loginId}/call?idCampania=${idCampania}&destino=${client}&interactionId=${idInteraccion}`;
                console.log(`callOnInteraccion - calling endpoint ${endpoint}`);
            }
            mitrol.post(endpoint, jwt)
                .then(response => {
                    if (response.idInteraccion != null) {
                        console.log(`call - ${response.idInteraccion}`);
                        return [response.idInteraccion, "Conectando"];
                    } else {
                        console.log(`call sin ruta - ${response.idInteraccion}`);
                        return [null, "Preview"];
                    }
                })
                .catch(error => {
                    console.error("Error realizando la llamada:", error);
                    return [null, "Preview"];

                });
        } catch (error) {
            console.error(`Error on call/callOnInteraccion: ${error}`);
            return [null, "Preview"];

        }
    },
    /**
     * @method hangup cortar llamada
     * @param {idInteraccion} idInteraccion - idInteraccion de la llamada en curso
     * @return {}
    **/
    hangup: async (idInteraccion) => {
        try {
            let loginId = String(await mitrol.getUrlParams("loginId"))
            const endpoint = `/api/${loginId}/hangup?idInteraccion=${idInteraccion}`
            console.log(`hangup - endpoint ${endpoint}`)
            let jwt = String(await mitrol.getUrlParams("jwt"))
            let response = await mitrol.post(endpoint, jwt)
            console.log(`hangup - El response es: ${JSON.stringify(response)}`)
            if (response.value == "Success") {
                console.log(`hangup - success`)
                return true
            } else {
                console.log(`hangup - failed`)
                return false
            }
        } catch (error) {
            console.error(`Error on hangup: ${error}`)
            return false
        }
    },
    /**
    * @method hold pausar llamada
    * @param {idInteraccion} idInteraccion - idInteraccion de la llamada en curso
    * @return {}
    **/
    hold: async (idInteraccion) => {
        try {
            let loginId = String(await mitrol.getUrlParams("loginId"))
            const endpoint = `/api/${loginId}/hold?idInteraccion=${idInteraccion}`
            console.log(`hold - endpoint ${endpoint}`)
            let jwt = String(await mitrol.getUrlParams("jwt"))
            let response = await mitrol.post(endpoint, jwt)
            console.log(`hold - El response es: ${JSON.stringify(response)}`)
            if (response.value == "Success") {
                console.log(`hold - success`)
                return true
            } else {
                console.log(`hold - failed`)
                return false
            }
        } catch (error) {
            console.error(`Error on hold: ${error}`)
            return null
        }
    },
    /**
    * @method resume reanudar llamada
    * @param {idInteraccion} idInteraccion - idInteraccion de la llamada en curso
    * @return {}
    **/
    resume: async (idInteraccion) => {
        try {
            let loginId = String(await mitrol.getUrlParams("loginId"))
            const endpoint = `/api/${loginId}/resume?idInteraccion=${idInteraccion}`
            console.log(`resume - endpoint ${endpoint}`)
            let jwt = String(await mitrol.getUrlParams("jwt"))
            let response = await mitrol.post(endpoint, jwt)
            console.log(`resume - El response es: ${JSON.stringify(response)}`)
            if (response.value == "Success") {
                console.log(`resume - success`)
                return true
            } else {
                console.log(`resume - failed`)
                return false
            }
        } catch (error) {
            console.error(`Error on resume: ${error}`)
            return null
        }
    },
    /**
   * @method getResultadoGestion return ordered tree object of resultadosGestion
   * @param {Array} resultadosGestion - resultadosGestion to be ordered by previous db query
   * @return {}
   **/
    getResultadoGestion: async (resultadosGestion) => {
        try {
            let parents = []
            let children = []
            for (let i = 0; i < resultadosGestion.length; i++) {
                if (!parents.some(parent => parent.name === resultadosGestion[i]['parent_name'] && parent.code === resultadosGestion[i]['parent_name'])) {
                    parents.push({ "name": resultadosGestion[i]['parent_name'], "code": resultadosGestion[i]['parent_name'] })
                }
                if (!children.some(child => child.name === resultadosGestion[i]['child_name'] && child.code === resultadosGestion[i]['idResultadoGestionChild'])) {
                    children.push({ "name": resultadosGestion[i]['child_name'], "code": resultadosGestion[i]['idResultadoGestionChild'] })
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
    * @method setResultadoUI return ordered tree object of resultadosGestion
    * @param {Array} resultadosGestion - resultadosGestion to be ordered by previous db query
    * @param {varchar} selectPadre
    * @return {}
    **/
    setResultadoUI: async (resultadosGestion, selectPadre) => {
        try {
            let children = []
            for (let i = 0; i < resultadosGestion.length; i++) {
                if (selectPadre === resultadosGestion[i]['parent_name']) {
                    children.push({ "name": resultadosGestion[i]['child_name'], "code": resultadosGestion[i]['idResultadoGestionChild'] })
                }
            }
            console.log(`setUIResultadoGestion - ${JSON.stringify(children)}`)
            return children
        } catch (error) {
            console.error(`Error on setUIResultadoChild: ${error}`)
            return null
        }
    },
    /**
    * @method setResultadoGestion
    * @param {varchar} idInteraccion - idInteraccion 
    * @param {}idCliente
    * @param {varchar} idResultadoGestionInterno- ID of resultado gestion to be set
    * @return {bool} 
    **/
    setResultadoGestion: async (idInteraccion, idCliente, idResultadoGestion) => {
        try {
            let loginId = String(await mitrol.getUrlParams("loginId"))
            const endpoint = `/api/${loginId}/interactionresult?idInteraccion=${idInteraccion}&crmId=${idCliente}&idResultadoGestionInterno=${idResultadoGestion}&idResultadoGestionExterno=${idResultadoGestion}`
            let jwt = String(await mitrol.getUrlParams("jwt"))
            let response = await mitrol.get(endpoint, jwt)
            console.log(`setResultadoGestion - ${JSON.stringify(response)}`)
            if (response.code == 0) {
                console.log(`setResultadoGestion - success`)
                await mitrol.closeinteraction(idInteraccion)
            } else {
                console.log(`setResultadoGestion - failed`)
                return false
            }
        } catch (error) {
            console.error(`Error on setResultadoGestion: ${error}`)
            return null
        }
    },
    /**
    * @method resume return ordered tree object of resultadosGestion
    * @param {varchar} idInteraccion idInteraccion
    * @return {bool}
    **/
    closeinteraction: async (idInteraccion) => {
        try {
            let loginId = String(await mitrol.getUrlParams("loginId"))
            const endpoint = `/api/${loginId}/closeinteraction?idInteraccion=${idInteraccion}`
            console.log(`closeinteraction - endpoint ${endpoint}`)
            let jwt = String(await mitrol.getUrlParams("jwt"))
            let response = await mitrol.get(endpoint, jwt)
            console.log(`closeinteraction - El response es: ${JSON.stringify(response)}`)
            if (response.value == "Success") {
                console.log(`closeinteraction - interaccion cerrada`)
                return true
            } else {
                console.log(`closeinteraction - no se pudo cerrar la interaccion`)
                return false
            }
        } catch (error) {
            console.error(`Error on closeinteraction: ${error}`)
            return null
        }
    },
}
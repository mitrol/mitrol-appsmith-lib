call: async (client) => {
    try {
        let loginId = mitrol.getUrlParams("loginId");
        let idCampania = mitrol.getUrlParams("idCampania");
        let idInteraccion = mitrol.getUrlParams("idLlamada");
        let jwt = mitrol.getUrlParams("jwt");
        let endpoint;
        if (mitrol.estadoAgente === "Preview") {
            console.log("call");
            endpoint = `/api/${loginId}/call?idCampania=${idCampania}&destino=${client}`;
            console.log(`call - calling endpoint ${endpoint}`);
        } else {
            console.log("callOnInteraction");
            endpoint = `/api/${loginId}/call?idCampania=${idCampania}&destino=${client}&interactionId=${idInteraccion}`;
            console.log(`callOnInteraccion - calling endpoint ${endpoint}`);
        }
        return mitrol.post(endpoint, jwt)
            .then(response => {
                console.log(`call - El response es: ${JSON.stringify(response)}`);
                if (response.code == 0) {
                    console.log(`call - ${response.idInteraccion}`);
                    return [response.idInteraccion, response.code];
                } else { 
                    console.log(`call sin ruta - ${response.idInteraccion}`);
                    return [null, response.code];
                }
            })
            .catch(error => {
                console.error("Error realizando la llamada:", error);
                return [null, null];
            });
    } catch (error) {
        console.error(`Error on call/callOnInteraccion: ${error}`);
        return [null, null];
    }
},

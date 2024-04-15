/**
 * @module requests Provides methods to interact with webpad API
 */

/**
 * @method post Call endpoint POST
 * @param {endpoint} string , endpoint to call
 * @param {jwt} string , jwt token
 * @return {Promise} Promise object represents the response of the call
 */
export const post = async (endpoint, jwt) => {

		let urlParam = appsmith.URL.fullPath
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
		const response = await fetch(globals.apiUrl+endpoint , requestOptions)
		return await response.json()
	};

/**
 * @method get Call endpoint GET
 * @param {endpoint} string , endpoint to call
 * @param {jwt} string , jwt token
 * @return {Promise} Promise object represents the response of the call
 */
export const get = async (endpoint, jwt) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", "Bearer "+ jwt);
	//req opts
	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	};

	//exec fetch concatenating global url with specific endpoint
    //TODO: fix apiURL global
	const response = await fetch(globals.apiUrl+endpoint , requestOptions)
	return await response.json()
	};

export default {
	post,
	get,
}
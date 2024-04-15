export const getUrlParams = async (param) => {
	var paramValue = "";
	var copyParam = "";
	var isParam = false;
	var isParamValue = false;
	let url = window.location.href;
	console.log(`getUrlParams - url: ${url}`)
	for(let i = 0; url[i] !== undefined; i++) {
		// Check the word character per character
		if (!isParamValue) {
			if (url[i] === param[copyParam.length]) {
				copyParam += url[i];
				isParam = copyParam === param;
				if (isParam) {
					i++;  // Skip over the "="
					isParamValue = true;
				}
			} else {
				copyParam = "";
			}
		} else {
			if (url[i] === '&' || url[i] === undefined) {
				break;
			}
			paramValue += url[i];
		}
	}
	return paramValue;
};

export default {
	getUrlParams,
	fullUrl: window.location.href,
	apiUrl: ""
}
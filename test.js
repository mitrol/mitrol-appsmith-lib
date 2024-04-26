const fetch = require('node-fetch');
async function query(data) {
    const response = await fetch(
        "http://10.30.0.20:4052/api/v1/prediction/0e7acde8-2be5-4daf-82d4-daa687c01410",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    const result = await response.json();
    return result;
}

query({"question": "cual es la primer charla del dia 8 de mayo"}).then((response) => {
    console.log(response);
    toolToUse= response['usedTools'][0]['tool']
});
const api_url = 'https://api.logmeal.com:443/docs/logmeal_swagger_openapi_v2.yaml'

const response = await fetch(api_url)
const data = response.json();
console.log(data);
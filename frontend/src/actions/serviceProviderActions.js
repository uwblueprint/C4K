import { LOAD_SERVICE_PROVIDERS } from './actionsTypes';

export const getServiceProviders = (token) => {
    const url = new URL('http://localhost:8080/service_providers')

    // Send request without token if none is provided
    if (token) {
        const params = {id_token: token}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    }

    return function(dispatch) {
        fetch(url, {
            mode: 'no-cors'
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(json) {
            return json.data
        })
        .then(function(data) {
            dispatch({
                type: LOAD_SERVICE_PROVIDERS,
                service_providers: data
            })
        })
    }
}

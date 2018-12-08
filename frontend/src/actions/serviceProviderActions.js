import { LOAD_SERVICE_PROVIDERS } from './actionsTypes';

export const getServiceProviders = (token) => {
    // Attatch id_token to service provider call if provided
    const url = '/service_providers' + (token ? '?id_token=' + token : '')

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

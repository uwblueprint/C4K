import { LOAD_SERVICE_PROVIDERS } from './actionsTypes';

function getServiceProviders() {
    return function(dispatch) {
        fetch('/service_providers', {
            mode: 'no-cors'
        })
        .then(function(response) {
            return response.json
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

export const getServiceProviders;

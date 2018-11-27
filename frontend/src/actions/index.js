const LOAD_SERVICE_PROVIDERS = 'LOAD_SERVICE_PROVIDERS'

function set_service_providers() {
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

export {
  LOAD_SERVICE_PROVIDERS,
  set_service_providers
}

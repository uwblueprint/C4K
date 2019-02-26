import {
  LOAD_SERVICE_PROVIDERS,
} from './actionsTypes';

export const getServiceProviders = (token) => {
  // Attach id_token to service provider call if provided
  const url = '/service_providers' + (token ? '?id_token=' + token : '')

  return (dispatch) => {
    fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      return json.data
    })
    .then((data) => {
      dispatch({
        type: LOAD_SERVICE_PROVIDERS,
        service_providers: data
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }
}

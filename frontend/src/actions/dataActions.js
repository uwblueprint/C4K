import {
  LOAD_SERVICE_PROVIDERS,
  LOAD_CENSUS_DIVISION_DATA
} from './actionsTypes';

export const getServiceProviders = (token) => {
  // Attach id_token to service provider call if provided
  const url = '/service_providers' + (token ? '?id_token=' + token : '')

  return (dispatch) => {
    fetch(url)
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

export const getCensusDivisionData = () => {
  // TODO: add id_token authentication
  return (dispatch) => {
    fetch('/census_division_aggregate')
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        return json.data
      })
      .then((data) => {
        dispatch({
          type: LOAD_CENSUS_DIVISION_DATA,
          censusDivisionData: data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

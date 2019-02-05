import {
  LOAD_CENSUS_DIVISION_DATA,
  SELECT_CENSUS_DIVISION
} from './actionsTypes';

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
        const censusDivisionMap = {}
        data.forEach((cd) => {
          censusDivisionMap[cd.id] = cd
        })
        dispatch({
          type: LOAD_CENSUS_DIVISION_DATA,
          censusDivisionData: censusDivisionMap
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export const selectCensusDivision = (censusDivisionId) => {
  return {
    type: SELECT_CENSUS_DIVISION,
    payload: censusDivisionId
  }
}

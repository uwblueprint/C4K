import {
  LOAD_CENSUS_DIVISION_DATA
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
        for (var cd in data) {
          censusDivisionMap[cd.id] = cd
        }
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

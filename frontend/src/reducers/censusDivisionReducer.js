import {
  LOAD_CENSUS_DIVISION_DATA
} from '../actions/actionsTypes'

const censusDivisionReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_CENSUS_DIVISION_DATA:
      return action.censusDivisionData
    default:
      return state
  }
}

export default censusDivisionReducer

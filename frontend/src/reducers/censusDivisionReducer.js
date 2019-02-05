import {
  LOAD_CENSUS_DIVISION_DATA,
  SELECT_CENSUS_DIVISION
} from '../actions/actionsTypes'

const censusDivisionReducer = (state = {
  data: {},
  selected: null
}, action) => {
  switch (action.type) {
    case LOAD_CENSUS_DIVISION_DATA:
      return {
        ...state,
        data: action.censusDivisionData
      }
    case SELECT_CENSUS_DIVISION:
      return {
        ...state,
        selected: action.payload
      }
    default:
      return state
  }
}

export default censusDivisionReducer

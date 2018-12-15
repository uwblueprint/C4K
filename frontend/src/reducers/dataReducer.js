import { 
  LOAD_SERVICE_PROVIDERS,
  LOAD_CENSUS_DIVISION_DATA
} from '../actions/actionsTypes'

const initialState = {
  serviceProviders: [],
  censusDivisionData: {}
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SERVICE_PROVIDERS:
      return {
        ...state,
        serviceProviders: action.service_providers
      }
    case LOAD_CENSUS_DIVISION_DATA:
      const censusDivisionData = {}
      for (var cd in action.censusDivisionData) {
        censusDivisionData[cd.id] = cd
      }

      return {
        ...state,
        censusDivisionData: censusDivisionData
      }
    default:
      return state
  }
}

export default dataReducer;

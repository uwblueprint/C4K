import { SELECT_CENSUS_DIVISION } from '../actions/actionsTypes';

export default (state = { selectedCensusDivision: 3520}, action) => {
    switch (action.type) {
        case SELECT_CENSUS_DIVISION:
            return {
            	...state,
                selectedCensusDivision: action.payload
            }
        default:
            return state;
    }
}
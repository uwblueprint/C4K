import { 
	CHANGE_CENSUS_DIVISION,
	CHANGE_DEMOGRAPHIC,
} from '../actions/actionsTypes';
import { initialDropDownState } from './initialState';

export default (state = initialDropDownState, action) => {
    switch (action.type) {
        case CHANGE_CENSUS_DIVISION:
            return {
            	...state,
            	censusDivision: action.payload
            }
        case CHANGE_DEMOGRAPHIC:
        		return {
        			...state,
        			demographic: action.payload
        		}
        default:
            return state;
    }
}
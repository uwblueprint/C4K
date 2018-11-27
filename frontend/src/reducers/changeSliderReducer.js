import { 
	CHANGE_OPERATING_BUDGET,
	CHANGE_CLIENT_SERVED,
    CHANGE_STAFF_COUNT,
} from '../actions/actionsTypes';
import { initialSliderVals } from './initialState';

export default (state = initialSliderVals, action) => {
    switch (action.type) {
        case CHANGE_OPERATING_BUDGET:
            return {
            	...state,
            	operatingBudget: action.payload
            }

        case CHANGE_CLIENT_SERVED:
        		return {
        			...state,
        			clientServed: action.payload
        		}

        case CHANGE_STAFF_COUNT:
                return {
                    ...state,
                    staffCount: action.payload
                }
                
        default:
            return state;
    }
}
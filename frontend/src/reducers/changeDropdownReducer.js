import { 
	CHANGE_DEMOGRAPHIC,
} from '../actions/actionsTypes';

export default (state = {
  demographic: 'Aboriginal'
}, action) => {
    switch (action.type) {
        case CHANGE_DEMOGRAPHIC:
        		return {
        			...state,
        			demographic: action.payload
        		}
        default:
            return state;
    }
}

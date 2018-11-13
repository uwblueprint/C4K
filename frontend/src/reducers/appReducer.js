import { CHANGE_VIEW } from '../actions/actionsTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_VIEW:
            console.log(state.view);
            return {
            	...state,
                view: action.payload
            }
        default:
            return state
    }
}
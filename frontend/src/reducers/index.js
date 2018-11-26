import { combineReducers } from 'redux';
import emptyReducer from './empty';
import user from './user';

export default combineReducers({
    emptyReducer,
    user
});
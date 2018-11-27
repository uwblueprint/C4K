import { combineReducers } from 'redux';
import user from './authReducer';
import empty from './empty';

export default combineReducers({
    empty,
    user
});

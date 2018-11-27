import { combineReducers } from 'redux';
import changeViewReducer from './changeViewReducer';
import changeDropdownReducer from './changeDropdownReducer';
import changeSliderReducer from './changeSliderReducer';
import authReducer from './authReducer';

export default combineReducers({
    changeViewReducer,
    changeDropdownReducer,
    changeSliderReducer,
    authReducer,
});

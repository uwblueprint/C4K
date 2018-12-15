import { combineReducers } from 'redux';
import changeViewReducer from './changeViewReducer';
import changeDropdownReducer from './changeDropdownReducer';
import changeSliderReducer from './changeSliderReducer';
import selectCensusDivisionReducer from './selectCensusDivisionReducer'
import authReducer from './authReducer';
import dataReducer from './dataReducer';

export default combineReducers({
    changeViewReducer,
    changeDropdownReducer,
    changeSliderReducer,
    authReducer,
    dataReducer,
    selectCensusDivisionReducer,
});

import { combineReducers } from 'redux';
import changeViewReducer from './changeViewReducer';
import changeDropdownReducer from './changeDropdownReducer';
import changeSliderReducer from './changeSliderReducer';
import selectCensusDivisionReducer from './selectCensusDivisionReducer'
import authReducer from './authReducer';
import serviceProviderReducer from './serviceProviderReducer';
import censusDivisionReducer from './censusDivisionReducer';

export default combineReducers({
  changeViewReducer,
  changeDropdownReducer,
  changeSliderReducer,
  authReducer,
  serviceProviderReducer,
  censusDivisionReducer,
  selectCensusDivisionReducer,
});

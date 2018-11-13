import { combineReducers } from 'redux';
import emptyReducer from './empty';
import appReducer from './appReducer';

export default combineReducers({
    emptyReducer,
    appReducer
});
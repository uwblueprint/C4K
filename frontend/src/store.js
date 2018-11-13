import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import * as constants from './constants/constants';

export function configureStore() {
 return createStore(
  reducers,
   applyMiddleware(thunk)
 );
}

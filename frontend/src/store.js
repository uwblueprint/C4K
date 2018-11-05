import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as reducer from './reducers';

export default function configureStore() {
 return createStore(
  reducer,
   applyMiddleware(thunk)
 );
}

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import * as actions from './actions';

export default function configureStore() {
  var store = createStore(
    reducers,
    applyMiddleware(thunk)
  );

  store.dispatch(actions.set_service_providers())
  return store
}

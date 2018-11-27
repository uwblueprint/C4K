import * as actions from '../actions'

export default (state = {}, action) => {
  switch (action.type) {
    case actions.LOAD_SERVICE_PROVIDERS:
      return Object.assign({}, state, {
        service_providers: action.service_providers
      })
    default:
      return state
  }
}

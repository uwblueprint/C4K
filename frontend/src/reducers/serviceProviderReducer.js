import { LOAD_SERVICE_PROVIDERS } from '../actions/actionsTypes'

const serviceProviderReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_SERVICE_PROVIDERS:
            return action.service_providers
        default:
            return state
    }
}

export default serviceProviderReducer;
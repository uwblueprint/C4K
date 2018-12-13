export default (state = {}, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                name: action.user.displayName,
                email: action.user.email,
                phoneNumber: action.user.phoneNumber,
                photoURL: action.user.photoURL,
                token: action.user.token
            }
        case 'SIGN_OUT':
            return {
                result: null
            }
        default:
            return state
    }
}
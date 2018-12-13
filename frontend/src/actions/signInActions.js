import { SIGN_IN } from './actionsTypes';

export const signIn = user => ({
    type: SIGN_IN,
    user
})

import { SIGN_IN, SIGN_OUT } from './type';

export const signIn = (userId, name) => {
    return {
        type: SIGN_IN,
        payload: { userId, name }
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};
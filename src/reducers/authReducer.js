import { SIGN_IN, SIGN_OUT } from '../actions/type'

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null,
    userName: ''
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, userId: action.payload.userId, userName: action.payload.name}
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userId: null, userName: '' }
        default:
            return state;
    }
};
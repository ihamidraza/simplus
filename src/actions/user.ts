import * as types from './types';

export const setUser = (user: {}) => {
	return (dispatch: Function) => {
        if(!user || (user && user.profileObj)){
            dispatch(success(user.profileObj))
        }
        else {
            dispatch(failure(user))
        }
	}
}
const success = payload => {
	return {
		type: types.LOGIN_SUCCESS,
		payload
	};
}

const failure = payload => {
	return {
		type: types.LOGIN_FAILURE,
		payload
	};
}
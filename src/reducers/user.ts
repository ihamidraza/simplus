import * as types from '../actions/types';
export const user = (state: {} = null, action: Function) => {
	switch (action.type) {
	case types.LOGIN_SUCCESS:
		return action.payload
    case types.LOGIN_FAILURE:
    return action.payload
    default:
    return state
  }
}

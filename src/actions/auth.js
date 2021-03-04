import { getUidFromJWT } from 'helpers/authHelpers';
import { auth, users, me } from '../api';

export const login = (username, password) => {
	const res = auth.login(username, password)
	return (dispatch) => {
		let response = dispatch({
			type: 'LOGIN',
			payload: res,
		})

		response.then((loginData) => {
			const token = loginData?.value?.idToken
			if (token) {
				dispatch(getCurrentUser(getUidFromJWT(token)))
			}
		})
	}
}

export const logout = () => {
	return {
		type: 'LOGOUT',
		payload: undefined
	}
}

export const getCurrentUser = (uid) => {
	const res = me.profile(uid)
	console.log(res)
	return {
		type: 'GET_CURRENT_USER',
		payload: res,
	}
}

export const clearAuthErrors = (uid) => {
	return {
		type: 'CLEAR_AUTH_ERRORS',
	}
}
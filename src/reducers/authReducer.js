import moment from 'moment';

const initalState = {
	request: { pending: false, error: false, fulfilled: false },
	authData: {
		token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
		currentUser: undefined,
	},
};

export default function reducer(state = initalState, action) {
	switch (action.type) {
		case 'LOGIN':
			break;
		case 'LOGIN_PENDING':
			return {
				...state,
				request: { ...state.request, pending: true, error: undefined, fulfilled: false }
			};
		case 'LOGIN_REJECTED':
			return {
				...state,
				request: { ...state.request, pending: false, error: { ...action.payload.message, code: action.payload.code }, fulfilled: false }
			};
		case 'LOGIN_FULFILLED':
			// const expiresAt = moment().add(action.payload.expiresIn, 'second');
			localStorage.setItem('token', action.payload.message.token)
			// localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
			return {
				...state,
				request: { ...state.request, pending: false, error: undefined, fulfilled: true },
				authData: { ...state.authData, token: action.payload.message.token, currentUser: action.payload.message.user }
			}
		case 'GET_CURRENT_USER_PENDING':
			return {
				...state,
				request: { ...state.request, pending: true, error: undefined, fulfilled: false }
			};
		case 'GET_CURRENT_USER_REJECTED':
			return {
				...state,
				request: { ...state.request, pending: false, error: { ...action.payload.message, code: action.payload.code }, fulfilled: false }
			};
		case 'GET_CURRENT_USER_FULFILLED':
			return {
				...state,
				request: { ...state.request, pending: false, error: undefined, fulfilled: true },
				authData: { ...state.authData, currentUser: action.payload }
			}
		case 'LOGOUT':
			return {
				...state,
				request: { ...state.request, pending: false, error: undefined, fulfilled: true },
				authData: { ...state.authData, currentUser: undefined, token: '' }
			}
		case 'CLEAR_AUTH_ERRORS':
			return {
				...state,
				request: { ...state.request, pending: false, error: undefined, fulfilled: true },
			}
		default:
			return state;
	}
}
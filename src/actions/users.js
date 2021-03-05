import { position, users } from '../api';
export function listUsers(filter = { field: 'id', val: '' }, skip = 0, limit, orderby, clean = false, isSearch = true) {
	const queryObj = {}
	// if (filter?.field) queryObj.filterProp = filter?.field
	// if (filter?.val) queryObj.filterVal = filter?.val
	// if (skip) queryObj.skip = skip
	// if (limit) queryObj.limit = limit

	const res = users.list(queryObj)
	let type = clean ? 'SEARCH_USERS_CLEAN' : 'SEARCH_USERS'
	if (!isSearch) type = 'GET_USERS'
	return {
		type,
		payload: res
	}
}

export function getUser(id) {
	const res = users.get(id)
	return {
		type: 'GET_USER',
		payload: res
	}
}

export function createUser(user) {
	const res = users.create(user)

	return (dispatch) => {
		let response = dispatch({
			type: 'CREATE_USER',
			payload: res
		})
		response.then((data) => {
			dispatch(setUserNotification({ status: "success", message: "User created successfuly" }));
			dispatch(listUsers(undefined, undefined, 50, undefined, true));
			dispatch(setUserFormMode('edit'));
			dispatch(setUserErrors());
		}).catch(err => {
			console.log(err);
			dispatch(setUserNotification({ status: "error", message: "Error creating user" }));
		})
	}
}

export function getUserPosition(uid) {
	const res = position.userPosition(uid);
	return {
		type: 'GET_USER_POSITION',
		payload: res
	}
}


export function updateUser(user) {
	const res = users.update(user.id, user)

	return (dispatch) => {
		let response = dispatch({
			type: 'UPDATE_USER',
			payload: res
		})
		response.then((data) => {
			dispatch(setUserNotification({ status: "success", message: "User updated successfuly" }));
			dispatch(listUsers(undefined, undefined, 50, undefined, true));
			dispatch(setUserErrors());
		}).catch(err => {
			console.log(err);
			dispatch(setUserNotification({ status: "error", message: "Error updating user" }));
		})
	}
}

export function deleteUser(uid) {
	const res = users.delete(uid)

	return (dispatch) => {
		let response = dispatch({
			type: 'DELETE_USER',
			payload: res
		})
		response.then((data) => {
			dispatch(setUserNotification({ status: "success", message: "User deleted successfuly" }));
			dispatch(listUsers(undefined, undefined, 50, undefined, true));
		}).catch(err => {
			console.log(err);
			dispatch(setUserNotification({ status: "error", message: "Error deleting user" }));
		})
	}
}

export function clearSelectedUser() {
	return {
		type: 'CLEAR_USER',
		payload: undefined
	}
}

export function setUserErrors(errors = {}) {
	return {
		type: 'SET_USER_ERRORS',
		payload: errors
	}
}

export function setNewUserPassword(data) {
	const res = users.setPassword(data);

	return (dispatch) => {
		let response = dispatch({
			type: 'SET_USER_PASSWORD',
			payload: res
		})
		response.then((data) => {
			dispatch(setUserNotification({ status: "success", message: "User password changed" }));
			dispatch(setUserFormMode('edit'));
		}).catch(err => {
			console.log(err);
			dispatch(setUserNotification({ status: "error", message: "Error setting user password" }));
		})
	}
}

export function setUserNotification(notification) {
	return {
		type: 'SET_USER_NOTIFICATION',
		payload: notification
	}
}

export function setUserFormMode(mode) {
	return {
		type: 'SET_USER_FORM_MODE',
		payload: mode
	}
}

export function setUserRowsPerPage(rpp) {
	return {
		type: 'SET_USER_RPP',
		payload: rpp
	}
}


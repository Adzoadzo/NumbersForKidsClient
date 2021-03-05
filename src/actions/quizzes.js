import { quizzes } from "api"

export function listQuizzes(filter = { field: 'id', val: '' }, skip = 0, limit, orderby, clean = false, isSearch = true) {
	const queryObj = {}
	if (filter?.field) queryObj.filterProp = filter?.field
	if (filter?.val) queryObj.filterVal = filter?.val
	if (skip) queryObj.skip = skip
	if (limit) queryObj.limit = limit

	const res = quizzes.list(queryObj)
	let type = clean ? 'SEARCH_QUIZZES_CLEAN' : 'SEARCH_QUIZZES'
	if (!isSearch) type = 'GET_QUIZZES'
	return {
		type,
		payload: res
	}
}


export function getQuiz(id) {
	const res = quizzes.get(id)
	return {
		type: 'GET_QUIZ',
		payload: res
	}
}

export function clearSelectedQuiz() {
	return {
		type: 'CLEAR_QUIZ',
		payload: undefined
	}
}

export function setQuizErrors(errors = {}) {
	return {
		type: 'SET_QUIZ_ERRORS',
		payload: errors
	}
}


export function setQuizNotification(notification) {
	return {
		type: 'SET_QUIZ_NOTIFICATION',
		payload: notification
	}
}

export function setQuizFormMode(mode) {
	return {
		type: 'SET_QUIZ_FORM_MODE',
		payload: mode
	}
}

export function setQuizRowsPerPage(rpp) {
	return {
		type: 'SET_QUIZ_RPP',
		payload: rpp
	}
}

export function createQuiz(quiz) {
	const res = quizzes.create(quiz)

	return (dispatch) => {
		let response = dispatch({
			type: 'CREATE_QUIZ',
			payload: res
		})
		response.then((data) => {
			dispatch(setQuizNotification({ status: "success", message: "Quiz created successfuly" }));
			dispatch(listQuizzes(undefined, undefined, 50, undefined, true));
			dispatch(setQuizFormMode('edit'));
			dispatch(setQuizErrors());
		}).catch(err => {
			console.log(err);
			dispatch(setQuizNotification({ status: "error", message: "Error creating quiz" }));
		})
	}
}

export function updateQuiz(quiz) {
	const res = quizzes.update(quiz.id, quiz)

	return (dispatch) => {
		let response = dispatch({
			type: 'UPDATE_QUIZ',
			payload: res
		})
		response.then((data) => {
			dispatch(setQuizNotification({ status: "success", message: "Quiz updated successfuly" }));
			dispatch(listQuizzes(undefined, undefined, 50, undefined, true));
			dispatch(setQuizErrors());
		}).catch(err => {
			console.log(err);
			dispatch(setQuizNotification({ status: "error", message: "Error updating quiz" }));
		})
	}
}

export function deleteQuiz(id) {
	const res = quizzes.delete(id)

	return (dispatch) => {
		let response = dispatch({
			type: 'DELETE_QUIZ',
			payload: res
		})
		response.then((data) => {
			dispatch(setQuizNotification({ status: "success", message: "Quiz deleted successfuly" }));
			dispatch(listQuizzes(undefined, undefined, 50, undefined, true));
		}).catch(err => {
			console.log(err);
			dispatch(setQuizNotification({ status: "error", message: "Error deleting quiz" }));
		})
	}
}

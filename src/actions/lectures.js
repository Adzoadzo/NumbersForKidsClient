
export function setLectureNotification(notification) {
	return {
		type: 'SET_LECTURE_NOTIFICATION',
		payload: notification
	}
}

export function setLectureFormMode(mode) {
	return {
		type: 'SET_LECTURE_FORM_MODE',
		payload: mode
	}
}

export function setLectureRowsPerPage(rpp) {
	return {
		type: 'SET_LECTURE_RPP',
		payload: rpp
	}
}

export function clearSelectedLecture() {
	return {
		type: 'CLEAR_LECTURE',
		payload: undefined
	}
}

export function setLectureErrors(errors = {}) {
	return {
		type: 'SET_LECTURE_ERRORS',
		payload: errors
	}
}

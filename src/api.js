require('dotenv').config();

const BASE_URL = process.env.REACT_APP_API_URL

const formatBody = (method, body) => {
	if (method === 'get') return {};
	else {
		return { body: JSON.stringify(body) }
	}
};

const request = async (method, url, body) => fetch(url, {
	method: method,
	headers:
	{
		"Authorization": "Bearer " + await localStorage.getItem("token"),
		"Content-Type": "application/json"
	},
	...formatBody(method, body)
}).then(async (res) => {
	if (res.ok) {
		return res.json();
	}
	else {
		throw { code: res.status, message: (await res.json()) };
	}
});

const get = (url = {}) => request('get', url);
const post = (url, body = {}) => request('post', url, body);
const put = (url, body = {}) => request('put', url, body);
const del = (url, body = {}) => request('delete', url, body);

const crud = (path) => ({
	create: (data) => post(`${BASE_URL}${path}`, data),
	update: (id, data) => put(`${BASE_URL}${path}/${id}`, data),
	delete: (id) => del(`${BASE_URL}${path}/${id}`),
	get: (id) => get(`${BASE_URL}${path}/${id}`),
	list: (params) => {
		const query = Object.keys(params).map(key => key + '=' + params[key]).join('&');
		return get(`${BASE_URL}${path}?${query}`)
	},
});

export const auth = {
	login: (username, password) => post(`${BASE_URL}/v1/auth/login`, { email: username, password }),
}


export const me = {
	...crud("/me"),
	profile: (userUid) => get(`${BASE_URL}/v1/me/profile`),
}

export const users = {
	...crud("/v1/teacher/users"),
	getRelatives: (userUid) => get(`${BASE_URL}/admin/relative/${userUid}`),
	setPassword: (data) => post(`${BASE_URL}/admin/user/set-password`, data)
}

export const quizzes = {
	...crud("/v1/teacher/quizzes"),
	submitQuiz: (data) => post(`${BASE_URL}/admin/user/set-password`, data),
}

export const position = {
	userPosition: (uuid) => get(`${BASE_URL}/position/${uuid}`),
}


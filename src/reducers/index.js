import { combineReducers } from 'redux';

import devices from './deviceReducer';
import lectures from './lectureReducer.js';
import quizzes from './quizReducer.js';
import users from './userReducer';
import auth from './authReducer';

export default combineReducers({
    devices,
    users,
    auth,
    lectures,
    quizzes
});
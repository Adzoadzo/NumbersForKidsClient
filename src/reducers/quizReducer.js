const initalState = {
    request: { pending: false, error: false, fulfilled: false, loading: false },
    quizData: [],
    totalCount: 0,
    quizSearchResult: [],
    selectedQuiz: undefined,
    errors: {},
    notification: undefined,
    mode: undefined,
    rowsPerPage: 5,
    correct: undefined
};

export default function reducer(state = initalState, action) {
    switch (action.type) {
        /* SEARCH QUIZZES */
        case 'SEARCH_QUIZZES_PENDING':
        case 'SEARCH_QUIZZES_CLEAN_PENDING':
            return {
                ...state,
                request: { ...state.request, pending: true, error: false, fulfilled: false, loading: false }
            };
        case 'SEARCH_QUIZZES_REJECTED':
        case 'SEARCH_QUIZZES_CLEAN_REJECTED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: true, fulfilled: false, loading: false },
                quizSearchResult: []
            };
        case 'SEARCH_QUIZZES_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true, loading: false },
                quizSearchResult: [...state.quizSearchResult, ...action.payload],
                pagination: action.payload.pagination
            }
        case 'SEARCH_QUIZZES_CLEAN_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true, loading: false },
                quizSearchResult: action.payload,
                pagination: action.payload.pagination
            }
        /* SEARCH QUIZ END */

        /* GET MULTIPLE QUIZ */
        case 'GET_QUIZZES':
            break;
        case 'GET_QUIZZES_PENDING':
            return {
                ...state,
                request: { ...state.request, pending: true, error: false, fulfilled: false }
            };
        case 'GET_QUIZZES_REJECTED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: true, fulfilled: false }
            };
        case 'GET_QUIZZES_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                quizData: action.payload
            }
        /* GET MULTIPLE QUIZZES END */

        /* GET SINGLE QUIZ */
        case 'GET_QUIZ_PENDING':
            return {
                ...state,
                request: { ...state.request, pending: true, error: false, fulfilled: false }
            };
        case 'GET_QUIZ_REJECTED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: true, fulfilled: false }
            };
        case 'GET_QUIZ_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                selectedQuiz: action.payload
            }
        /* GET SINGLE QUIZ END */



        /* CREATE SINGLE QUIZZES */
        case 'CREATE_QUIZ_PENDING':
            return {
                ...state,
                request: { ...state.request, pending: true, error: false, fulfilled: false }
            };
        case 'CREATE_QUIZ_REJECTED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: true, fulfilled: false }
            };
        case 'CREATE_QUIZ_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                selectedQuiz: action.payload
            }
        /* CREATE SINGLE QUIZ */

        /* UPDATE SINGLE QUIZ */
        case 'UPDATE_QUIZ_PENDING':
            return {
                ...state,
                request: { ...state.request, pending: true, error: false, fulfilled: false }
            };
        case 'UPDATE_QUIZ_REJECTED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: true, fulfilled: false }
            };
        case 'UPDATE_QUIZ_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                selectedQuiz: action.payload
            }
        /* UPDATE SINGLE QUIZ */

        /* DELETE SINGLE QUIZ */
        case 'DELETE_QUIZ_PENDING':
            return {
                ...state,
                request: { ...state.request, pending: true, error: false, fulfilled: false }
            };
        case 'DELETE_QUIZ_REJECTED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: true, fulfilled: false }
            };
        case 'DELETE_QUIZ_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
            }
        /* DELETE SINGLE QUIZ */
        case 'CLEAR_QUIZ':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                selectedQuiz: undefined
            }
        case 'SET_QUIZ_ERRORS':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                errors: action.payload
            }
        case 'SET_QUIZ_NOTIFICATION':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                notification: action.payload
            }
        case 'SET_QUIZ_FORM_MODE':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                mode: action.payload
            }
        case 'SET_QUIZ_RPP':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                rowsPerPage: action.payload
            }
        case 'SUBMIT_QUIZ_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                correct: action.payload.correctAnswers
            }
        default:
            return state;
    }
}
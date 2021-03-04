const initalState = {
    request: { pending: false, error: false, fulfilled: false, loading: false },
    usersData: [],
    userSearchResult: [],
    totalCount: 0,
    relatives: [],
    selectedUser: undefined,
    errors: {},
    mode: undefined,
    rowsPerPage: 5
};

export default function reducer(state = initalState, action) {
    switch (action.type) {
        /* SEARCH  USERS */
        case 'SEARCH_USERS_PENDING':
        case 'SEARCH_USERS_CLEAN_PENDING':
            return {
                ...state,
                request: { ...state.request, pending: true, error: false, fulfilled: false, loading: true }
            };
        case 'SEARCH_USERS_CLEAN_REJECTED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: true, fulfilled: false, loading: true },
                userSearchResult: []
            };
        case 'SEARCH_USERS_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true, loading: false },
                userSearchResult: [...state.userSearchResult, ...action.payload],
            }
        case 'SEARCH_USERS_CLEAN_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true, loading: false },
                userSearchResult: action.payload,
            }
        /* SEARCH USERS END */

        /* GET MULTIPLE USERS */
        case 'GET_USERS':
            break;
        case 'GET_USERS_PENDING':
            return {
                ...state,
                request: { ...state.request, pending: true, error: false, fulfilled: false }
            };
        case 'GET_USERS_REJECTED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: true, fulfilled: false }
            };
        case 'GET_USERS_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                usersData: action.payload
            }
        /* GET MULTIPLE USERS END */

        /* GET SINGLE USER */
        case 'GET_USER_PENDING':
            return {
                ...state,
                request: { ...state.request, pending: true, error: false, fulfilled: false }
            };
        case 'GET_USER_REJECTED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: true, fulfilled: false }
            };
        case 'GET_USER_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                selectedUser: action.payload
            }
        /* GET SINGLE USER END */

        /* CREATE SINGLE USER */
        case 'CREATE_USER_PENDING':
            return {
                ...state,
                request: { ...state.request, pending: true, error: false, fulfilled: false }
            };
        case 'CREATE_USER_REJECTED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: true, fulfilled: false }
            };
        case 'CREATE_USER_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
            }
        /* CREATE SINGLE USER */

        /* UPDATE SINGLE USER */
        case 'UPDATE_USER_PENDING':
            return {
                ...state,
                request: { ...state.request, pending: true, error: false, fulfilled: false }
            };
        case 'UPDATE_USER_REJECTED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: true, fulfilled: false }
            };
        case 'UPDATE_USER_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
            }
        /* UPDATE SINGLE USER */

        /* DELETE SINGLE USER */
        case 'DELETE_USER_PENDING':
            return {
                ...state,
                request: { ...state.request, pending: true, error: false, fulfilled: false }
            };
        case 'DELETE_USER_REJECTED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: true, fulfilled: false }
            };
        case 'DELETE_USER_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
            }
        /* DELETE SINGLE USER */

        /* GET USER POSITION */
        case 'GET_USER_POSITION_PENDING':
            return {
                ...state,
                request: { ...state.request, pending: true, error: false, fulfilled: false }
            };
        case 'GET_USER_POSITION_REJECTED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: true, fulfilled: false }
            };
        case 'GET_USER_POSITION_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                selectedUserPosition: action.payload.length > 0 ? action.payload[action.payload.length - 1] : {}
            }
        /* GET USER POSITION END */

        /* GET USER RELATIVES */
        case 'GET_USER_RELATIVES_PENDING':
            return {
                ...state,
                request: { ...state.request, pending: true, error: false, fulfilled: false }
            };
        case 'GET_USER_RELATIVES_REJECTED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: true, fulfilled: false }
            };
        case 'GET_USER_RELATIVES_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                relatives: action.payload
            }
        /* LINK USER RELATIVES END */


        case 'CLEAR_USER':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                selectedUser: undefined,
                selectedUserPosition: undefined,
                relatives: []

            }
        case 'SET_USER_ERRORS':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                errors: action.payload
            }
        case 'SET_USER_PASSWORD':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
            }
        case 'SET_USER_NOTIFICATION':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                notification: action.payload
            }
        case 'SET_USER_FORM_MODE':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                mode: action.payload
            }
        case 'SET_USER_RPP':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                rowsPerPage: action.payload
            }
        default:
            return state;
    }
}
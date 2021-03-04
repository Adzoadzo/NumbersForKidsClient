const initalState = {
    request: { pending: false, error: false, fulfilled: false, loading: false },
    devicesData: [],
    totalCount: 0,
    deviceSearchResult: [],
    selectedDevice: undefined,
    errors: {},
    notification: undefined,
    mode: undefined,
    rowsPerPage: 5
};

export default function reducer(state = initalState, action) {
    switch (action.type) {
        /* SEARCH DEVICES */
        case 'SEARCH_DEVICES_PENDING':
        case 'SEARCH_DEVICES_CLEAN_PENDING':
            return {
                ...state,
                request: { ...state.request, pending: true, error: false, fulfilled: false, loading: false }
            };
        case 'SEARCH_DEVICES_REJECTED':
        case 'SEARCH_DEVICES_CLEAN_REJECTED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: true, fulfilled: false, loading: false },
                deviceSearchResult: []
            };
        case 'SEARCH_DEVICES_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true, loading: false },
                deviceSearchResult: [...state.deviceSearchResult, ...action.payload.data],
                pagination: action.payload.pagination
            }
        case 'SEARCH_DEVICES_CLEAN_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true, loading: false },
                deviceSearchResult: action.payload.data,
                pagination: action.payload.pagination
            }
        /* SEARCH DEVICES END */

        /* GET MULTIPLE DEVICES */
        case 'GET_DEVICES':
            break;
        case 'GET_DEVICES_PENDING':
            return {
                ...state,
                request: { ...state.request, pending: true, error: false, fulfilled: false }
            };
        case 'GET_DEVICES_REJECTED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: true, fulfilled: false }
            };
        case 'GET_DEVICES_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                devicesData: action.payload.data
            }
        /* GET MULTIPLE DEVICES END */

        /* GET SINGLE DEVICE */
        case 'GET_DEVICE_PENDING':
            return {
                ...state,
                request: { ...state.request, pending: true, error: false, fulfilled: false }
            };
        case 'GET_DEVICE_REJECTED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: true, fulfilled: false }
            };
        case 'GET_DEVICE_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                selectedDevice: action.payload
            }
        /* GET SINGLE DEVICE END */



        /* CREATE SINGLE DEVICE */
        case 'CREATE_DEVICE_PENDING':
            return {
                ...state,
                request: { ...state.request, pending: true, error: false, fulfilled: false }
            };
        case 'CREATE_DEVICE_REJECTED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: true, fulfilled: false }
            };
        case 'CREATE_DEVICE_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                selectedDevice: action.payload
            }
        /* CREATE SINGLE DEVICE */

        /* UPDATE SINGLE DEVICE */
        case 'UPDATE_DEVICE_PENDING':
            return {
                ...state,
                request: { ...state.request, pending: true, error: false, fulfilled: false }
            };
        case 'UPDATE_DEVICE_REJECTED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: true, fulfilled: false }
            };
        case 'UPDATE_DEVICE_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                selectedDevice: action.payload
            }
        /* UPDATE SINGLE DEVICE */

        /* DELETE SINGLE DEVICE */
        case 'DELETE_DEVICE_PENDING':
            return {
                ...state,
                request: { ...state.request, pending: true, error: false, fulfilled: false }
            };
        case 'DELETE_DEVICE_REJECTED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: true, fulfilled: false }
            };
        case 'DELETE_DEVICE_FULFILLED':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
            }
        /* DELETE SINGLE DEVICE */
        case 'CLEAR_DEVICE':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                selectedDevice: undefined
            }
        case 'SET_DEVICE_ERRORS':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                errors: action.payload
            }
        case 'SET_DEVICE_NOTIFICATION':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                notification: action.payload
            }
        case 'SET_DEVICE_FORM_MODE':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                mode: action.payload
            }
        case 'SET_DEVICE_RPP':
            return {
                ...state,
                request: { ...state.request, pending: false, error: false, fulfilled: true },
                rowsPerPage: action.payload
            }
        default:
            return state;
    }
}
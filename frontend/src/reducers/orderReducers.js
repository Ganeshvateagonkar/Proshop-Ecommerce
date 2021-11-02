import {
    CREATE_DETAILS_FAIL, CREATE_DETAILS_REQUEST,
    CREATE_DETAILS_SUCCESS, CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS,
    CREATE_PAY_FAIL, CREATE_PAY_REQUEST, CREATE_PAY_RESET,
    CREATE_PAY_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_RESET, ORDER_DELIVER_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_RESET,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_REQUEST,

    ORDER_LIST_SUCCESS
} from "../constants/orderConstants"


export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return { loading: true }
        case CREATE_ORDER_SUCCESS:
            return { loading: false, success: true, order: action.payload }
        case CREATE_ORDER_FAIL:
            return { loading: false, error: action.payload }

        default:
            return { state }
    }
}

export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case CREATE_DETAILS_REQUEST:
            return { ...state, loading: true }
        case CREATE_DETAILS_SUCCESS:
            return { loading: false, order: action.payload }
        case CREATE_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case CREATE_PAY_RESET:
            return {};
        default:
            return state;
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_PAY_REQUEST:
            return { loading: true }
        case CREATE_PAY_SUCCESS:
            return { loading: false, success: true }
        case CREATE_PAY_FAIL:
            return { loading: false, error: action.payload }
        case CREATE_PAY_RESET:
            return {};

        default:
            return state;
    }
}


export const orderListMyReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_MY_REQUEST:
            return { loading: true }
        case ORDER_LIST_MY_SUCCESS:
            return { loading: false, orders: action.payload }
        case ORDER_LIST_MY_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_LIST_MY_RESET:
            return { orders: [] }

        default:
            return state;
    }
}

export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return { loading: true }
        case ORDER_LIST_SUCCESS:
            return { loading: false, orders: action.payload }
        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload }


        default:
            return state;
    }
}

export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELIVER_REQUEST:
            return {
                loading: true,
            }
        case ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case ORDER_DELIVER_RESET:
            return {}
        default:
            return state
    }
}
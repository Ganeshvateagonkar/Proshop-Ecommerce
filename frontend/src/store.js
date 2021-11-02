import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    productCreateReducer, productDeleteReducer,
    productDetailsReducer, productListReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
    productUpdateReducer
} from './reducers/productReducers.js';
import { cartReducer } from './reducers/cartReducer.js';
import {
    userDeleteReducer, userDetailsReducer,
    userListReducer, userLoginReducer, userRegisterReducer,
    userUpdateProfileReducer, userUpdateReducer
} from './reducers/userReducers.js';
import {
    orderCreateReducer, orderDeliverReducer,
    orderDetailsReducer, orderListMyReducer,
    orderListReducer, orderPayReducer
} from './reducers/orderReducers.js';


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    orderDeliver: orderDeliverReducer,
    productTopRated: productTopRatedReducer,




});

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null;

const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {};

const intialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage,
        shippingAddress: shippingAddressFromLocalStorage
    },
    userLogin: { userInfo: userInfoFromLocalStorage },
};
const middleware = [thunk];
const store = createStore(
    reducer,
    intialState,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store;
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer, productclearReducer } from "./reducers/productReducers";
import thunk from "redux-thunk";
import Cookie from "js-cookie"
import { cartReducer, shippingReducer, paymentReducer, purchaseItemReducer } from "./reducers/cartReducers";
import { userSigninReducer, userRegisterReducer } from "./reducers/userReducers";
import { purchaseReducer } from "./reducers/purchaseReducers";

const cartItems = Cookie.getJSON("cartItems") || []; 
const userInfo = Cookie.getJSON("userInfo") || null;
const shipping = Cookie.getJSON("shipping") || {};
const payment = Cookie.getJSON("payment") || {};

const initialState ={cart: {cartItems}, userSignin: {userInfo}, shipping: {shipping}, payment: {payment} };
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    productClear: productclearReducer,
    purchaseList: purchaseReducer,
    shipping: shippingReducer,
    payment: paymentReducer,
    purchase: purchaseItemReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore (reducer, initialState, composeEnhancer(applyMiddleware(thunk)));


export default store;
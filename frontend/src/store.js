import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import Cookies from "js-cookie";
import { cartReducer } from "./redux/reducers/cartReducers";
import {
	productListReducer,
	productDetailsReducer,
	productSaveReducer,
	productDeleteReducer,
} from "./redux/reducers/productReducers";
import { userRegisterReducer, userSigninReducer } from "./redux/reducers/userReducers";

// const cartItems = Cookies.getJSON("cartItems") || [];
// const userInfo = Cookies.getJSON("userInfo") || null;

const cartItems = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

const userInfo = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

const initialState = {
	cart: { cartItems, shipping: {}, payment: {} },
	userSignin: { userInfo },
};

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userSignin: userSigninReducer,
	userRegister: userRegisterReducer,
	productSave: productSaveReducer,
	productDelete: productDeleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;

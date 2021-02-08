import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import Cookies from "js-cookie";
import { cartReducer } from "./redux/reducers/cartReducers";
import {
	productListReducer,
	productDetailsReducer,
	productSaveReducer,
	productDeleteReducer,
	productCategoryListReducer,
	productCreateReducer,
	productReviewCreateReducer,
	productUpdateReducer,
} from "./redux/reducers/productReducers";
import {
	orderCreateReducer,
	orderDeleteReducer,
	orderDeliverReducer,
	orderDetailsReducer,
	orderListReducer,
	orderMineListReducer,
	orderPayReducer,
} from "./redux/reducers/orderReducers";
import {
	userRegisterReducer,
	userSigninReducer,
	userAddressMapReducer,
	userDeleteReducer,
	userDetailsReducer,
	userListReducer,
	userTopSellerListReducer,
	userUpdateProfileReducer,
	userUpdateReducer,
} from "./redux/reducers/userReducers";

// const cartItems = Cookies.getJSON("cartItems") || [];
// const userInfo = Cookies.getJSON("userInfo") || null;

const userInfo = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;
const cartItems = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];
const shippingAddress = localStorage.getItem("shippingAddress")
	? JSON.parse(localStorage.getItem("shippingAddress"))
	: {};

const initialState = {
	userSignin: { userInfo },
	cart: { cartItems, shippingAddress, paymentMethod: "PayPal" },
};

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userSignin: userSigninReducer,
	userRegister: userRegisterReducer,
	productSave: productSaveReducer,
	productDelete: productDeleteReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderMineList: orderMineListReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userUpdate: userUpdateReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	orderList: orderListReducer,
	orderDelete: orderDeleteReducer,
	orderDeliver: orderDeliverReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userTopSellersList: userTopSellerListReducer,
	productCategoryList: productCategoryListReducer,
	productReviewCreate: productReviewCreateReducer,
	userAddressMap: userAddressMapReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;

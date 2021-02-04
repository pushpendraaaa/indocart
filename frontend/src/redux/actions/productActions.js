import Axios from "axios";
import {
	PRODUCT_DELETE_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_SAVE_FAIL,
	PRODUCT_SAVE_REQUEST,
	PRODUCT_SAVE_SUCCESS,
} from "../constants/productConstants";

const listProducts = () => async (dispatch) => {
	dispatch({ type: PRODUCT_LIST_REQUEST });
	try {
		const { data } = await Axios.get("/api/products");
		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
	}
};

const saveProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
		const {
			userSignin: { userInfo },
		} = getState();
		if (!product._id) {
			const { data } = await Axios.post("/api/products", product, {
				headers: {
					Authorization: "Bearer " + userInfo.token,
				},
			});
			dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
		}
		const { data } = await Axios.put("/api/products/" + product._id, product, {
			headers: {
				Authorization: "Bearer " + userInfo.token,
			},
		});
		dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
	}
};

const detailsProduct = (productId) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
		const { data } = await Axios.get("/api/products/" + productId);
		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
	}
};

const deleteProduct = (productId) => async (dispatch, getState) => {
	const {
		userSignin: { userInfo },
	} = getState();
	try {
		dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
		const { data } = await Axios.delete("/api/products/" + productId, {
			headers: { Authorization: "Bearer " + userInfo.token },
		});
		dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
	}
};

export { listProducts, saveProduct, detailsProduct, deleteProduct };

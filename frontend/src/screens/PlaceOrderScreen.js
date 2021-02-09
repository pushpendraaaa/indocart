import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../redux/actions/orderActions";
import { ORDER_CREATE_RESET } from "../redux/constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function PlaceOrderScreen(props) {
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems, shippingAddress, paymentMethod } = cart;

	const orderCreate = useSelector((state) => state.orderCreate);
	const { loading, success, error, order } = orderCreate;

	if (!shippingAddress) {
		props.history.push("/shipping");
	} else if (!paymentMethod) {
		props.history.push("/payment");
	}

	const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
	cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.price * c.qty, 0));
	cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
	cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
	cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

	useEffect(() => {
		if (success) {
			props.history.push(`/order/${order._id}`);
			dispatch({ type: ORDER_CREATE_RESET });
		}
	}, [dispatch, order, props, success]);

	const placeOrderHandler = () => {
		dispatch(createOrder({ ...cart, orderItems: cartItems }));
	};

	return (
		<div>
			<CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
			<div className="placeorder">
				<div className="placeorder-info">
					<div>
						<h2>Shipping Address</h2>
						<br />
						<ul>
							<li>
								<strong>Name:</strong> {shippingAddress.fullName}
							</li>
							<li>
								<strong>Address:</strong> {shippingAddress.address},
								{shippingAddress.city},{shippingAddress.postalCode},
								{shippingAddress.country},
							</li>
						</ul>
					</div>
					<div>
						<h2>Payment Method</h2>
						<br />
						<strong>Payment Method:</strong> {paymentMethod}
					</div>
					<div>
						<ul className="cart-list-container">
							<li>
								<h2>Cart Items</h2>
								<div>
									<b>Price</b>
								</div>
							</li>
							{cartItems.length === 0 ? (
								<div>Cart is empty.</div>
							) : (
								cartItems.map((item) => (
									<li key={item.product}>
										<div className="cart-image">
											<img src={item.image} alt={item.name} />
										</div>
										<div className="cart-name">
											<div>
												<Link to={`/product/${item.product}`}>
													<b>{item.name}</b>
												</Link>
											</div>
											<div>
												{/* <div>Qty:{item.qty}</div> */}
												<strong>
													Qty:- {`0${item.qty}`} x ${item.price}{" "}
													= ${item.qty * item.price}
												</strong>
											</div>
										</div>
										<div className="cart-price">
											<b>${item.price}</b>
										</div>
									</li>
								))
							)}
						</ul>
					</div>
				</div>
				<div className="placeorder-action">
					<ul>
						<li>
							<button
								className="button primary full-width"
								onClick={() => placeOrderHandler()}
							>
								Place Order
							</button>
						</li>
						<br />
						{loading && <LoadingBox></LoadingBox>}
						{error && <MessageBox variant="danger">{error}</MessageBox>}
						<li>
							<h2>Order Summery</h2>
						</li>
						<li>
							<div>Item Price :</div>
							<div>${cart.itemsPrice.toFixed(2)}</div>
						</li>
						<li>
							<div>Shipping :</div>
							<div>${cart.shippingPrice.toFixed(2)}</div>
						</li>
						<li>
							<div>Tax :</div>
							<div>${cart.taxPrice.toFixed(2)}</div>
						</li>
						<li>
							<div>Order Total</div>
							<div>${cart.totalPrice.toFixed(2)}</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default PlaceOrderScreen;

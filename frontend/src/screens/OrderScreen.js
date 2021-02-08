import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../redux/actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from "../redux/constants/orderConstants";

export default function OrderScreen(props) {
	const dispatch = useDispatch();
	const orderId = props.match.params.id;

	const [sdkReady, setSdkReady] = useState(false);

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;

	const orderDeliver = useSelector((state) => state.orderDeliver);
	const {
		loading: loadingDeliver,
		error: errorDeliver,
		success: successDeliver,
	} = orderDeliver;

	useEffect(() => {
		const addPayPalScript = async () => {
			const { data } = await Axios.get("/api/config/paypal");
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};
		if (!order || successPay || successDeliver || (order && order._id !== orderId)) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch({ type: ORDER_DELIVER_RESET });
			dispatch(detailsOrder(orderId));
		} else {
			if (!order.isPaid) {
				if (!window.paypal) {
					addPayPalScript();
				} else {
					setSdkReady(true);
				}
			}
		}
	}, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

	const successPaymentHandler = (paymentResult) => {
		dispatch(payOrder(order, paymentResult));
	};
	const deliverHandler = () => {
		dispatch(deliverOrder(order._id));
	};

	return loading ? (
		<LoadingBox></LoadingBox>
	) : error ? (
		<MessageBox variant="danger">{error}</MessageBox>
	) : (
		<div>
			<h2>Order: {order._id}</h2>
			<div className="order">
				<div className="order-info">
					<div>
						<h2>Shipping</h2>
						<br />
						<ul>
							<li>
								<strong>Name:</strong> {order.shippingAddress.fullName}{" "}
								<br />
								<strong>Address: </strong> {order.shippingAddress.address}
								,{order.shippingAddress.city},{" "}
								{order.shippingAddress.postalCode},
								{order.shippingAddress.country}
							</li>
						</ul>
						<br />
						{order.isDelivered ? (
							<MessageBox variant="success">
								Delivered at {order.deliveredAt}
							</MessageBox>
						) : (
							<MessageBox variant="danger">Not Delivered</MessageBox>
						)}
					</div>
					<div>
						<h2>Payment Method</h2>
						<br />
						<ul>
							<li>
								<strong>Payment Method:</strong> {order.paymentMethod}
							</li>
						</ul>
						<br />
						{order.isPaid ? (
							<MessageBox variant="success">
								Paid at {order.paidAt}
							</MessageBox>
						) : (
							<MessageBox variant="danger">Not Paid</MessageBox>
						)}
					</div>
					<div>
						<h2>Order Items</h2>
						<br />
						<ul className="order-details-container">
							{order.orderItems.map((item) => (
								<li key={item.product}>
									<div>
										<img
											src={item.image}
											alt={item.name}
											className="small"
										></img>
									</div>
									<div className="cart-name min-30">
										<Link to={`/product/${item.product}`}>
											<strong>{item.name}</strong>
										</Link>
									</div>

									<div>
										<strong>
											{item.qty} x ${item.price} = $
											{item.qty * item.price}
										</strong>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="order-action">
					{!order.isPaid && (
						<li>
							{!sdkReady ? (
								<LoadingBox></LoadingBox>
							) : (
								<>
									{errorPay && (
										<MessageBox variant="danger">
											{errorPay}
										</MessageBox>
									)}
									{loadingPay && <LoadingBox></LoadingBox>}

									<PayPalButton
										amount={order.totalPrice}
										onSuccess={successPaymentHandler}
									></PayPalButton>
								</>
							)}
						</li>
					)}
					<ul>
						{userInfo.isAdmin && order.isPaid && !order.isDelivered && (
							<li>
								{loadingDeliver && <LoadingBox></LoadingBox>}
								{errorDeliver && (
									<MessageBox variant="danger">
										{errorDeliver}
									</MessageBox>
								)}
								<button
									type="button"
									className="button primary full-width"
									onClick={deliverHandler}
								>
									Deliver Order
								</button>
							</li>
						)}

						<li>
							<h2>Order Summary</h2>
						</li>
						<br />
						<li>
							<div>Item Price:</div>
							<div>${order.itemsPrice.toFixed(2)}</div>
						</li>
						<li>
							<div>Shipping:</div>
							<div>${order.shippingPrice.toFixed(2)}</div>
						</li>
						<li>
							<div>Tax:</div>
							<div>${order.taxPrice.toFixed(2)}</div>
						</li>
						<li>
							<div>
								<strong>Order Total</strong>
							</div>
							<div>
								<strong>${order.totalPrice.toFixed(2)}</strong>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

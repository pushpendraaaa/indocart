import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../redux/actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentMethodScreen(props) {
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	if (!shippingAddress.address) {
		props.history.push("/shipping");
	}

	const [paymentMethod, setPaymentMethod] = useState("PayPal");

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		props.history.push("/placeorder");
	};

	return (
		<div>
			<CheckoutSteps step1 step2 step3></CheckoutSteps>
			<div className="form">
				<form onSubmit={submitHandler}>
					<ul className="form-container">
						<li>
							<h2>Payment Method</h2>
						</li>
						<li className="paymentMethod">
							<span>
								<input
									type="radio"
									name="paymentMethod"
									id="paypal"
									value="PayPal"
									required
									checked
									onChange={(e) => {
										setPaymentMethod(e.target.value);
									}}
								/>
								<label htmlFor="paypal">PayPal</label>
							</span>
						</li>
						<li className="paymentMethod">
							<span>
								<input
									type="radio"
									name="paymentMethod"
									id="stripe"
									value="Stripe"
									required
									onChange={(e) => {
										setPaymentMethod(e.target.value);
									}}
								/>
								<label htmlFor="stripe">Stripe</label>
							</span>
						</li>
						<li>
							<button type="submit" className="button primary">
								Continue
							</button>
						</li>
					</ul>
				</form>
			</div>
		</div>
	);
}

export default PaymentMethodScreen;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import MessageBox from "../components/MessageBox";

function CartScreen(props) {
	const dispatch = useDispatch();

	// const [qty, setQty] = useState(1);

	const productId = props.match.params.id;
	const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;

	const cart = useSelector((state) => state.cart);
	const { cartItems, error } = cart;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	const removeFromCartHandler = (productId) => {
		dispatch(removeFromCart(productId));
	};

	const checkOutHandler = () => {
		props.history.push("/signin?redirect=shipping");
	};
	return (
		<div className="cart">
			<div className="cart-list">
				<ul className="cart-list-container">
					<li>
						<h2>Shopping Cart</h2>
						<div>
							<h3>Price</h3>
						</div>
					</li>
					{error && <MessageBox variant="danger">{error}</MessageBox>}
					{cartItems.length === 0 ? (
						<MessageBox>
							Cart is empty.<Link to="/"> Go Shopping.</Link>
						</MessageBox>
					) : (
						cartItems.map((item) => (
							<li className="cart-list-item" key={item.product}>
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
										<strong>Qty:</strong>
										{"  "}
										<select
											value={item.qty}
											className="secondary"
											onChange={(e) =>
												dispatch(
													addToCart(
														item.product,
														Number(e.target.value)
													)
												)
											}
										>
											{[...Array(item.countInStock).keys()].map(
												(x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												)
											)}
										</select>{" "}
										<button
											type="button"
											className="button secondary"
											onClick={() =>
												removeFromCartHandler(item.product)
											}
										>
											Delete
										</button>
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
			<div className="cart-action">
				<h3>
					Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items): $
					{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
				</h3>
				<br />
				<button
					onClick={checkOutHandler}
					className="button primary full-width"
					disabled={cartItems.length === 0}
				>
					Proceed to checkout
				</button>
			</div>
		</div>
	);
}

export default CartScreen;

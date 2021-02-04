import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
// import { data } from "../data";
import { detailsProduct } from "../redux/actions/productActions";

function ProductScreen(props) {
	// console.log(props.match.params.id);
	// const product = data.products.find((x) => x._id === props.match.params.id);
	const dispatch = useDispatch();
	const productId = props.match.params.id;

	const [qty, setQty] = useState(1);

	const productDetails = useSelector((state) => state.productDetails);
	const { product, loading, error } = productDetails;

	useEffect(() => {
		dispatch(detailsProduct(productId));
	}, [dispatch, productId]);

	const handleAddToCart = () => {
		props.history.push(`/cart/${productId}?qty=${qty}`);
	};

	return (
		<div>
			<div className="back-to-result">
				<Link to="/">
					<b>
						<i className="fas fa-arrow-left"></i>
					</b>
					Back to result
				</Link>
			</div>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<div className="details">
					<div className="details-image">
						<img src={product.image} alt={product.name} />
					</div>
					<div className="details-info">
						<ul>
							<li>
								<h4>{product.name}</h4>
							</li>
							<li>
								<Rating
									rating={product.rating}
									numReviews={product.numReviews}
								/>
							</li>
							<li>
								Price: <b>${product.price}</b>
							</li>
							<li>Description: {product.description}</li>
						</ul>
					</div>
					<div className="details-action">
						<ul>
							<li>
								<div>Price:</div>{" "}
								<div>
									<b>${product.price}</b>
								</div>
							</li>
							<li>
								<div>Status:</div>{" "}
								<div>
									{product.countInStock > 0 ? (
										<span className="success">In Stock</span>
									) : (
										<span className="danger">Unavailable</span>
									)}
								</div>
							</li>
							{product.countInStock > 0 && (
								<>
									<li>
										<div>Qty: </div>
										<div>
											<select
												value={qty}
												onChange={(e) => {
													setQty(e.target.value);
												}}
											>
												{[
													...Array(product.countInStock).keys(),
												].map((x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												))}
											</select>
										</div>
									</li>
								</>
							)}
							<li>
								{product.countInStock > 0 && (
									<button
										className="button primary"
										onClick={handleAddToCart}
									>
										Add to cart
									</button>
								)}
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductScreen;

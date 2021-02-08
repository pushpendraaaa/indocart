import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createReview, detailsProduct } from "../redux/actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_CREATE_RESET } from "../redux/constants/productConstants";

function ProductScreen(props) {
	// console.log(props.match.params.id);
	// const product = data.products.find((x) => x._id === props.match.params.id);
	const dispatch = useDispatch();
	const productId = props.match.params.id;

	const [qty, setQty] = useState(1);

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const productDetails = useSelector((state) => state.productDetails);
	const { product, loading, error } = productDetails;

	const productReviewCreate = useSelector((state) => state.productReviewCreate);
	const {
		loading: loadingReviewCreate,
		error: errorReviewCreate,
		success: successReviewCreate,
	} = productReviewCreate;

	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	useEffect(() => {
		if (successReviewCreate) {
			window.alert("Review Submitted Successfully");
			setRating("");
			setComment("");
			dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
		}
		dispatch(detailsProduct(productId));
	}, [dispatch, productId, successReviewCreate]);

	const handleAddToCart = () => {
		props.history.push(`/cart/${productId}?qty=${qty}`);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (comment && rating) {
			dispatch(createReview(productId, { rating, comment, name: userInfo.name }));
		} else {
			alert("Please enter comment and rating");
		}
	};

	return (
		<div>
			<div className="back-to-result">
				<Link to="/" className="back-to-result-link">
					<div>
						<i className="fa fa-arrow-left"></i>
					</div>
					<div>
						<b>Back</b>
					</div>
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
								<h2>{product.name}</h2>
							</li>
							<li>
								Price: <b>${product.price}</b>
							</li>
							<li>
								<Rating
									rating={product.rating}
									numReviews={product.numReviews}
								/>
							</li>
							<li>Description: {product.description}</li>
							<>
								<li>
									<div>
										Seller:{" "}
										<Link to={`/seller/${product.seller._id}`}>
											<strong>{product.seller.seller.name}</strong>
										</Link>
									</div>
								</li>
								<li>
									<Rating
										rating={product.seller.seller.rating}
										numReviews={product.seller.seller.numReviews}
									></Rating>
								</li>
							</>
							<li>
								<img
									className="small"
									src={product.image}
									alt={product.name}
								/>
							</li>
						</ul>
					</div>
					<div className="details-action">
						<ul>
							<li>
								<div>
									<strong>Price:</strong>
								</div>{" "}
								<div>
									<h3>${product.price}</h3>
								</div>
							</li>
							<li>
								<div>
									<strong>Status:</strong>
								</div>{" "}
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
										<div>
											<strong>Qty: </strong>
										</div>
										<div>
											<select
												value={qty}
												className="secondary"
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
								<button
									className="button primary"
									onClick={handleAddToCart}
									disabled={product.countInStock === 0}
								>
									Add to cart
								</button>
							</li>
						</ul>
					</div>
					<div className="reviews">
						<h3 id="reviews">Customer Reviews</h3>
						{product.reviews.length === 0 && (
							<MessageBox>There is no review</MessageBox>
						)}
						<ul>
							{product.reviews.map((review) => (
								<li key={review._id} className="reviews-listed">
									<strong>{review.name}</strong>
									<Rating rating={review.rating} caption=" "></Rating>
									<p>{review.comment}</p>
									<p>{review.createdAt.substring(0, 10)}</p>
								</li>
							))}
							<li>
								{userInfo ? (
									<form className="form" onSubmit={submitHandler}>
										<ul>
											<li>
												<h2>Write a customer review</h2>
											</li>
											<li>
												<label htmlFor="rating">Rating:</label>
												<select
													id="rating"
													value={rating}
													onChange={(e) =>
														setRating(e.target.value)
													}
												>
													<option value="">Select...</option>
													<option value="1">1- Poor</option>
													<option value="2">2- Fair</option>
													<option value="3">3- Good</option>
													<option value="4">
														4- Very good
													</option>
													<option value="5">5- Excelent</option>
												</select>
											</li>
											<li>
												<label htmlFor="comment">Comment:</label>
												<textarea
													id="comment"
													value={comment}
													placeholder="Leave a review..."
													onChange={(e) =>
														setComment(e.target.value)
													}
												></textarea>
											</li>
											<li>
												<label />
												<button
													className=" button primary"
													type="submit"
												>
													Submit
												</button>
											</li>
											<li>
												{loadingReviewCreate && (
													<LoadingBox></LoadingBox>
												)}
												{errorReviewCreate && (
													<MessageBox variant="danger">
														{errorReviewCreate}
													</MessageBox>
												)}
											</li>
										</ul>
									</form>
								) : (
									<MessageBox>
										Please <Link to="/signin">Sign In</Link> to write
										a review.
									</MessageBox>
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

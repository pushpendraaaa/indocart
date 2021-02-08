import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product(props) {
	const { product } = props;
	return (
		<li key={product._id}>
			<div className="product">
				<Link to={`/product/${product._id}`}>
					<img
						className="product-image"
						src={product.image}
						alt={product.name}
					/>
				</Link>
				<div className="product-name">
					<Link to={`/product/${product._id}`}>{product.name}</Link>
				</div>
				<div className="product-brand">{product.brand}</div>
				<div className="product-price">${product.price}</div>
				<Rating rating={product.rating} numReviews={product.numReviews} />
				{/* <div>
					<Link to={`/seller/${product.seller._id}`}>
						{product.seller.seller.name}
					</Link>
				</div> */}
			</div>
		</li>
	);
}

export default Product;

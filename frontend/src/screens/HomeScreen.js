import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";
// import { data } from "../data";

function HomeScreen() {
	// const [products, setProducts] = useState([]);
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;

	useEffect(() => {
		dispatch(listProducts());

		// const fetchData = async () => {
		// 	const { data } = await axios.get("/api/products");
		// 	setProducts(data);
		// };
		// fetchData();
	}, [dispatch]);

	return loading ? (
		<div>Loading...</div>
	) : error ? (
		<div>{error}</div>
	) : (
		<ul className="products">
			{products.map((product) => (
				<li key={product._id}>
					<div className="product">
						<Link to={"/product/" + product._id}>
							<img
								className="product-image"
								src={product.image}
								alt={product.name}
							/>
						</Link>
						<div className="product-name">
							<Link to={"/product/" + product._id}>{product.name}</Link>
						</div>
						<div className="product-brand">{product.brand}</div>
						<div className="product-price">${product.price}</div>
						<div className="product-rating">
							{/* {product.rating} stars ({product.numReviews} reviews ) */}
							<span>
								<i className="fa fa-star"></i>
							</span>
							<span>
								<i className="fa fa-star"></i>
							</span>
							<span>
								<i className="fa fa-star"></i>
							</span>
							<span>
								<i className="fa fa-star"></i>
							</span>
							<span>
								<i className="fa fa-star"></i>
							</span>
						</div>
					</div>
				</li>
			))}
		</ul>
	);
}

export default HomeScreen;

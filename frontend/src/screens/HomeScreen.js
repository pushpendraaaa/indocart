import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listTopSellers } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
// import { data } from "../data";

function HomeScreen() {
	// const [products, setProducts] = useState([]);
	// const [loading, setLoading] = useState(false);
	// const [error, setError] = useState(false);

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;

	const userTopSellersList = useSelector((state) => state.userTopSellersList);
	const {
		loading: loadingSellers,
		error: errorSellers,
		users: sellers,
	} = userTopSellersList;

	useEffect(() => {
		dispatch(listProducts({}));
		dispatch(listTopSellers());

		// const fetchData = async () => {
		// try {
		// setLoading(true);
		// 	const { data } = await axios.get("/api/products");
		// setLoading(false);
		// 	setProducts(data);
		// };
		// } catch (error) {
		// setError(error.message);
		// setLoading(false);
		// }
		// fetchData();
	}, [dispatch]);

	return (
		<div>
			<h2>Top Rated Sellers</h2>
			<br />
			{loadingSellers ? (
				<LoadingBox></LoadingBox>
			) : errorSellers ? (
				<MessageBox variant="danger">{errorSellers}</MessageBox>
			) : (
				<>
					{sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
					<Carousel showArrows autoPlay showThumbs={false}>
						{sellers.map((seller) => (
							<div key={seller._id}>
								<Link to={`/seller/${seller._id}`}>
									<img
										src={seller.seller.logo}
										alt={seller.seller.name}
									/>
									<p className="legend">{seller.seller.name}</p>
								</Link>
							</div>
						))}
					</Carousel>
				</>
			)}
			<br />
			<h2>Featured Proucts</h2>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<ul className="products">
					{products.length === 0 && <MessageBox>No Product Found</MessageBox>}
					{products.map((product) => (
						<Product key={product._id} product={product} />
					))}
				</ul>
			)}
		</div>
	);
}

export default HomeScreen;

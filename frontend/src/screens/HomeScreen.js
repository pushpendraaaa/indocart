import React, { useEffect } from "react";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
// import { data } from "../data";

function HomeScreen() {
	// const [products, setProducts] = useState([]);
	// const [loading, setLoading] = useState(false);
	// const [error, setError] = useState(false);

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;

	useEffect(() => {
		dispatch(listProducts());

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

	return loading ? (
		<LoadingBox></LoadingBox>
	) : error ? (
		<MessageBox variant="danger">{error}</MessageBox>
	) : (
		<ul className="products">
			{products.map((product) => (
				<Product key={product._id} product={product} />
			))}
		</ul>
	);
}

export default HomeScreen;

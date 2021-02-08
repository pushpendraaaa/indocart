import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
	deleteProduct,
	listProducts,
	saveProduct,
	// createProduct,
} from "../redux/actions/productActions";
import {
	PRODUCT_CREATE_RESET,
	PRODUCT_DELETE_RESET,
} from "../redux/constants/productConstants";

function ProductsScreen(props) {
	const dispatch = useDispatch();

	const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [countInStock, setCountInStock] = useState("");
	const [description, setDescription] = useState("");

	const [modelVesible, setModelVisible] = useState(false);
	const openModel = (product) => {
		setModelVisible(true);
		setId(product._id);
		setName(product.name);
		setPrice(product.price);
		setImage(product.image);
		setBrand(product.brand);
		setCategory(product.category);
		setCountInStock(product.countInStock);
		setDescription(product.description);
	};

	const { pageNumber = 1 } = useParams();

	const sellerMode = props.match.path.indexOf("/seller") >= 0;

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate;

	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete;

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const productSave = useSelector((state) => state.productSave);
	const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

	useEffect(() => {
		if (successCreate) {
			dispatch({ type: PRODUCT_CREATE_RESET });
			props.history.push(`/product/${createdProduct._id}/edit`);
		}
		if (successSave) {
			setModelVisible(false);
		}
		if (successDelete) {
			dispatch({ type: PRODUCT_DELETE_RESET });
		}
		dispatch(listProducts({ seller: sellerMode ? userInfo._id : "", pageNumber }));
	}, [
		dispatch,
		successSave,
		successDelete,
		successCreate,
		props.history,
		sellerMode,
		userInfo._id,
		pageNumber,
		createdProduct,
	]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveProduct({
				_id: id,
				name,
				price,
				image,
				brand,
				category,
				countInStock,
				description,
			})
		);
	};

	// const createHandler = () => {
	// 	dispatch(createProduct());
	// };

	const deleteHandler = (product) => {
		if (window.confirm("Are you sure to delete?")) {
			dispatch(deleteProduct(product._id));
		}
	};

	return (
		<div className="content content-margined">
			<div className="product-header">
				<h2>Products</h2>
				<button className="button primary" onClick={() => openModel({})}>
					Create Product
				</button>
			</div>
			{loadingDelete && <LoadingBox></LoadingBox>}
			{errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

			{loadingCreate && <LoadingBox></LoadingBox>}
			{errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<>
					{modelVesible && (
						<div className="form">
							<form onSubmit={submitHandler}>
								<ul className="form-container">
									<li>
										<h2>Create Product</h2>
									</li>
									<li>
										{loadingSave && <div>Loading...</div>}
										{errorSave && <div>{errorSave}</div>}
									</li>

									<li>
										<label htmlFor="name">Name</label>
										<input
											type="text"
											name="name"
											value={name}
											id="name"
											onChange={(e) => {
												setName(e.target.value);
											}}
										/>
									</li>
									<li>
										<label htmlFor="image">Image</label>
										<input
											type="text"
											name="image"
											value={image}
											id="image"
											onChange={(e) => {
												setImage(e.target.value);
											}}
										/>
									</li>
									<li>
										<label htmlFor="brand">Brand</label>
										<input
											type="text"
											name="brand"
											value={brand}
											id="brand"
											onChange={(e) => {
												setBrand(e.target.value);
											}}
										/>
									</li>
									<li>
										<label htmlFor="price">Price</label>
										<input
											type="text"
											name="price"
											value={price}
											id="price"
											onChange={(e) => {
												setPrice(e.target.value);
											}}
										/>
									</li>

									<li>
										<label htmlFor="category">Category</label>
										<input
											type="text"
											name="category"
											value={category}
											id="category"
											onChange={(e) => {
												setCategory(e.target.value);
											}}
										/>
									</li>
									<li>
										<label htmlFor="countInStock">
											Count In Stock
										</label>
										<input
											type="text"
											name="countInStock"
											value={countInStock}
											id="countInStock"
											onChange={(e) => {
												setCountInStock(e.target.value);
											}}
										/>
									</li>
									<li>
										<label htmlFor="description">Description</label>
										<textarea
											type="text"
											name="description"
											value={description}
											id="description"
											onChange={(e) => {
												setDescription(e.target.value);
											}}
										></textarea>
									</li>
									<li>
										<button type="submit" className="button primary">
											{id ? "Update" : "Create"}
										</button>
									</li>
									<li>
										<button
											type="button"
											onClick={() => setModelVisible(false)}
											className="button"
										>
											Back
										</button>
									</li>
								</ul>
							</form>
						</div>
					)}
				</>
			)}
			<br />
			<div className="product-list">
				<table className="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Price</th>
							<th>Category</th>
							<th>Brand</th>
							<th>Description</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>{product.price}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td>{product.description}</td>
								<td>
									<button onClick={() => openModel(product)}>
										Edit
									</button>{" "}
									<button onClick={() => deleteHandler(product)}>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="row center pagination">
					{[...Array(pages).keys()].map((x) => (
						<Link
							className={x + 1 === page ? "active" : ""}
							key={x + 1}
							to={`/productlist/pageNumber/${x + 1}`}
						>
							{x + 1}
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

export default ProductsScreen;

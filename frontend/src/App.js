import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import { signout } from "./redux/actions/userActions";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SellerRoute from "./components/SellerRoute";
import SellerScreen from "./screens/SellerScreen";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import { listProductCategories } from "./redux/actions/productActions";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import MapScreen from "./screens/MapScreen";

function App() {
	const dispatch = useDispatch();

	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const signoutHandler = () => {
		dispatch(signout());
	};

	const productCategoryList = useSelector((state) => state.productCategoryList);
	const {
		loading: loadingCategories,
		error: errorCategories,
		categories,
	} = productCategoryList;

	useEffect(() => {
		dispatch(listProductCategories());
	}, [dispatch]);

	// const openMenu = () => {
	// 	document.querySelector(".sidebar").classList.add("open");
	// };

	// const closeMenu = () => {
	// 	document.querySelector(".sidebar").classList.remove("open");
	// };

	return (
		<BrowserRouter>
			<div className="grid-container">
				<header className="header">
					<div className="brand">
						{/* <button onClick={openMenu}>&#9776;</button> */}
						<button
							type="button"
							className="open-sidebar"
							onClick={() => setSidebarIsOpen(true)}
						>
							<i className="fa fa-bars"></i>
						</button>
						<Link to="/">indocart</Link>
					</div>
					<div>
						<Route
							render={({ history }) => (
								<SearchBox history={history}></SearchBox>
							)}
						></Route>
					</div>
					<div className="header-links">
						<Link to="/cart">
							<b>Cart</b>
							{cartItems.length > 0 && (
								<span className="badge">{cartItems.length}</span>
							)}
						</Link>
						{userInfo ? (
							<div className="dropdown">
								<Link to="#">
									{userInfo.name} <i className="fa fa-caret-down"></i>{" "}
								</Link>
								<ul className="dropdown-content">
									<li>
										<Link to="/profile">User Profile</Link>
									</li>
									<li>
										<Link to="/orderhistory">Order History</Link>
									</li>
									<li>
										<Link to="#signout" onClick={signoutHandler}>
											Sign Out
										</Link>
									</li>
								</ul>
							</div>
						) : (
							<Link to="/signin">
								<b>Sign In</b>
							</Link>
						)}
						{userInfo && userInfo.isSeller && (
							<div className="dropdown">
								<Link to="#admin">
									Seller <i className="fa fa-caret-down"></i>
								</Link>
								<ul className="dropdown-content">
									<li>
										<Link to="/productlist/seller">Products</Link>
									</li>
									<li>
										<Link to="/orderlist/seller">Orders</Link>
									</li>
								</ul>
							</div>
						)}
						{userInfo && userInfo.isAdmin && (
							<div className="dropdown">
								<Link to="#admin">
									Admin <i className="fa fa-caret-down"></i>
								</Link>
								<ul className="dropdown-content">
									<li>
										<Link to="/dashboard">Dashboard</Link>
									</li>
									<li>
										<Link to="/productlist">Products</Link>
									</li>
									<li>
										<Link to="/orderlist">Orders</Link>
									</li>
									<li>
										<Link to="/userlist">Users</Link>
									</li>
								</ul>
							</div>
						)}
					</div>
				</header>
				<aside className={sidebarIsOpen ? "open" : ""}>
					<ul className="categories">
						<li>
							<h3>Product Categories</h3>
							<button
								onClick={() => setSidebarIsOpen(false)}
								className="close-sidebar"
								type="button"
							>
								<i className="fa fa-close"></i>
							</button>
						</li>
						{loadingCategories ? (
							<LoadingBox></LoadingBox>
						) : errorCategories ? (
							<MessageBox variant="danger">{errorCategories}</MessageBox>
						) : (
							categories.map((category) => (
								<li key={category}>
									<Link
										to={`/search/category/${category}`}
										onClick={() => setSidebarIsOpen(false)}
									>
										<strong>{category}</strong>
									</Link>
								</li>
							))
						)}
					</ul>
				</aside>
				{/* <aside className="sidebar">
					<h3>Shopping Category</h3>
					<button className="sidebar-close-button" onClick={closeMenu}>
						x
					</button>
					<ul>
						<li>
							<Link to="index.html">Pants</Link>
						</li>
						<li>
							<Link to="index.html">Shirts</Link>
						</li>
					</ul>
				</aside> */}
				<main className="main">
					<div className="content">
						<Route path="/seller/:id" component={SellerScreen}></Route>
						<Route
							path="/cart/:id?"
							exact={true}
							component={CartScreen}
						></Route>
						<Route
							path="/product/:id"
							component={ProductScreen}
							exact={true}
						></Route>
						<Route
							path="/product/:id/edit"
							component={ProductEditScreen}
							exact
						></Route>
						<Route
							path="/signin"
							component={SigninScreen}
							exact={true}
						></Route>
						<Route
							path="/register"
							component={RegisterScreen}
							exact={true}
						></Route>
						<Route
							path="/shipping"
							component={ShippingAddressScreen}
							exact={true}
						></Route>
						<Route
							path="/payment"
							component={PaymentMethodScreen}
							exact={true}
						></Route>
						<Route
							path="/placeorder"
							component={PlaceOrderScreen}
							exact={true}
						></Route>
						<Route path="/order/:id" component={OrderScreen}></Route>
						<Route
							path="/orderhistory"
							component={OrderHistoryScreen}
						></Route>
						<Route
							path="/search/name/:name?"
							component={SearchScreen}
							exact
						></Route>
						<Route
							path="/search/category/:category"
							component={SearchScreen}
							exact
						></Route>
						<Route
							path="/search/category/:category/name/:name"
							component={SearchScreen}
							exact
						></Route>
						<Route
							path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
							component={SearchScreen}
							exact
						></Route>
						<PrivateRoute
							path="/profile"
							component={ProfileScreen}
						></PrivateRoute>
						<PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
						<AdminRoute
							path="/productlist"
							component={ProductListScreen}
							exact
						></AdminRoute>
						<AdminRoute
							path="/productlist/pageNumber/:pageNumber"
							component={ProductListScreen}
							exact
						></AdminRoute>
						<AdminRoute
							path="/orderlist"
							component={OrderListScreen}
							exact
						></AdminRoute>
						<AdminRoute
							path="/userlist"
							component={UserListScreen}
						></AdminRoute>
						<AdminRoute
							path="/user/:id/edit"
							component={UserEditScreen}
						></AdminRoute>
						<SellerRoute
							path="/productlist/seller"
							component={ProductListScreen}
						></SellerRoute>
						<SellerRoute
							path="/orderlist/seller"
							component={OrderListScreen}
						></SellerRoute>
						<Route
							path="/products"
							component={ProductsScreen}
							exact={true}
						></Route>

						<Route path="/" component={HomeScreen} exact={true}></Route>
					</div>
				</main>
				<footer className="footer">All right reserved.</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;

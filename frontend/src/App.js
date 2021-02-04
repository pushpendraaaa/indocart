/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
// import logo from "./logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import { signout } from "./redux/actions/userActions";
// import { data } from "./data";
// import "./App.css";

function App() {
	const dispatch = useDispatch();

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const signoutHandler = () => {
		dispatch(signout());
	};

	const openMenu = () => {
		document.querySelector(".sidebar").classList.add("open");
	};

	const closeMenu = () => {
		document.querySelector(".sidebar").classList.remove("open");
	};

	return (
		<BrowserRouter>
			<div className="grid-container">
				<header className="header">
					<div className="brand">
						<button onClick={openMenu}>&#9776;</button>
						<Link to="/">indocart</Link>
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
					</div>
				</header>
				<aside className="sidebar">
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
				</aside>
				<main className="main">
					<div className="content">
						<Route
							path="/products"
							component={ProductsScreen}
							exact={true}
						></Route>
						<Route
							path="/shipping"
							component={ShippingScreen}
							exact={true}
						></Route>
						<Route
							path="/payment"
							component={PaymentScreen}
							exact={true}
						></Route>
						<Route
							path="/placeorder"
							component={PlaceOrderScreen}
							exact={true}
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
							path="/product/:id"
							component={ProductScreen}
							exact={true}
						></Route>
						<Route
							path="/cart/:id?"
							exact={true}
							component={CartScreen}
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

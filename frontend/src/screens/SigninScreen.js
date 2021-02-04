import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../redux/actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function SigninScreen(props) {
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const userSignin = useSelector((state) => state.userSignin);
	const { loading, userInfo, error } = userSignin;

	const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

	useEffect(() => {
		if (userInfo) {
			props.history.push(redirect);
		}
	}, [props, redirect, userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(signin(email, password));
	};

	return (
		<div className="form">
			<form onSubmit={submitHandler}>
				<ul className="form-container">
					<li>
						<h2>Sign In</h2>
					</li>
					<li>
						{loading && <LoadingBox></LoadingBox>}
						{error && <MessageBox>{error}</MessageBox>}
					</li>
					<li>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							value={email}
							id="email"
							placeholder="Enter email..."
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</li>
					<li>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							value={password}
							id="password"
							placeholder="Enter pasword..."
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</li>
					<li>
						<label />
						<button type="submit" className="button primary">
							Sign In
						</button>
					</li>
					<li>
						<label />
						New to indocart?
					</li>
					<li>
						<Link
							to={
								redirect === "/"
									? "register"
									: "register?redirect=" + redirect
							}
							className="button secondary text-center"
						>
							Create an Account
						</Link>
					</li>
				</ul>
			</form>
		</div>
	);
}

export default SigninScreen;

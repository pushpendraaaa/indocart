import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { register } from "../redux/actions/userActions";

function RegisterScreen(props) {
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, userInfo, error } = userRegister;

	const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

	useEffect(() => {
		if (userInfo) {
			props.history.push(redirect);
		}
	}, [props.history, redirect, userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Password are not matched.");
		} else {
			dispatch(register(name, email, password));
		}
	};

	return (
		<div className="form">
			<form onSubmit={submitHandler}>
				<ul className="form-container">
					<li>
						<h2>Create Account</h2>
					</li>
					<li>
						{loading && <LoadingBox></LoadingBox>}
						{error && <MessageBox>{error}</MessageBox>}
					</li>
					<li>
						<label htmlFor="name">Name</label>
						<input
							type="text"
							name="name"
							id="name"
							placeholder="Enter name"
							required
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
					</li>
					<li>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Enter email"
							required
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
							id="password"
							placeholder="Enter password"
							required
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</li>
					<li>
						<label htmlFor="confirmPassword">Confirm Password</label>
						<input
							type="password"
							name="confirmPassword"
							id="confirmPassword"
							placeholder="Confirm password"
							required
							onChange={(e) => {
								setConfirmPassword(e.target.value);
							}}
						/>
					</li>
					<li>
						<button type="submit" className="button primary">
							Register
						</button>
					</li>
					<li>
						<span>
							Already have an Account? <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
							{/* <Link
								to={
									redirect === "/"
										? "/signin"
										: `/signin?redirect=${redirect}`
								}
							>
								Sign in
							</Link> */}
						</span>
					</li>
				</ul>
			</form>
		</div>
	);
}

export default RegisterScreen;

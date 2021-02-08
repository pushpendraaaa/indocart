import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUser } from "../redux/actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_RESET } from "../redux/constants/userConstants";

export default function UserEditScreen(props) {
	const userId = props.match.params.id;
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isSeller, setIsSeller] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdate = useSelector((state) => state.userUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate;

	const dispatch = useDispatch();
	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			props.history.push("/userlist");
		}
		if (!user) {
			dispatch(detailsUser(userId));
		} else {
			setName(user.name);
			setEmail(user.email);
			setIsSeller(user.isSeller);
			setIsAdmin(user.isAdmin);
		}
	}, [dispatch, props.history, successUpdate, user, userId]);

	const submitHandler = (e) => {
		e.preventDefault();
		// dispatch update user
		dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin }));
	};
	return (
		<div>
			<form className="form" onSubmit={submitHandler}>
				{loadingUpdate && <LoadingBox></LoadingBox>}
				{errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
				{loading ? (
					<LoadingBox />
				) : error ? (
					<MessageBox variant="danger">{error}</MessageBox>
				) : (
					<ul className="form-container">
						<li>
							<span>
								<h2>Edit User</h2>
								<br />
								<b>{name}</b>
							</span>
						</li>
						<li>
							<label htmlFor="name">Name</label>
							<input
								id="name"
								type="text"
								placeholder="Enter name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							></input>
						</li>
						<li>
							<label htmlFor="email">Email</label>
							<input
								id="email"
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></input>
						</li>
						<li>
							<div>
								<input
									id="isSeller"
									type="checkbox"
									checked={isSeller}
									onChange={(e) => setIsSeller(e.target.checked)}
								></input>
								<label htmlFor="isSeller">Is Seller</label>
							</div>
							<div>
								<input
									id="isAdmin"
									type="checkbox"
									checked={isAdmin}
									onChange={(e) => setIsAdmin(e.target.checked)}
								></input>
								<label htmlFor="isAdmin">Is Admin</label>
							</div>
						</li>
						<li>
							<button type="submit" className="button primary">
								Update
							</button>
						</li>
					</ul>
				)}
			</form>
		</div>
	);
}

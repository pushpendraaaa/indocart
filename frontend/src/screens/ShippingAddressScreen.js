import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../redux/actions/cartActions";

function ShippingAddressScreen(props) {
	const dispatch = useDispatch();

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [lat, setLat] = useState(shippingAddress.lat);
	const [lng, setLng] = useState(shippingAddress.lng);
	const userAddressMap = useSelector((state) => state.userAddressMap);
	const { address: addressMap } = userAddressMap;

	if (!userInfo) {
		props.history.push("/signin");
	}

	const [fullName, setFullName] = useState(shippingAddress.fullName);
	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);

	const submitHandler = (e) => {
		e.preventDefault();
		const newLat = addressMap ? addressMap.lat : lat;
		const newLng = addressMap ? addressMap.lng : lng;
		if (addressMap) {
			setLat(addressMap.lat);
			setLng(addressMap.lng);
		}
		let moveOn = true;
		if (!newLat || !newLng) {
			moveOn = window.confirm("You did not set your location on map. Continue?");
		}
		if (moveOn) {
			dispatch(
				saveShippingAddress({
					fullName,
					address,
					city,
					postalCode,
					country,
					lat: newLat,
					lng: newLng,
				})
			);
			props.history.push("/payment");
		}
		// dispatch(saveShippingAddress({ fullName, address, city, postalCode, country }));
		// props.history.push("/payment");
	};

	const chooseOnMap = () => {
		dispatch(
			saveShippingAddress({
				fullName,
				address,
				city,
				postalCode,
				country,
				lat,
				lng,
			})
		);
		props.history.push("/map");
	};

	return (
		<div>
			<CheckoutSteps step1 step2></CheckoutSteps>
			<div className="form">
				<form onSubmit={submitHandler}>
					<ul className="form-container">
						<li>
							<h2>Shipping Address</h2>
						</li>
						<li>
							<label htmlFor="fullName">Full Name</label>
							<input
								type="text"
								name="fullName"
								value={fullName}
								placeholder="Enter full name"
								id="fullName"
								required
								onChange={(e) => {
									setFullName(e.target.value);
								}}
							/>
						</li>
						<li>
							<label htmlFor="address">Address</label>
							<input
								type="text"
								name="address"
								value={address}
								placeholder="Enter address"
								id="address"
								required
								onChange={(e) => {
									setAddress(e.target.value);
								}}
							/>
						</li>
						<li>
							<label htmlFor="city">City</label>
							<input
								type="text"
								name="city"
								value={city}
								placeholder="Enter city"
								id="city"
								required
								onChange={(e) => {
									setCity(e.target.value);
								}}
							/>
						</li>
						<li>
							<label htmlFor="postalCode">Pincode</label>
							<input
								type="text"
								name="postalCode"
								value={postalCode}
								placeholder="Enter pincode"
								id="postalCode"
								required
								onChange={(e) => {
									setPostalCode(e.target.value);
								}}
							/>
						</li>
						<li>
							<label htmlFor="country">Country</label>
							<input
								type="text"
								name="country"
								value={country}
								placeholder="Enter country"
								id="country"
								required
								onChange={(e) => {
									setCountry(e.target.value);
								}}
							/>
						</li>
						<li>
							<label htmlFor="chooseOnMap">Location</label>
							<button type="button" onClick={chooseOnMap}>
								Choose On Map
							</button>
						</li>
						<li>
							<button type="submit" className="button primary">
								Continue
							</button>
						</li>
					</ul>
				</form>
			</div>
		</div>
	);
}

export default ShippingAddressScreen;

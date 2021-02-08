/* eslint-disable no-undef */
export default {
	MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost/indocart",
	JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
	PAYPAL_CLIENT_ID:
		process.env
			.ATYhXgxIxlabmmXwm7Y41LJZ2vqmPqegxW_EUxfwlDlaRCJCNys0AgvHkFEhP_O8oyK3nnBcPp1oI5pv ||
		"sb",
	PORT: process.env.PORT || 5000,
};

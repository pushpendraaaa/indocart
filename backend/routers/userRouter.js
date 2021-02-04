import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import data from "../data";
import User from "../models/userModel";
import { generateToken } from "../util";

const userRouter = express.Router();

userRouter.get(
	"/seed",
	expressAsyncHandler(async (req, res) => {
		// await User.remove({});
		const createdUsers = await User.insertMany(data.users);
		res.send({ createdUsers });
	})
);

userRouter.post(
	"/signin",
	expressAsyncHandler(async (req, res) => {
		const user = await User.findOne({
			email: req.body.email,
		});
		if (user) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				res.send({
					_id: user.id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
					token: generateToken(user),
				});
				return;
			} else {
				res.status(404).send({ message: "Invalid Email or Password." });
			}
		}
	})
);

userRouter.post("/register", async (req, res) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});
	const newUser = await user.save();
	if (newUser) {
		res.send({
			_id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			isAdmin: newUser.isAdmin,
			token: generateToken(newUser),
		});
	} else {
		res.status(401).send({ message: "Invalid User Data." });
	}
});

userRouter.get("/createadmin", async (req, res) => {
	try {
		const user = new User({
			name: "Pushpendra",
			email: "pushpendraaa2.0@gmail.com",
			password: "1234",
			isAdmin: true,
		});

		const newUser = await user.save();
		res.send(newUser);
	} catch (error) {
		res.send({ message: error.message });
	}
});

export default userRouter;

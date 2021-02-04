/* eslint-disable no-undef */
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
// import data from "./data";
import config from "./config";
import userRouter from "./routers/userRouter";
import productRouter from "./routers/productRouter";

dotenv.config();
const mongodbUrl = config.MONGODB_URL;
mongoose
	.connect(mongodbUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.catch((error) => console.log(error.reason));

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

// app.get("/api/products/:id", (req, res) => {
// 	const productId = req.params.id;
// 	const product = data.products.find((x) => x._id === productId);
// 	if (product) {
// 		res.send(product);
// 	} else {
// 		res.status(404).send({ message: "Product not found." });
// 	}
// });
// app.get("/api/products", (req, res) => {
// 	res.send(data.products);
// });

app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message });
});

app.get("/", (req, res) => {
	res.send("Server is ready.");
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`);
});

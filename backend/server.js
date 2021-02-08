/* eslint-disable no-undef */
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import config from "./config";
import userRouter from "./routers/userRouter";
import productRouter from "./routers/productRouter";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
// import data from "./data";

dotenv.config();

const app = express();
// app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const mongodbUrl = config.MONGODB_URL;
mongoose
	.connect(mongodbUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.catch((error) => console.log(error.reason));

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/uploads", uploadRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
	res.send(config.PAYPAL_CLIENT_ID);
});
app.get("/api/config/google", (req, res) => {
	res.send(process.env.GOOGLE_API_KEY || "");
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
	res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

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

app.use((err, req, res) => {
	res.status(500).send({ message: err.message });
});

app.get("/", (req, res) => {
	res.send("Server is ready.");
});
const port = config.PORT || 5000;
app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`);
});

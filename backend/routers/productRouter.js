import express from "express";
import data from "../data";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel";
import { isAdmin, isAuth } from "../util";

const productRouter = express.Router();

productRouter.get(
	"/seed",
	expressAsyncHandler(async (req, res) => {
		// await Product.remove({});
		const createdProducts = await Product.insertMany(data.products);
		res.send({ createdProducts });
	})
);

productRouter.get(
	"/",
	expressAsyncHandler(async (req, res) => {
		const products = await Product.find({});
		res.send(products);
	})
);

productRouter.post("/", isAuth, isAdmin, async (req, res) => {
	const product = new Product({
		name: req.body.name,
		image: req.body.image,
		price: req.body.price,
		brand: req.body.brand,
		category: req.body.category,
		countInStock: req.body.countInStock,
		description: req.body.description,
		rating: req.body.rating,
		numReviews: req.body.numReviews,
	});
	const newProduct = await product.save();
	if (newProduct) {
		return res.status(201).send({ message: "New product created", data: newProduct });
	} else {
		res.status(500).send({ message: "Error in creating product." });
	}
});

productRouter.put("/:id", isAuth, isAdmin, async (req, res) => {
	const productId = req.params.id;
	const product = await Product.findById(productId);
	if (product) {
		product.name = req.body.name;
		product.image = req.body.image;
		product.price = req.body.price;
		product.brand = req.body.brand;
		product.category = req.body.category;
		product.countInStock = req.body.countInStock;
		product.description = req.body.description;
		const updatedProduct = await product.save();
		if (updatedProduct) {
			return res
				.status(200)
				.send({ message: "Product Updated.", data: updatedProduct });
		}
	} else {
		return res.status(500).send({ message: "Error in updating product." });
	}
});

productRouter.delete("/:id", isAuth, isAdmin, async (req, res) => {
	const deletedProduct = await Product.findById(req.params.id);
	if (deletedProduct) {
		await deletedProduct.remove();
		return res.send({ message: "Product Deleted" });
	} else {
		return res.send("Error in deletion.");
	}
});

productRouter.get(
	"/:id",
	expressAsyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id);
		if (product) {
			res.send(product);
		} else {
			res.status(404).send({ message: "Product not found." });
		}
	})
);

export default productRouter;

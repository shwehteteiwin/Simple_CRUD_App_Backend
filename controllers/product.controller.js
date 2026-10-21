const Product = require("../models/product.model");
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
        // res.send("200");
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message,
        });
    }
}
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.findById(id);
        if (!products) {
            return res.status(404).json({
                message: "Product not found",
            })
        }
        res.status(200).json(products);
        // res.send("200");
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message,
        });
    }
}
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
        // res.send("200");
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message,
        });
    }
}
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.findByIdAndUpdate(id, req.body, { runValidators: true });
        if (!products) {
            return res.status(404).json({
                message: "Product not found",
            })
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        // res.send("200");
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message,
        });
    }
}
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.findByIdAndDelete(id);
        if (!products) {
            return res.status(404).json({
                message: "Product not found",
            })
        }
        res.status(200).json({
            message: "Product deleted."
        });
        // res.send("200");
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}
const mongoose = require("mongoose")
const Product = require("./models/product.model");
const express = require("express") //express package ကို load ယူတာ
const app = express(); //app create လုပ်တာ



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Hello from node");   // req → information coming FROM the client
    // res → what we send BACK to the client
})

app.post("/api/products", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
        // res.send("200");
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message,
        });
    }
})
app.get("/api/products", async (req, res) => {
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
})
app.get("/api/products/:id", async (req, res) => {
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
})
app.put("/api/products/:id", async (req, res) => {
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
})
app.delete("/api/products/:id", async (req, res) => {
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
})
mongoose.connect("mongodb+srv://shwehtetei_db_user:lhgt5flThiaIioFQ@backenddb.34jm5ko.mongodb.net/node-api?retryWrites=true&w=majority").then(() => {
    console.log("Connected to database")
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    })
}).catch((error) => {
    console.log("fail", error)
})




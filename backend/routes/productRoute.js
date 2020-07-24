import express, { Router } from "express";
import  { Product } from "../models/productModel"
import { isAuth, isAdmin } from "../util";

const router = express.Router();

router.get("/", async (req, res) => { 
    if(req.query.search && req.query.search === "all") {
        Product.find({}, (err, products) => {
            res.send(products);
        });
    } else if(req.query.search && req.query.search !== "undefined") {
        const item = req.query.search;
        Product.find({category: item}, (err, products) => {
            res.send(products);
        });
    } else {
        Product.find({category: "Shirt"}, (err, products) => {
            res.send(products);
        }); 
    }
});

router.get("/:id", (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if(err){
            return res.status(400).send({message: "Product Not Found"});
        }
            res.send(product);
    });
})

router.post("/", isAuth, isAdmin, async (req, res) => {
    const product = new Product ({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        category: req.body.category,
        brand: req.body.brand,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews
    });
    const newProduct = await product.save();
    if(newProduct) {
        return res.status(201).send({message: "New Product Created", data: newProduct});
    }
    return res.status(500).send({message: "Error while creating Product"});
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
    const product = await Product.findById(req.params.id);
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        
        const foundProduct = await product.save();
    if(foundProduct) {
        return res.status(200).send({message: "Product Updated", data: foundProduct});
    }
    return res.status(500).send({message: "Error while updating Product"});
    });

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if(deletedProduct) {
        await deletedProduct.remove();
        return res.send({message: "Product Deleted", data: deletedProduct});
    }
    return res.status(500).send({message: "Error while deleteting Product"});
})


export default router;
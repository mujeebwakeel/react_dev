import express, { Router } from "express";
import  { Product, Purchase } from "../models/productModel"
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

router.get("/soldout", isAuth, isAdmin, (req, res) => {
    Purchase.find({}, (err, foundGoods) => {
        if(err) {
            return res.send("Error while searching sold goods")
        }
            res.send(foundGoods);
    })
})

 
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
    product.save((err, newProduct) => {
        if(err){
            return res.status(500).send({message: "Error while creating Product"});
        }
        return res.status(201).send({message: "New Product Created", data: newProduct});
    });
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
        product.rating = req.body.rating;
        
        product.save((err,foundProduct) => {
            if(err) {
                return res.status(500).send({message: "Error while updating Product"});
            }
            return res.status(200).send({message: "Product Updated", data: foundProduct});
        });
    });

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if(deletedProduct) {
        await deletedProduct.remove();
        return res.send({message: "Product Deleted", data: deletedProduct});
    }
    return res.status(500).send({message: "Error while deleteting Product"});
})

router.post("/purchase", isAuth, async (req, res) => {
    const product = new Purchase ({
        order_time: req.body.order_time, 
        order_id: req.body.order_id, 
        customer_name: req.body.customer_name, 
        customer_email: req.body.customer_email,
        order_amount: req.body.order_amount,
        item_number: req.body.item_number,
        shipping: req.body.shipping
    }); 

    const items = req.body.items;
    items.forEach(function(item) {
        product.items.push(item);
    })

    product.save((err, purchasedProduct) => {
        if(err){
            return res.status(500).send({message: "Error while saving purchased product"});
        }
        return res.status(201).send({message: "New Product Created", data: purchasedProduct});
    });
})

router.get("/soldout/:id", async (req, res) => {
    const product = await Purchase.findById(req.params.id)
    product.cleared = true;
    product.save((err, clearedProduct) => {
        if(err) {
            return res.status(500).send({message: "Error while saving purchased product"});
        }
        return res.status(201).send({message: "New Product Created", data: clearedProduct});
    })
})



export default router;
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    imageId: {type: String, required: true},
    brand: {type: String, required: true},
    price: {type: Number, default: 0, required: true},
    category: {type: String, required: true},
    countInStock: {type: Number, default: 0, required: true},
    description: {type: String, required: true},
    rating: {type: Number, default: 0, required: true},
    numReviews: {type: Number, default: 0, required: true}
     
    });

const purchaseSchema = new mongoose.Schema({
    order_time: {type: String, required: true}, 
    order_id: {type: String, required: true}, 
    customer_name: {type: String, required: true}, 
    customer_email: {type: String, required: true},
    order_amount: {type: Number, required: true},
    item_number: {type: Number, required: true},
    items: [
        {
            product: {type: String, required: true},
            name: {type: String, required: true},
            image: {type: String, required: true},
            price: {type: Number, required: true},
            qty: {type: Number, required: true},
       }
    ],
    cleared: {type: Boolean, default:false, required: true},
    shipping: {
                address: {type: String},
                country: {type: String},
                city: {type: String},
                postalCode: {type: String}
            }
})

const Product = mongoose.model("Product", productSchema);
const Purchase = mongoose.model("Purchase", purchaseSchema)

export { Product, Purchase };
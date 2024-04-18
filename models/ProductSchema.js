
const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, "plz provide an id"],
        unique: true
    },
    Product_Name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    del_price: {
        type: Number,
        required: true
    },
    image_link: {
        type: String,
        required: true
    }
})
const Product = mongoose.model("Products", productschema);
module.exports = Product;
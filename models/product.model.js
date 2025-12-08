import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory',
        required: true
    },
    extracategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'extracategory',
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    comments: [
        {
            user: {
                type: String,
                default: "Anonymous"
            },
            rating: {
                type: Number,
                min: 1,
                max: 5
            },
            text: String,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

const Product = mongoose.model('productbl',productSchema);

export default Product;
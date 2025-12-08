import mongoose from "mongoose";

const extraCategorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category',
        required : true
    },
    subcategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subcategory',
        required : true
    }
},{
    timestamps : true
})

const extraCategory = mongoose.model('extracategory',extraCategorySchema);

export default extraCategory;
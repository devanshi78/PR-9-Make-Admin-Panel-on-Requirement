import mongoose, { Types } from "mongoose";

const subcategorySchema = new mongoose.Schema({
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
    }
},{
    timestamps : true
})

const SubCategory = mongoose.model('subcategory',subcategorySchema);

export default SubCategory;
// import Category from "../models/category.model.js";
import Category from "../models/category.model.js";
import SubCategory from "../models/subcategory.model.js";
import extraCategory from "../models/extracategory.model.js";
import fs from "fs"

const extracategoryController = ({
    async addextraCategoryPage(req,res){ 
        const categories = await Category.find({})
        const subcategories = await SubCategory.find({})
        return res.render('./pages/add-extracategory.ejs',{
            categories,
            subcategories
        })
        // return res.render('./pages/add-extracategory.ejs');
    },
    async addextraCategory(req,res){
        try {
            req.body.image = req.file.path;
            let data = await extraCategory.create(req.body)
            console.log(data);
            return res.redirect(req.get('Referrer') || '/');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async viewextraCategoryPage(req,res){
        try {
            const extracategory = await extraCategory
            .find({})
            .populate('category')
            .populate('subcategory');
            // return res.json(extracategory);
            return res.render('./pages/view-extracategory.ejs',{
                extracategory
            })
        } catch (error) {
            console.log(error.message);
            return res.render('./pages/view-extracategory.ejs',{
                extracategory : []
            })
        }
    },
    async deleteextraCategory(req,res){
        try {
            const {id} = req.params;
            const data = await extraCategory.findByIdAndDelete(id);
            console.log(data);
            fs.unlinkSync(data.image);
            return res.redirect(req.get('Referrer') || '/');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async editextraCategoryPage(req,res){
        try {
            const {id} = req.params;
            const data = await extraCategory.findById(id);
            const categories = await Category.find({});
            const subcategories = await SubCategory.find({});
            const extracategories = await extraCategory.find({});
            console.log(data);
            return res.render('./pages/edit-extracategory.ejs',{
                data,
                categories,
                subcategories,
                extracategories
            })
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async editextraCategory(req,res){
        try {
            const {id} = req.params
            if(req.file){
                req.body.image = req.file.path;
            }
            
            let data = await extraCategory.findByIdAndUpdate(id,req.body);

            if(req.file){
                fs.unlinkSync(data.image);
            }
            return res.redirect('/view-extracategory');
        } catch (error) {
            console.log(error.message)
            return res.redirect(req.get('Referrer') || '/');
        }
    }
})

export default extracategoryController;
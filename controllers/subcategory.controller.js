import Category from "../models/category.model.js";
import subCategory from "../models/subcategory.model.js";
import fs from "fs"

const subcategoryController = ({
    async addsubCategoryPage(req, res) {
        const categories = await Category.find({})
        return res.render('./pages/add-subcategory.ejs', {
            categories
        })
    },
    async addsubCategory(req, res) {
        try {
            req.body.image = req.file.path;
            let data = await subCategory.create(req.body)
            console.log(data);
            return res.redirect(req.get('Referrer') || '/');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async viewsubCategoryPage(req, res) {
        try {
            let subcategory = await subCategory.find({}).populate('category');
            return res.render('./pages/view-subcategory.ejs', {
                subcategory
            })
        } catch (error) {
            console.log(error.message);
            return res.render('./pages/view-subcategory.ejs', {
                subcategory: []
            })
        }
    },
    async deletesubCategory(req, res) {
        try {
            const { id } = req.params;
            const data = await subCategory.findByIdAndDelete(id);
            console.log(data);
            fs.unlinkSync(data.image);
            return res.redirect(req.get('Referrer') || '/');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async editsubCategoryPage(req, res) {
        try {
            const { id } = req.params;
            const data = await subCategory.findById(id);
            const categories = await Category.find({})
            const subcategories = await subCategory.find({});
            console.log(data);
            return res.render('./pages/edit-subcategory.ejs', {
                data,
                categories,
                subcategories
            })
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async editsubCategory(req, res) {
        try {
            const { id } = req.params
            if (req.file) {
                req.body.image = req.file.path;
            }

            let data = await subCategory.findByIdAndUpdate(id, req.body);

            if (req.file) {
                fs.unlinkSync(data.image);
            }
            return res.redirect('/view-subcategory');
        } catch (error) {
            console.log(error.message)
            return res.redirect(req.get('Referrer') || '/');
        }
    }
})

export default subcategoryController;
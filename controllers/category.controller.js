import Category from "../models/category.model.js";
import SubCategory from "../models/subcategory.model.js";
import fs from "fs"

const categoryController = ({
    addCategoryPage(req, res) {
        return res.render('./pages/add-category.ejs')
    },
    async addCategory(req, res) {
        try {
            req.body.image = req.file.path;
            let data = await Category.create(req.body)
            console.log(data);
            return res.redirect(req.get('Referrer') || '/');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async viewCategoryPage(req, res) {
        try {
            let categories = await Category.find({});

            for (let category of categories) {
                const subcat = await SubCategory.findOne({ category: category.id });
                category.hasSubcategories = subcat ? true : false;
            }

            return res.render('./pages/view-category.ejs', {
                categories
            })
        } catch (error) {
            console.log(error.message);
            return res.render('./pages/view-category.ejs', {
                categories: []
            })
        }
    },
    async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            const data = await Category.findByIdAndDelete(id);
            console.log(data);
            fs.unlinkSync(data.image);
            return res.redirect(req.get('Referrer') || '/');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async editCategoryPage(req, res) {
        try {
            const { id } = req.params;
            const data = await Category.findById(id);
            const categories = await Category.find({});
            console.log(data);
            return res.render('./pages/edit-category.ejs', {
                data,
                categories
            })
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async editCategory(req, res) {
        try {
            const { id } = req.params
            if (req.file) {
                req.body.image = req.file.path;
            }

            let data = await Category.findByIdAndUpdate(id, req.body);

            if (req.file) {
                fs.unlinkSync(data.image);
            }
            return res.redirect('/view-category');
        } catch (error) {
            console.log(error.message)
            return res.redirect(req.get('Referrer') || '/');
        }
    }
})

export default categoryController;
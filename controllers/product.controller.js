import Category from "../models/category.model.js";
import SubCategory from "../models/subcategory.model.js";
import extracategory from "../models/extracategory.model.js";
import Product from "../models/product.model.js";
import fs from "fs"

const productController = ({
    async addProductPage(req, res) {
        const categories = await Category.find({});
        const subcategories = await SubCategory.find({});
        const extracategories = await extracategory.find({});
        return res.render('./pages/add-product.ejs', {
            categories,
            subcategories,
            extracategories
        });
    },
    async addProduct(req, res) {
        try {
            req.body.image = req.file.path;
            let data = await Product.create(req.body)
            console.log(data);
            return res.redirect(req.get('Referrer') || '/');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async viewProduct(req, res) {
        try {
            const products = await Product
                .find({})
                .populate('category')
                .populate('subcategory')
                .populate('extracategory');
            // return res.json(extracategory);
            return res.render('./pages/view-product.ejs', {
                products
            })
        } catch (error) {
            console.log(error.message);
            return res.render('./pages/view-product.ejs', {
                products: []
            })
        }
    },
    async productDetail(req, res) {
        try {
            const { id } = req.params;

            let product = await Product.findById(id)
                .populate('category')
                .populate('subcategory')
                .populate('extracategory');

            console.log(product);
            return res.render('./pages/product-detail.ejs', {
                product
            });

        } catch (error) {
            console.log(error.message);
        }
    },
    async addComment(req, res) {
        try {
            const { id } = req.params;
            const { rating, comment } = req.body;

            await Product.findByIdAndUpdate(
                id,
                {
                    $push: {
                        comments: {
                            user: "Admin",
                            rating,
                            text: comment
                        }
                    }
                }
            );

            // Recalculate rating (simple)
            const product = await Product.findById(id);

            const total = product.comments.reduce((a, c) => a + c.rating, 0);
            product.rating = (total / product.comments.length).toFixed(1);

            await product.save();

            return res.redirect(`/product-detail/${id}`);

        } catch (error) {
            console.log(error.message);
            return res.redirect(`/product-detail/${req.params.id}`);
        }
    },
    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const data = await Product.findByIdAndDelete(id);
            console.log(data);
            fs.unlinkSync(data.image);
            return res.redirect(req.get('Referrer') || '/');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async editProductPage(req, res) {
        try {
            const { id } = req.params;

            const data = await Product.findById(id);

            const categories = await Category.find({});
            const subcategories = await SubCategory.find({});
            const extracategories = await extracategory.find({});

            res.render('./pages/edit-Product.ejs', {
                data,
                categories,
                subcategories,
                extracategories
            });

        } catch (error) {
            console.log(error.message);
            res.redirect('/product/view');
        }
    },
    async editProduct(req, res) {
        try {
            const { id } = req.params
            if (req.file) {
                req.body.image = req.file.path;
            }

            let data = await Product.findByIdAndUpdate(id, req.body);

            if (req.file) {
                fs.unlinkSync(data.image);
            }
            return res.redirect('/view-product');
        } catch (error) {
            console.log(error.message)
            return res.redirect(req.get('Referrer') || '/');
        }
    }
})

export default productController; 
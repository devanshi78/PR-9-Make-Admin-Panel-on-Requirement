import { Router } from "express";
import categoryController from "../controllers/category.controller.js";
import imageUpload from "../middlewares/imageUpload.js";

const categoryRouter = Router();

// Add Category
categoryRouter.get('/add-category',categoryController.addCategoryPage);
categoryRouter.post('/add-category',imageUpload,categoryController.addCategory);

// View Category
categoryRouter.get('/view-category',categoryController.viewCategoryPage);

// Delete Category
categoryRouter.get('/category/delete/:id',categoryController.deleteCategory)

// Edit Category
categoryRouter.get('/category/edit/:id',categoryController.editCategoryPage)
categoryRouter.post('/category/edit/:id',imageUpload,categoryController.editCategory)

export default categoryRouter;
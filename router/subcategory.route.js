import { Router } from "express";
import subcategoryController from "../controllers/subcategory.controller.js";
import imageUpload from "../middlewares/imageUpload.js";

const subcategoryRouter = Router();

// Add subCategory
subcategoryRouter.get('/add-subcategory',subcategoryController.addsubCategoryPage);
subcategoryRouter.post('/add-subcategory',imageUpload,subcategoryController.addsubCategory);

// View subCategory
subcategoryRouter.get('/view-subcategory',subcategoryController.viewsubCategoryPage);

// Delete subCategory
subcategoryRouter.get('/subcategory/delete/:id',subcategoryController.deletesubCategory)

// Edit subCategory
subcategoryRouter.get('/subcategory/edit/:id',subcategoryController.editsubCategoryPage)
subcategoryRouter.post('/subcategory/edit/:id',imageUpload,subcategoryController.editsubCategory)

export default subcategoryRouter;
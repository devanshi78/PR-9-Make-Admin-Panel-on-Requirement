import { Router } from "express";
import extraCategoryController from "../controllers/extracategory.controller.js";
import imageUpload from "../middlewares/imageUpload.js";

const extraCategoryRouter = Router();

// Add extraCategory
extraCategoryRouter.get('/add-extracategory',extraCategoryController.addextraCategoryPage);
extraCategoryRouter.post('/add-extracategory',imageUpload,extraCategoryController.addextraCategory);

// View extraCategory
extraCategoryRouter.get('/view-extracategory',extraCategoryController.viewextraCategoryPage);

// Delete extraCategory
extraCategoryRouter.get('/extracategory/delete/:id',extraCategoryController.deleteextraCategory)

// Edit extraCategory
extraCategoryRouter.get('/extracategory/edit/:id',extraCategoryController.editextraCategoryPage)
extraCategoryRouter.post('/extracategory/edit/:id',imageUpload,extraCategoryController.editextraCategory)

export default extraCategoryRouter;
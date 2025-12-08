import { Router } from "express";
import productController from "../controllers/product.controller.js";
import imageUpload from "../middlewares/imageUpload.js";

const router = Router();

router.get('/add-product',productController.addProductPage);
router.post('/add-product',imageUpload,productController.addProduct);

router.get('/view-product',productController.viewProduct);

router.get('/product-detail/:id',productController.productDetail);

router.post("/product/add-comment/:id",productController.addComment);

router.get("/product/edit/:id",productController.editProductPage);
router.post("/product/edit/:id",productController.editProduct);

router.get("/product/delete/:id",productController.deleteProduct);

export default router;
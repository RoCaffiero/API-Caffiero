
const { Router } = require("express");

const router = Router();
const {
    getProducts,
    getProductById,
    addProduct
}=require("../controllers/products");


//Rutas GET
router.get("/getProducts", getProducts);
router.get("/getProductById/:id?", getProductById);
router.post("/addProduct", addProduct);


module.exports = router;
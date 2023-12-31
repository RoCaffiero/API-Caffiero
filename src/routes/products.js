
const { Router } = require("express");

const router = Router();
const {
    getProducts,
    getProductById,
    addProduct,
    deleteProduct,
    updateProduct
}=require("../controllers/products");


//Rutas GET
router.get("/getProducts", getProducts);
router.get("/getProductById/:id?", getProductById);
router.post("/addProduct", addProduct);
router.delete ("/deleteProduct/:id?", deleteProduct);
router.put("/updateProduct/:id?", updateProduct);


module.exports = router;
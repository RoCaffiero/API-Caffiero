const productManagerModel = require("../models/productManager");
const { Sequelize } = require("sequelize");
var moment = require('moment');

const Op = Sequelize.Op;

// ---------------------------------------------------- RUTAS GET--------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const jsonFilePath = path.join(__dirname, "products.json");
const express = require("express");
const router = express.Router();


const getProducts = (req, res) => {
    try {
        const jsonData = fs.readFileSync(jsonFilePath, "utf8");

        const products = JSON.parse(jsonData);

        const count = products.length;

        res.header("X-Total-Count", count);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos." });
    }
};

const getProductById = (req, res) => {
    const jsonFilePath = path.join(__dirname, "products.json");


    try {
        const productId = req.params.id;

        const jsonData = fs.readFileSync(jsonFilePath, "utf8");

        const products = JSON.parse(jsonData);

        const product = products.find((p) => p.id === Number(productId));

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto por ID." });
    }
};

const addProduct = (req, res) => {
    try {

        const newProduct = req.body;

        const jsonData = fs.readFileSync(jsonFilePath, "utf8");

        const products = JSON.parse(jsonData);

        newProduct.id = getNextProductId(products);

        products.push(newProduct);

        fs.writeFileSync(jsonFilePath, JSON.stringify(products, null, 2), "utf8");

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: "Error al agregar el producto." });
    }
};


function getNextProductId(products) {
    const maxProductId = Math.max(...products.map((product) => product.id), 0);
    return maxProductId + 1;
}

const deleteProduct = (req, res) => {
    try {
        const productId = req.params.id;

        const jsonData = fs.readFileSync(jsonFilePath, "utf8");

        let products = JSON.parse(jsonData);

        const productIndex = products.findIndex((p) => p.id === Number(productId));

        if (productIndex !== -1) {

            products.splice(productIndex, 1);


            fs.writeFileSync(jsonFilePath, JSON.stringify(products, null, 2), "utf8");

            res.status(200).send({message: `Producto ${productId} eliminado correctamente `});
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el producto." });
    }
};

const updateProduct = (req, res) => {
    try { 
        const productId = req.params.id;
        let myProduct= {
            title: req.body.title,
            description: req.body.description,
            price:req.body.price,
            thumbnail:req.body.thumbnail,
            code: req.body.code,
            stock: req.body.stock,
            id: Number(productId)
        }
        const jsonData = fs.readFileSync(jsonFilePath, "utf8");
        let products = JSON.parse(jsonData);
       
        const productIndex = products.findIndex((p) => p.id === Number(productId));
        if (productIndex !== -1) {
            products[productIndex] = myProduct;
            fs.writeFileSync(jsonFilePath, JSON.stringify(products, null, 2), "utf8");
            res.status(200).json(myProduct);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ error: "Error al actualizar el producto." });
    }
};


module.exports = {
    getProducts,
    getProductById,
    addProduct,
    deleteProduct,
    updateProduct
};

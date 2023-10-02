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
        console.error("Error al leer o analizar el archivo JSON:", error);
        res.status(500).json({ error: "Error al obtener los productos." });
    }
};

const getProductById = (req, res) => {
    const jsonFilePath = path.join(__dirname, "products.json");


    try {
        const productId = req.params.id;

        const jsonData = fs.readFileSync(jsonFilePath, "utf8");

        const products = JSON.parse(jsonData);

        const product = products.find((p) => p.product_id === Number(productId));

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al leer o analizar el archivo JSON:", error);
        res.status(500).json({ error: "Error al obtener el producto por ID." });
    }
};

const addProduct = (req, res) => {
    try {
        console.log("Holi");
        console.log(req.body);
        const newProduct = req.body;

        const jsonData = fs.readFileSync(jsonFilePath, "utf8");

        const products = JSON.parse(jsonData);

        newProduct.product_id = getNextProductId(products);

        products.push(newProduct);

        fs.writeFileSync(jsonFilePath, JSON.stringify(products, null, 2), "utf8");

        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error al agregar un producto:", error);
        res.status(500).json({ error: "Error al agregar el producto." });
    }
};


function getNextProductId(products) {
    const maxProductId = Math.max(...products.map((product) => product.product_id), 0);
    return maxProductId + 1;
}


function getNextProductId(products) {
    const maxProductId = Math.max(...products.map((product) => product.product_id), 0);
    return maxProductId + 1;
}

module.exports = {
    getProducts,
    getProductById,
    addProduct
};


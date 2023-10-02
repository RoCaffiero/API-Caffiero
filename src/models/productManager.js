const { Sequelize, DataTypes, Model } = require("sequelize");
const fs = require("fs");
const path = require("path");

const jsonFilePath = path.join(__dirname, "../products.json");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
});

class ProductManager extends Model {}

ProductManager.init(
  {
    product_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    thumbnail: DataTypes.STRING,
    code: DataTypes.STRING,
    stock: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "ProductManager",
    tableName: "products",
  }
);
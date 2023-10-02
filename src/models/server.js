const express = require("express");
var cors = require("cors");
require('express-async-errors');


class Server {
    constructor() {

        this.app = express();

        if (process.env.STAGE == "PROD") {
            this.port = process.env.PORT || 8000;
        } else {
            this.port = 3000;
        }

        this.middlewares();

        this.routes();
    }


    middlewares() {

        const router = require('express').Router();

        this.app.use("/", router);

        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.end();
        });
    }

    routes() {
        this.app.use("/api", require("../routes/products"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en puerto ${this.port}`);
        });
    }


}
module.exports = Server;
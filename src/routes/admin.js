const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require("../../models/Planeta");
const Planeta = mongoose.model("planetas");
require("../../models/Satelite");
const Satelite = mongoose.model("satelites");

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Express API",
        version: "0.0.1"
    });
});

router.get('/planetas', (req, res) => {
    Planeta.find().sort({nome_planeta: 'asc'}).then((planetas) => {
        res.send({planetas});
    }).catch((err) => {
        res.redirect("admin");
    })
});

router.get("/satelites", (req, res) => {

    Satelite.find().populate("planeta").sort({data: "asc"}).then((satelites) => {
        res.send({satelites})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar os satélites");
        res.redirect("/admin");
    })
});

module.exports = router;
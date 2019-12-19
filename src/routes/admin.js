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
    Planeta.find().sort({ nome_planeta: 'asc' }).then((planetas) => {
        res.send({ planetas });
    }).catch((err) => {
        res.send(err);
    })
});

router.post('/planetas', (req, res) => {
    var erros = [];

    if (!req.body.nome_planeta ||
        req.body.nome_planeta == undefined ||
        req.body.nome_planeta == null) {
        erros.push({ texto: "Nome inválido" })
    }

    if (erros.length > 0) {
        res.render("admin/addplaneta", { erros: erros })
    } else {
        const novoPlaneta = {
            nome_planeta: req.body.nome_planeta,
            tam_planeta: req.body.tam_planeta,
            massa_planeta: req.body.massa_planeta,
            gravidade_planeta: req.body.gravidade_planeta,
            comp_planeta: req.body.comp_planeta
        };

        new Planeta(novoPlaneta).save().then(() => {
            res.status(200).send('Requisição recebida com sucesso!');
        }).catch((err) => {
            res.status(404).send('Deu ruim');
        });
    }
});

router.get("/planetas/del/:id", (req, res) => {
    Planetas.remove({ _id: req.params.id }).then(() => {
        res.status(200).send('Deletou de boas')
    }).catch((err) => {
        res.status(404).send('Deu ruim');
    })

});

router.get("/satelites", (req, res) => {

    Satelite.find().populate("planeta").sort({ data: "asc" }).then((satelites) => {
        res.send({ satelites })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar os satélites");
        res.redirect("/admin");
    })
});



module.exports = router;
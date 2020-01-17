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

    const novoPlaneta = req.body;

    new Planeta(novoPlaneta).save().then(() => {
        res.status(200).send('Requisição recebida com sucesso!');
    }).catch((err) => {
        res.status(404).send('Deu ruim');
    });
});

router.get("/planetas/del/:id", (req, res) => {
    Planeta.remove({ _id: req.params.id }).then(() => {
        res.status(200).send('Deletou de boas')
    }).catch((err) => {
        res.status(404).send('Deu ruim');
    })

});

router.post("/planetas/edit/:id", (req, res) => {

    Planeta.findOne({ _id: req.params.id }).then((planeta) => {

        planeta = req.body;

        planeta.save().then(() => {
            res.status(200).send('Alterou de boas');
        }).catch((err) => {
            res.status(404).send('Deu ruim ao alterar' + err);
        });

    }).catch((err) => {
        res.status(404).send('Deu ruim ao alterar: ' + err);
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

router.post("/satelites", (req, res) => {

    const novoSatelite = req.body;

    new Satelite(novoSatelite).save().then(() => {
        res.status(200).send('Requisição recebida com sucesso!');
    }).catch((err) => {
        res.redirect("/admin/satelites");
    })

});

router.post("/satelites/edit/:id", (req, res) => {
    console.log(req.params.id)

    Satelite.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    }).then(() => {
        res.status(200).send("Atualizado");
    }).catch((err) => {
        res.status(301).send("Fudeu");
    });
    /*Satelite.findOne({ _id: req.params.id }).then((satelite) => {
       
        satelite = req.body;
        console.log(satelite);
        satelite.save().then(() => {
            res.status(200).send('Alterou de boas');
        }).catch((err) => {
            res.status(404).send('Deu ruim ao alterar' + err);
        });

    }).catch((err) => {
        console.log(err)
        res.status(301).send('Deu ruim ao alterar: ' + err);
    })*/
});

module.exports = router;
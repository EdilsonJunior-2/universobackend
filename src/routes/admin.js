const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require("../../models/Planeta");
const Planeta = mongoose.model("planetas");
require("../../models/Satelite");
const Satelite = mongoose.model("satelites");

//principal
router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Universe API",
        version: "0.1"
    });
});

//Planetas
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
        res.status(404).send('Erro: ' + err);
    });
});

router.post("/planetas/edit/:id", (req, res) => {
    
    Planeta.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    }).then(() => {
        res.status(200).send("Atualizado");
    }).catch((err) => {
        res.status(301).send("Erro: " + err);
    });
});

router.get("/planetas/del/:id", (req, res) => {
    Planeta.remove({ _id: req.params.id }).then(() => {
        res.status(200).send('Deletou de boas')
    }).catch((err) => {
        res.status(301).send('Erro ao deletar : ' + err);
    })
});

//Satélites
router.get("/satelites", (req, res) => {
    Satelite.find().populate("planeta").sort({ data: "asc" }).then((satelites) => {
        res.status(200).send({ satelites })
    }).catch((err) => {
        res.status(301).end("Erro: " + err);
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
    Satelite.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    }).then(() => {
        res.status(200).send("Atualizado");
    }).catch((err) => {
        res.status(301).send("Erro");
    });
});

router.get("/satelites/del/:id", (req, res) => {
    Satelite.remove({ _id: req.params.id }).then(() => {
        res.status(200).send('Deletou de boas')
    }).catch((err) => {
        res.status(404).send('Erro ao deletar');
    })
});

module.exports = router;
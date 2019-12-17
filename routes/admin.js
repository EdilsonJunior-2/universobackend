const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require("../models/Planeta");
const Planetas = mongoose.model("planetas");
require("../models/Satelite");
const Satelite = mongoose.model("satelites");

router.get('/', (req, res) => {
    res.render("admin/index")
});

router.get('/planetas', (req, res) => {
    console.log("teste")
    Planetas.find().sort({nome_planeta: 'asc'}).then((planetas) => {
        res.send({planetas});
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar os Planetas");
        res.redirect("admin");
    })
});

router.get("/planetas/add", (req, res) => {
    res.render("admin/addplaneta");
});

router.post("/planetas/novo", (req,res) => {

    var erros = [];

    if(!req.body.nome_planeta || 
        req.body.nome_planeta == undefined || 
        req.body.nome_planeta == null){
            erros.push({texto: "Nome inválido"})
    }

    if(erros.length > 0){
        res.render("admin/addplaneta", {erros: erros})
    }else{
        const novoPlaneta = {
            nome_planeta: req.body.nome_planeta,
            tam_planeta: req.body.tam_planeta,
            massa_planeta: req.body.massa_planeta,
            gravidade_planeta: req.body.gravidade_planeta,
            comp_planeta: req.body.comp_planeta
        };
    
        new Planetas(novoPlaneta).save().then(() => {
            req.flash("success_msg", "Planeta adicionado com sucesso");
            res.redirect("/admin/planetas");
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao salvar o planeta, tente novamente")
            res.send("/admin");
        });    
    }
});

router.post("/planetas/edit", (req, res) => {

    Planetas.findOne({_id: req.body.id}).then((planeta) =>{

        planeta.nome_planeta = req.body.nome_planeta;
        planeta.tam_planeta = req.body.tam_planeta;
        planeta.massa_planeta = req.body.massa_planeta;
        planeta.gravidade_planeta = req.body.gravidade_planeta;
        planeta.comp_planeta = req.body.comp_planeta;

        planeta.save().then(() => {
            req.flash("success_msg", "Planeta editado com Sucesso");
            res.redirect("/admin/planetas");
        }).catch((err) => {
            req.flash("error_msg", "Erro ao editar planeta");
            res.redirect("/admin/planetas");
    
        });

    }).catch((err) => {
        req.flash("error_msg", "Erro ao editar planeta");
        res.redirect("/admin/planetas");
    })
});

router.get("/planetas/edit/:id", (req, res) => {
    Planetas.findOne({_id:req.params.id}).then((planeta) => {
        res.render("admin/editplaneta", {planeta: planeta});
    }).catch((err) => {
        req.flash("error_msg", "Planeta não encontrado");
        res.redirect("/admin/planetas");
    })
});

router.post("/planetas/deletar", (req, res) => {
    Planetas.remove({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Planeta deletado da base de dados");
        res.redirect("/admin/planetas")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao remover o planeta");
        res.redirect("/admin/planetas");
    });
});

router.get("/satelites", (req, res) => {

    Satelite.find().populate("planeta").sort({data: "desc"}).then((satelites) => {
        res.send({satelites})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar os satélites");
        res.redirect("/admin");
    })
});

router.get("/satelites/add", (req, res) => {
    Planetas.find().then((planetas) => {
        res.render("admin/addsatelite", {planetas: planetas})
    }).catch((err) => {
        req.flash("error_msg", "erro ao abrir o formulário de adição de satélites");
        res.redirect("admin/satelites");
    })
});

router.post("/satelites/novo", (req, res) => {

    var erros = []

    if(req.body.planetas == "0"){
        erros.push({ texto: "É necessário registrar um planeta antes!"});
    }

    if (erros.length > 0){
        res.render("admin/addsatelite", {erros: erros});
    }else{
        const novoSatelite = {
            nome_SN: req.body.nome_SN,
            tam_SN: req.body.tam_SN,
            massa_SN: req.body.massa_SN,
            comp_SN: req.body.comp_SN,
            planeta: req.body.planeta
        }

        new Satelite(novoSatelite).save().then(() => {
            req.flash("success_msg", "Satélite registrado com sucesso");
            res.redirect("/admin/satelites");
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro durante o registro do satélite");
            res.redirect("/admin/satelites");
        })
    }
});

router.get("/satelites/edit/:id", (req, res) => {
    Satelite.findOne({_id:req.params.id}).then((satelite) => {
        Planetas.find().then((planetas) => {
            res.render("admin/editsatelite", {planetas: planetas, satelite: satelite});
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar os planetas");
            res.redirect("/admin/satelites");
        })
    }).catch((err) => {
        req.flash("error_msg", "Satélite não encontrado");
        res.redirect("/admin/satelites");
    })
});

router.post("/satelites/edit", (req, res) => {
    Satelite.findOne({_id: req.body.id}).then((satelite) =>{

        satelite.nome_SN = req.body.nome_SN;
        satelite.tam_SN = req.body.tam_SN;
        satelite.massa_SN = req.body.massa_SN;
        satelite.planeta = req.body.planeta;
        satelite.comp_SN = req.body.comp_SN;

        satelite.save().then(() => {
            req.flash("success_msg", "Satélite editado com Sucesso");
            res.redirect("/admin/satelites");
        }).catch((err) => {
            req.flash("error_msg", "Erro ao editar satelite");
            res.redirect("/admin/satelites");
    
        });

    }).catch((err) => {
        console.log(err);
        req.flash("error_msg", "Erro ao editar satelite");
        res.redirect("/admin/satelites");
    })
})


module.exports = router;
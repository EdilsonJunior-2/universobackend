const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require("../../models/Planeta");
const Planeta = mongoose.model("planetas");
require("../../models/Satelite");
const Satelite = mongoose.model("satelites");
require("../../models/Usuario");
const Usuario = mongoose.model("usuarios");
require("../../models/Estrela");
const Estrela = mongoose.model("estrelas");
require("../../models/SistemaPlanetario");
const SistemaPlanetario = mongoose.model("sistemasPlanetarios");
require("../../models/Galaxia");
const Galaxia = mongoose.model("galaxias");
require("dotenv-safe").config();
var jwt = require('jsonwebtoken');

//principal
router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Universe API",
        version: "0.1"
    });
});

//Login
router.post('/login', (req, res, next) => {
    Usuario.findOne({ nome: req.body.nome }).then((usuario) => {
        if( req.body.senha === usuario.senha){
            const id = usuario._id;
            var token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: "1h"
            });
            res.status(200).send({ auth: true, token: token }); 
        }
        res.status(500).send('Login inválido!');
    })
});

router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
})

router.post('/cadastro', (req, res) => {
    const novoUsuario = req.body;
    new Usuario(novoUsuario).save().then(() => {
        res.status(200).send('Usuário Criado com sucesso!');
    }).catch((err) => {
        res.status(500).send('Erro: ' + err);
    });
})

//Planetas
router.get('/planetas', (req, res) => {
    Planeta.find().sort({ nome_planeta: 'asc' }).then((planetas) => {
        res.send({ planetas });
    }).catch((err) => {
        res.send(err);
    })
});

router.post('/planeta', (req, res) => {
    const novoPlaneta = req.body;
    new Planeta(novoPlaneta).save().then(() => {
        res.status(200).send('Requisição recebida com sucesso!');
    }).catch((err) => {
        res.status(500).send('Erro: ' + err);
    });
});

router.put("/planeta/edit/:id", (req, res) => {
    
    Planeta.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    }).then(() => {
        res.status(200).send("Atualizado");
    }).catch((err) => {
        res.status(500).send("Erro: " + err);
    });
});

router.delete("/planeta/del/:id", (req, res) => {
    Planeta.remove({ _id: req.params.id }).then(() => {
        res.status(200).send('Deletado')
    }).catch((err) => {
        res.status(500).send('Erro ao deletar : ' + err);
    })
});



//Satélites
router.get("/satelites", (req, res) => {
    Satelite.find().sort({ data: "asc" }).then((satelites) => {
        res.status(200).send({ satelites })
    }).catch((err) => {
        res.status(500).end("Erro: " + err);
    })
});

router.post("/satelite", (req, res) => {
    const novoSatelite = req.body;
    new Satelite(novoSatelite).save().then(() => {
        res.status(200).send('Requisição recebida com sucesso!');
    }).catch((err) => {
        res.redirect("/admin/satelites");
    })

});

router.put("/satelite/edit/:id", (req, res) => {
    Satelite.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    }).then(() => {
        res.status(200).send("Atualizado");
    }).catch((err) => {
        res.status(500).send("Erro");
    });
});

router.delete("/satelite/del/:id", (req, res) => {
    Satelite.remove({ _id: req.params.id }).then(() => {
        res.status(200).send('Deletado')
    }).catch((err) => {
        res.status(500).send('Erro ao deletar');
    })
});

//Estrelas

router.get("/estrelas", (req, res) => {
    Estrela.find().sort({ data: "asc" }).then((estrelas) => {
        res.status(200).send({ estrelas })
    }).catch((err) => {
        res.status(500).send("Erro: " + err);
    })
});

router.post("/estrela", (req, res) => {
    const novaEstrela = req.body;
    new Estrela(novaEstrela).save().then(() => {
        res.status(200).send('Requisição recebida com sucesso!');
    }).catch((err) => {
        res.redirect("/admin/estrelas");
        res.status(500).send(err);
    })
});

router.put("/estrela/edit/:id", (req, res) => {
    Estrela.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    }).then(() => {
        res.status(200).send("Atualizado");
    }).catch((err) => {
        res.status(500).send("Erro: " + err);
    });
});

router.delete("/estrela/del/:id", (req, res) => {
    Estrela.remove({ _id: req.params.id }).then(() => {
        res.status(200).send('Deletou de boas')
    }).catch((err) => {
        res.status(500).send('Erro ao deletar: ' + err);
    })
});

//Anãs brancas

router.get("/anasBrancas", (req, res) => {
    Estrela.find({tipo_estrela: "Anã branca"}).sort({ data: "asc" }).then((anas_brancas) => {
        res.status(200).send({ anas_brancas });
    }).catch((err) => {
        res.status(500).send("Erro: " + err);
    })
})

//Anãs vermelhas

router.get("/anasVermelhas", (req, res) => {
    Estrela.find({tipo_estrela: "Anã vermelha"}).sort({ data: "asc" }).then((anas_vermelhas) => {
        res.status(200).send({ anas_vermelhas });
    }).catch((err) => {
        res.status(500).send("Erro: " + err);
    })
})

//Gigantes azuis

router.get("/gigantesAzuis", (req, res) => {
    Estrela.find({tipo_estrela: "Gigante azul"}).sort({ data: "asc" }).then((gigantes_azuis) => {
        res.status(200).send({ gigantes_azuis });
    }).catch((err) => {
        console.log(err)
        res.status(500).send("Erro: " + err);
    })
})

//Gigantes vermelhas

router.get("/gigantesVermelhas", (req, res) => {
    Estrela.find({tipo_estrela: "Gigante vermelha"}).sort({ data: "asc" }).then((gigantes_vermelhas) => {
        res.status(200).send({ gigantes_vermelhas });
    }).catch((err) => {
        console.log(err)
        res.status(500).send("Erro: " + err);
    })
})

//Estrelas binárias

router.get("/estrelasBinarias", (req, res) => {
    Estrela.find({tipo_estrela: "Estrela binária"}).sort({ data: "asc" }).then((estrelas_binarias) => {
        res.status(200).send({ estrelas_binarias });
    }).catch((err) => {
        console.log(err)
        res.status(500).send("Erro: " + err);
    })
})

//Sistemas Planetários

router.get("/sistemasPlanetarios", (req, res) => {
    SistemaPlanetario.find().sort({ data: "asc" }).then((sistemas_planetarios) => {
        res.status(200).send({ sistemas_planetarios });
    }).catch((err) => {
        console.log(err)
        res.status(500).send("Erro: " + err);
    })
})

router.post("/sistemaPlanetario", (req, res) => {
    const novoSistema = req.body;
    new SistemaPlanetario(novoSistema).save().then(() => {
        res.status(200).send('Requisição recebida com sucesso!');
    }).catch((err) => {
        res.redirect("/admin/sistemasPlanetarios");
        console.log(err)
        res.status(500).send(err);
    })
});

router.put("/sistemaPlanetario/edit/:id", (req, res) => {
    SistemaPlanetario.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    }).then(() => {
        res.status(200).send("Atualizado");
    }).catch((err) => {
        console.log(err)
        res.status(500).send("Erro: " + err);
    });
})

router.delete("/sistemaPlanetario/del/:id", (req, res) => {
    SistemaPlanetario.remove({ _id: req.params.id }).then(() => {
        res.status(200).send('Deletou de boas')
    }).catch((err) => {
        console.log(err)
        res.status(500).send('Erro ao deletar: ' + err);
    })
});

//Galáxias

router.get("/galaxias", (req, res) => {
    Galaxia.find().sort({ data: "asc" }).then((galaxias) => {
        res.status(200).send({ galaxias });
    }).catch((err) => {
        console.log(err)
        res.status(500).send("Erro: " + err);
    })
})

router.post("/galaxia", (req, res) => {
    const novaGalaxia = req.body;
    new Galaxia(novaGalaxia).save().then(() => {
        res.status(200).send('Requisição recebida com sucesso!');
    }).catch((err) => {
        console.log(err)
        res.redirect("/admin/galaxias");
        res.status(500).send(err);
    })
});

router.put("/galaxia/edit/:id", (req, res) => {
    Galaxia.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    }).then(() => {
        res.status(200).send("Atualizado");
    }).catch((err) => {
        console.log(err)
        res.status(500).send("Erro: " + err);
    });
})

router.delete("/galaxia/del/:id", (req, res) => {
    Galaxia.findById(req.params.id). then( galaxia => {
        SistemaPlanetario.find().then( sistemas => {
            for (const idSistemaGalaxia of galaxia.id_sistemas) {
                if(idSistemaGalaxia == sistemas._id){
                    SistemaPlanetario.remove({ _id: sistemas._id }).then(() => {
                        res.status(200).send(`Os sistemas planetários relacionados à galáxia ${galaxia.nome} foram deletadas!`)                
                    }).catch((err) =>{
                        console.log(err)
                        res.status(500).send(`Erro ao deletar os sistemas relacionados à galáxia ${galaxia.nome}`)
                    });
                }
            }
        })
    });
    Galaxia.remove({ _id: req.params.id }).then(() => {
        res.status(200).send('Galáxia deletada')
    }).catch((err) => {
        console.log(err)
        res.status(500).send('Erro ao deletar a galáxia: ' + err);
    })
});

module.exports = router;
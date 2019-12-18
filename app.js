//carregando módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const admin = require("./routes/admin");
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');
const db = require("./config/db");

//configurações
//sessão
app.use(cors());
app.use(session({
    secret: "anyway",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

//middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});
//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
//mongoose
mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI).then(() => {
    console.log("conectado ao mongo");
}).catch((err) => {
    console.log("Erro ao se conectar ao mongo: " + err);
});

//public
app.use(express.static(path.join(__dirname, "public")));

//rotas

app.use('/admin', admin);

//outros
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log("servidor rodando! ")
})
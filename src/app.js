const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const admin = require("./routes/admin");
const session = require("express-session")
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

app.use(session({
    secret: "anyway",
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://edilsonjr:paodebatata@cluster0-3nte5.mongodb.net/test?retryWrites=true&w=majority").then(() => {
    console.log("conectado ao mongo");
}).catch((err) => {
    console.log("erro ao se conectar: \n" + err);
})

app.use(express.static(path.join(__dirname, "public")));

app.use('/universo', admin);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log("servidor rodando!")
})
if(process.env.NOVE_ENV == "production"){
    module.exports = {mongoURI: "mongodb+srv://edilsonjr:99370940a@cluster0-3nte5.mongodb.net/test?retryWrites=true&w=majority"}
}else{
    module.exports = {mongoURI: "mongodb://localhost/universo"}
}
const mongoose = require("mongoose")
const URL = "mongodb://karen:karen123@ds121225.mlab.com:21225/news_uni"

mongoose.connect(URL, {useNewUrlParser: true}, () => {
    console.log("Conexión exitosa a la BD");
})

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId; //AUTOINCREMENTABLE DE MONGO AKA EL ID

const postSchema = new Schema({
    post: ObjectId,
    titulo: String,
    autor: String,
    contenido: String
   
}) 


const Post= mongoose.model("Post", postSchema);

module.exports = {Post}
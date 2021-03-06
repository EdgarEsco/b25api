const express = require("express");
const bodyParser = require("body-parser");
const {Post} = require("./mongooseClient");

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send({message: "index"})
})

app.get("/api/v1/post", (req, res) =>{
    Post.find().exec()
    .then(posts => res.send(posts))
    .catch(err => res.status(400).send(err))
})

app.post("/api/v1/post", (req, res) => {
    const  {post, titulo, autor, contenido} = req.body;
    const nuevoPost = Post({
        post,
        titulo, 
        autor,
        contenido      
    })

    Post.create(nuevoPost).then((post)=>{
        return res.status(201).json({"message":"Post Creado","id":post._id})
    }).catch((err) => {
        console.log(err);
        return res.json(err)
    })

    /* nuevoPost.save((err,post)=>{
        if(err){
            return res.status(400)
        }else{
            return res.status(200)
        }
    })
     */
    /*=>{
        Post ? res.status(201).send(post) : res.status(400).send(err)
    })*/
  
});

app.put("/api/v1/post/:uid", (req, res) =>{
    const {uid} = req.params
    Post.findByIdAndUpdate(uid, {$set : req.body}, {new: true}).exec()
    .then(newPost => res.status(201).send(newPost))
    .catch(err => res.status(409).send(err))
})

app.get("/api/v1/post/:uid", (req, res) =>{
    const {uid} = req.params
    Post.findById(uid).exec()
    .then(post => {
        post
        ? res.status(200).send(post)
        : res.status(404).send({message :"Error: Post no encontrada"} )
    })
    .catch(err => {
        res.status(409).send(err)
    })
})

app.delete("/api/v1/post/:uid", (req, res) =>{
    const {uid} = req.params
    Post.findByIdAndRemove(uid).exec()
    .then(post => {
        res.status(204).send({
            message : "Post borrado exitosamente",
            body : post
        })
    })
    .catch(err => {
        res.status(404).send(err)
    })
})


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})
const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3000;
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

    nuevoPost.save((err, Post) =>{
        err ? res.status(409).send(err) : res.status(201).send(post)
    })
  
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


app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
})
const {getPosts, addPost, modificarLikes, eliminarPost} = require("./consultas")
const express = require("express");
const cors = require("cors");
const app = express();

app.listen(3001, console.log("servidor funciona"))

app.use(express.json())
app.use(cors())

//ruta le permite al front end recibir los registros de la base de datos
app.get("/posts", async (req, res) => {
    const posts = await getPosts();
    res.json(posts)
})

app.post("/posts",async  (req, res) => {
    const {titulo, img, descripcion, likes} = req.body;
    await addPost(titulo, img, descripcion, likes)
    res.status(201).json("Agregado")
    
})

app.put("/posts/like/:id", async (req, res) => {
    const {id} = req.params
    await modificarLikes(id)
    res.send("Like actualizado")
})

app.delete("/posts/:id", async (req, res) => {
    const {id} = req.params
    await eliminarPost(id);
    res.send("Post eliminado")
})
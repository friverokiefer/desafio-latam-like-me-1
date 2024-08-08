import express from 'express';
import cors from 'cors';
import { getTable, addNewRegister } from './queries.js';

const app = express();
const port = 3000;

// Habilitar CORS
app.use(cors());
app.use(express.json());

// Ruta GET para obtener todos los posts
app.get('/posts', async (req, res) => {
  try {
    const rows = await getTable("posts");
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ruta POST para crear un nuevo post
app.post('/posts', async (req, res) => {
  const { titulo, img, descripcion, likes } = req.body;
  try {
    const newPost = await addNewRegister(titulo, img, descripcion, likes);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

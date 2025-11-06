const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/productos', (req, res) => {
  const data = fs.readFileSync('./data/productos.json');
  res.json(JSON.parse(data));
});

app.get('/api/categorias', (req, res) => {
  const data = fs.readFileSync('./data/categorias.json');
  res.json(JSON.parse(data));
});

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});

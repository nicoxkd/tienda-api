const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Importar rutas
const productosRoutes = require('./routes/productosRoutes');

// Usar las rutas con el prefijo /api/productos
app.use('/api/productos', productosRoutes);

// Si quieres, también puedes importar categorías más tarde:
// const categoriasRoutes = require('./routes/categoriasRoutes');
// app.use('/api/categorias', categoriasRoutes);

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});

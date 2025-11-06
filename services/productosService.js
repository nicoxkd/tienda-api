const fs = require('fs');
const path = require('path');
const rutaProductos = path.join(__dirname, '../data/productos.json');
const rutaCategorias = path.join(__dirname, '../data/categorias.json');

function leerJSON(ruta) {
  if (!fs.existsSync(ruta)) fs.writeFileSync(ruta, '[]');
  return JSON.parse(fs.readFileSync(ruta, 'utf-8'));
}

function guardarJSON(ruta, datos) {
  fs.writeFileSync(ruta, JSON.stringify(datos, null, 2));
}

exports.listar = () => leerJSON(rutaProductos);

exports.listarConCategorias = () => {
  const productos = leerJSON(rutaProductos);
  const categorias = leerJSON(rutaCategorias);
  return productos.map(p => {
    const categoria = categorias.find(c => c.id === p.categoriaId);
    return { ...p, categoria: categoria ? categoria.nombre : 'Sin categoría' };
  });
};

exports.buscarPorId = (id) => leerJSON(rutaProductos).find(p => p.id === id);

exports.crear = (nuevo) => {
  const datos = leerJSON(rutaProductos);
  nuevo.id = datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1;
  datos.push(nuevo);
  guardarJSON(rutaProductos, datos);
  return nuevo;
};

exports.actualizar = (id, cambios) => {
  const datos = leerJSON(rutaProductos);
  const index = datos.findIndex(p => p.id === id);
  if (index === -1) return null;
  datos[index] = { ...datos[index], ...cambios };
  guardarJSON(rutaProductos, datos);
  return datos[index];
};

exports.eliminar = (id) => {
  const datos = leerJSON(rutaProductos);
  const index = datos.findIndex(p => p.id === id);
  if (index === -1) return null;
  const eliminado = datos.splice(index, 1);
  guardarJSON(rutaProductos, datos);
  return eliminado[0];
};

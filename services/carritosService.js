const fs = require('fs');
const path = require('path');

const rutaCarritos = path.join(__dirname, '../data/carritos.json');
const rutaProductos = path.join(__dirname, '../data/productos.json');

function leer(ruta) {
  return JSON.parse(fs.readFileSync(ruta, 'utf-8') || '[]');
}
function guardar(ruta, datos) {
  fs.writeFileSync(ruta, JSON.stringify(datos, null, 2));
}

exports.listar = () => leer(rutaCarritos);

exports.listarConProductos = () => {
  const carritos = leer(rutaCarritos);
  const productos = leer(rutaProductos);
  return carritos.map(c => {
    const productosEnCarrito = (c.productos || []).map(pid => productos.find(prod => prod.id === pid)).filter(Boolean);
    return { ...c, productos: productosEnCarrito };
  });
};

exports.buscarPorId = (id) => leer(rutaCarritos).find(c => c.id === id);

exports.crear = (nuevo) => {
  if (!nuevo || !nuevo.clienteId || !Array.isArray(nuevo.productos)) throw new Error('Campos obligatorios: clienteId, productos[]');
  const datos = leer(rutaCarritos);
  nuevo.id = datos.length ? Math.max(...datos.map(d => d.id)) + 1 : 1;
  datos.push(nuevo);
  guardar(rutaCarritos, datos);
  return nuevo;
};

exports.actualizar = (id, cambios) => {
  const datos = leer(rutaCarritos);
  const index = datos.findIndex(d => d.id === id);
  if (index === -1) return null;
  datos[index] = { ...datos[index], ...cambios };
  guardar(rutaCarritos, datos);
  return datos[index];
};

exports.eliminar = (id) => {
  const datos = leer(rutaCarritos);
  const index = datos.findIndex(d => d.id === id);
  if (index === -1) return null;
  const eliminado = datos.splice(index, 1);
  guardar(rutaCarritos, datos);
  return eliminado[0];
};

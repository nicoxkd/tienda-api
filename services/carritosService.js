const fs = require('fs');
const path = require('path');
const rutaCarritos = path.join(__dirname, '../data/carritos.json');

function leerJSON(ruta) {
  if (!fs.existsSync(ruta)) fs.writeFileSync(ruta, '[]');
  return JSON.parse(fs.readFileSync(ruta, 'utf-8'));
}

function guardarJSON(ruta, datos) {
  fs.writeFileSync(ruta, JSON.stringify(datos, null, 2));
}

exports.listar = () => leerJSON(rutaCarritos);

exports.buscarPorId = (id) => leerJSON(rutaCarritos).find(c => c.id === id);

exports.agregar = (nuevo) => {
  const datos = leerJSON(rutaCarritos);
  nuevo.id = datos.length ? Math.max(...datos.map(c => c.id)) + 1 : 1;
  datos.push(nuevo);
  guardarJSON(rutaCarritos, datos);
  return nuevo;
};

exports.actualizar = (id, cambios) => {
  const datos = leerJSON(rutaCarritos);
  const index = datos.findIndex(c => c.id === id);
  if (index === -1) return null;
  datos[index] = { ...datos[index], ...cambios };
  guardarJSON(rutaCarritos, datos);
  return datos[index];
};

exports.eliminar = (id) => {
  const datos = leerJSON(rutaCarritos);
  const index = datos.findIndex(c => c.id === id);
  if (index === -1) return null;
  const eliminado = datos.splice(index, 1);
  guardarJSON(rutaCarritos, datos);
  return eliminado[0];
};

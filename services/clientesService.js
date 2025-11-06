const fs = require('fs');
const path = require('path');

const ruta = path.join(__dirname, '../data/clientes.json');

function leer() {
  return JSON.parse(fs.readFileSync(ruta, 'utf-8') || '[]');
}
function guardar(datos) {
  fs.writeFileSync(ruta, JSON.stringify(datos, null, 2));
}

exports.listar = () => leer();
exports.buscarPorId = (id) => leer().find(c => c.id === id);

exports.crear = (nuevo) => {
  if (!nuevo || !nuevo.nombre || !nuevo.email) throw new Error('Campos obligatorios: nombre, email');
  const datos = leer();
  nuevo.id = datos.length ? Math.max(...datos.map(d => d.id)) + 1 : 1;
  datos.push(nuevo);
  guardar(datos);
  return nuevo;
};

exports.actualizar = (id, cambios) => {
  const datos = leer();
  const index = datos.findIndex(d => d.id === id);
  if (index === -1) return null;
  datos[index] = { ...datos[index], ...cambios };
  guardar(datos);
  return datos[index];
};

exports.eliminar = (id) => {
  const datos = leer();
  const index = datos.findIndex(d => d.id === id);
  if (index === -1) return null;
  const eliminado = datos.splice(index, 1);
  guardar(datos);
  return eliminado[0];
};
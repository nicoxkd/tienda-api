const fs = require('fs');
const path = require('path');
const ruta = path.join(__dirname, '../data/pedidos.json');

function leer() {
  if (!fs.existsSync(ruta)) fs.writeFileSync(ruta, '[]');
  return JSON.parse(fs.readFileSync(ruta, 'utf-8'));
}

function guardar(datos) {
  fs.writeFileSync(ruta, JSON.stringify(datos, null, 2));
}

exports.listar = () => leer();

exports.buscarPorId = (id) => leer().find(p => p.id === id);

exports.crear = (nuevo) => {
  const datos = leer();
  nuevo.id = datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1;
  nuevo.fecha = new Date().toISOString();
  datos.push(nuevo);
  guardar(datos);
  return nuevo;
};

exports.actualizar = (id, cambios) => {
  const datos = leer();
  const i = datos.findIndex(p => p.id === id);
  if (i === -1) return null;
  datos[i] = { ...datos[i], ...cambios };
  guardar(datos);
  return datos[i];
};

exports.eliminar = (id) => {
  const datos = leer();
  const i = datos.findIndex(p => p.id === id);
  if (i === -1) return null;
  const eliminado = datos.splice(i, 1);
  guardar(datos);
  return eliminado[0];
};

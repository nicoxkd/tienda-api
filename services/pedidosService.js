const fs = require('fs');
const path = require('path');

const rutaPedidos = path.join(__dirname, '../data/pedidos.json');
const rutaProductos = path.join(__dirname, '../data/productos.json');

function leer(ruta) {
  return JSON.parse(fs.readFileSync(ruta, 'utf-8') || '[]');
}
function guardar(ruta, datos) {
  fs.writeFileSync(ruta, JSON.stringify(datos, null, 2));
}

exports.listar = () => leer(rutaPedidos);

// Devuelve pedidos con los objetos producto incluidos en 'productos' (JOIN manual)
exports.listarConProductos = () => {
  const pedidos = leer(rutaPedidos);
  const productos = leer(rutaProductos);
  return pedidos.map(p => {
    const productosEnPedido = (p.productos || []).map(pid => productos.find(prod => prod.id === pid)).filter(Boolean);
    return { ...p, productos: productosEnPedido };
  });
};

exports.buscarPorId = (id) => leer(rutaPedidos).find(p => p.id === id);

exports.crear = (nuevo) => {
  if (!nuevo || !nuevo.clienteId || !Array.isArray(nuevo.productos)) {
    throw new Error('Campos obligatorios: clienteId, productos[]');
  }
  // calcular total simple (suma de precios actuales)
  const productos = leer(rutaProductos);
  const productosSeleccionados = nuevo.productos.map(pid => {
    const prod = productos.find(p => p.id === pid);
    if (!prod) throw new Error(`Producto con id ${pid} no existe`);
    return prod;
  });
  const total = productosSeleccionados.reduce((s, p) => s + (p.precio || 0), 0);

  const datos = leer(rutaPedidos);
  nuevo.id = datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1;
  nuevo.total = parseFloat(total.toFixed(2));
  nuevo.fecha = nuevo.fecha || new Date().toISOString().split('T')[0];
  datos.push(nuevo);
  guardar(rutaPedidos, datos);
  return nuevo;
};

exports.actualizar = (id, cambios) => {
  const datos = leer(rutaPedidos);
  const index = datos.findIndex(d => d.id === id);
  if (index === -1) return null;
  datos[index] = { ...datos[index], ...cambios };
  // Si se cambian productos, recalcular total
  if (Array.isArray(cambios.productos)) {
    const productos = leer(rutaProductos);
    const total = cambios.productos.reduce((s, pid) => {
      const prod = productos.find(p => p.id === pid);
      return s + (prod ? prod.precio : 0);
    }, 0);
    datos[index].total = parseFloat(total.toFixed(2));
  }
  guardar(rutaPedidos, datos);
  return datos[index];
};

exports.eliminar = (id) => {
  const datos = leer(rutaPedidos);
  const index = datos.findIndex(d => d.id === id);
  if (index === -1) return null;
  const eliminado = datos.splice(index, 1);
  guardar(rutaPedidos, datos);
  return eliminado[0];
};

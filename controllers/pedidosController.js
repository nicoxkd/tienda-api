const pedidosService = require('../services/pedidosService');

exports.obtenerTodos = (req, res) => {
  const pedidos = pedidosService.listarConProductos();
  res.json(pedidos);
};

exports.obtenerPorId = (req, res) => {
  const pedido = pedidosService.buscarPorId(parseInt(req.params.id));
  pedido ? res.json(pedido) : res.status(404).json({ mensaje: 'Pedido no encontrado' });
};

exports.crear = (req, res) => {
  try {
    const nuevo = pedidosService.crear(req.body);
    res.status(201).json(nuevo);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.actualizar = (req, res) => {
  const actualizado = pedidosService.actualizar(parseInt(req.params.id), req.body);
  actualizado ? res.json(actualizado) : res.status(404).json({ mensaje: 'Pedido no encontrado' });
};

exports.eliminar = (req, res) => {
  const eliminado = pedidosService.eliminar(parseInt(req.params.id));
  eliminado ? res.json(eliminado) : res.status(404).json({ mensaje: 'Pedido no encontrado' });
};

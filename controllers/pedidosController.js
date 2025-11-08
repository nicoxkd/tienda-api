const pedidosService = require('../services/pedidosService');

exports.obtenerTodos = (req, res) => {
  const pedidos = pedidosService.listar();
  res.json(pedidos);
};

exports.obtenerPorId = (req, res) => {
  const id = parseInt(req.params.id);
  const pedido = pedidosService.buscarPorId(id);
  if (pedido) res.json(pedido);
  else res.status(404).json({ mensaje: 'Pedido no encontrado' });
};

exports.crear = (req, res) => {
  const nuevo = pedidosService.crear(req.body);
  res.status(201).json(nuevo);
};

exports.actualizar = (req, res) => {
  const id = parseInt(req.params.id);
  const actualizado = pedidosService.actualizar(id, req.body);
  actualizado ? res.json(actualizado) : res.status(404).json({ mensaje: 'Pedido no encontrado' });
};

exports.eliminar = (req, res) => {
  const id = parseInt(req.params.id);
  const eliminado = pedidosService.eliminar(id);
  eliminado ? res.json(eliminado) : res.status(404).json({ mensaje: 'Pedido no encontrado' });
};

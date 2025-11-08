const clientesService = require('../services/clientesService');

exports.obtenerTodos = (req, res) => {
  const clientes = clientesService.listar();
  res.json(clientes);
};

exports.obtenerPorId = (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = clientesService.buscarPorId(id);
  if (cliente) res.json(cliente);
  else res.status(404).json({ mensaje: 'Cliente no encontrado' });
};

exports.crear = (req, res) => {
  const nuevo = clientesService.crear(req.body);
  res.status(201).json(nuevo);
};

exports.actualizar = (req, res) => {
  const id = parseInt(req.params.id);
  const actualizado = clientesService.actualizar(id, req.body);
  actualizado ? res.json(actualizado) : res.status(404).json({ mensaje: 'Cliente no encontrado' });
};

exports.eliminar = (req, res) => {
  const id = parseInt(req.params.id);
  const eliminado = clientesService.eliminar(id);
  eliminado ? res.json(eliminado) : res.status(404).json({ mensaje: 'Cliente no encontrado' });
};

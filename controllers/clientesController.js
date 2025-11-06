const clientesService = require('../services/clientesService');

exports.obtenerTodos = (req, res) => {
  res.json(clientesService.listar());
};

exports.obtenerPorId = (req, res) => {
  const c = clientesService.buscarPorId(parseInt(req.params.id));
  c ? res.json(c) : res.status(404).json({ mensaje: 'Cliente no encontrado' });
};

exports.crear = (req, res) => {
  try {
    const nuevo = clientesService.crear(req.body);
    res.status(201).json(nuevo);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.actualizar = (req, res) => {
  const actualizado = clientesService.actualizar(parseInt(req.params.id), req.body);
  actualizado ? res.json(actualizado) : res.status(404).json({ mensaje: 'Cliente no encontrado' });
};

exports.eliminar = (req, res) => {
  const eliminado = clientesService.eliminar(parseInt(req.params.id));
  eliminado ? res.json(eliminado) : res.status(404).json({ mensaje: 'Cliente no encontrado' });
};
const carritosService = require('../services/carritosService');

exports.obtenerTodos = (req, res) => {
  const items = carritosService.listar();
  res.json(items);
};

exports.obtenerPorId = (req, res) => {
  const id = parseInt(req.params.id);
  const item = carritosService.buscarPorId(id);
  if (item) res.json(item);
  else res.status(404).json({ mensaje: 'Carrito no encontrado' });
};

exports.agregar = (req, res) => {
  const nuevo = carritosService.agregar(req.body);
  res.status(201).json(nuevo);
};

exports.actualizar = (req, res) => {
  const id = parseInt(req.params.id);
  const actualizado = carritosService.actualizar(id, req.body);
  actualizado
    ? res.json(actualizado)
    : res.status(404).json({ mensaje: 'Carrito no encontrado' });
};

exports.eliminar = (req, res) => {
  const id = parseInt(req.params.id);
  const eliminado = carritosService.eliminar(id);
  eliminado
    ? res.json(eliminado)
    : res.status(404).json({ mensaje: 'Carrito no encontrado' });
};

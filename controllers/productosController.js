const productosService = require('../services/productosService');

exports.obtenerTodos = (req, res) => {
  const productos = productosService.listar();
  res.json(productos);
};

exports.obtenerPorId = (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productosService.buscarPorId(id);
  if (producto) {
    res.json(producto);
  } else {
    res.status(404).json({ mensaje: 'No encontrado' });
  }
};

exports.crear = (req, res) => {
  const nuevo = productosService.crear(req.body);
  res.status(201).json(nuevo);
};

exports.actualizar = (req, res) => {
  const id = parseInt(req.params.id);
  const actualizado = productosService.actualizar(id, req.body);
  actualizado
    ? res.json(actualizado)
    : res.status(404).json({ mensaje: 'No encontrado' });
};

exports.eliminar = (req, res) => {
  const id = parseInt(req.params.id);
  const eliminado = productosService.eliminar(id);
  eliminado
    ? res.json(eliminado)
    : res.status(404).json({ mensaje: 'No encontrado' });
};

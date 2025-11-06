const carritosService = require('../services/carritosService');

exports.obtenerTodos = (req, res) => {
  const carritos = carritosService.listarConProductos();
  res.json(carritos);
};

exports.obtenerPorId = (req, res) => {
  const carrito = carritosService.buscarPorId(parseInt(req.params.id));
  carrito ? res.json(carrito) : res.status(404).json({ mensaje: 'Carrito no encontrado' });
};

exports.crear = (req, res) => {
  try {
    const nuevo = carritosService.crear(req.body);
    res.status(201).json(nuevo);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.actualizar = (req, res) => {
  const actualizado = carritosService.actualizar(parseInt(req.params.id), req.body);
  actualizado ? res.json(actualizado) : res.status(404).json({ mensaje: 'Carrito no encontrado' });
};

exports.eliminar = (req, res) => {
  const eliminado = carritosService.eliminar(parseInt(req.params.id));
  eliminado ? res.json(eliminado) : res.status(404).json({ mensaje: 'Carrito no encontrado' });
};

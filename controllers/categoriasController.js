const categoriasService = require('../services/categoriasService');

exports.obtenerTodos = (req, res) => {
  res.json(categoriasService.listar());
};

exports.obtenerPorId = (req, res) => {
  const cat = categoriasService.buscarPorId(parseInt(req.params.id));
  cat ? res.json(cat) : res.status(404).json({ mensaje: 'Categoría no encontrada' });
};

exports.crear = (req, res) => {
  try {
    const nuevo = categoriasService.crear(req.body);
    res.status(201).json(nuevo);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.actualizar = (req, res) => {
  const actualizado = categoriasService.actualizar(parseInt(req.params.id), req.body);
  actualizado ? res.json(actualizado) : res.status(404).json({ mensaje: 'Categoría no encontrada' });
};

exports.eliminar = (req, res) => {
  const eliminado = categoriasService.eliminar(parseInt(req.params.id));
  eliminado ? res.json(eliminado) : res.status(404).json({ mensaje: 'Categoría no encontrada' });
};
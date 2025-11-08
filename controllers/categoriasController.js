const categoriasService = require('../services/categoriasService');

exports.obtenerTodas = (req, res) => {
  const categorias = categoriasService.listar();
  res.json(categorias);
};

exports.obtenerPorId = (req, res) => {
  const id = parseInt(req.params.id);
  const categoria = categoriasService.buscarPorId(id);
  if (categoria) res.json(categoria);
  else res.status(404).json({ mensaje: 'Categoría no encontrada' });
};

exports.crear = (req, res) => {
  const nueva = categoriasService.crear(req.body);
  res.status(201).json(nueva);
};

exports.actualizar = (req, res) => {
  const id = parseInt(req.params.id);
  const actualizada = categoriasService.actualizar(id, req.body);
  actualizada ? res.json(actualizada) : res.status(404).json({ mensaje: 'Categoría no encontrada' });
};

exports.eliminar = (req, res) => {
  const id = parseInt(req.params.id);
  const eliminada = categoriasService.eliminar(id);
  eliminada ? res.json(eliminada) : res.status(404).json({ mensaje: 'Categoría no encontrada' });
};

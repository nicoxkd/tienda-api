const proveedoresService = require('../services/proveedoresService');

exports.obtenerTodos = (req, res) => {
  const proveedores = proveedoresService.listar();
  res.json(proveedores);
};

exports.obtenerPorId = (req, res) => {
  const id = parseInt(req.params.id);
  const proveedor = proveedoresService.buscarPorId(id);
  if (proveedor) res.json(proveedor);
  else res.status(404).json({ mensaje: 'Proveedor no encontrado' });
};

exports.crear = (req, res) => {
  const nuevo = proveedoresService.crear(req.body);
  res.status(201).json(nuevo);
};

exports.actualizar = (req, res) => {
  const id = parseInt(req.params.id);
  const actualizado = proveedoresService.actualizar(id, req.body);
  actualizado ? res.json(actualizado) : res.status(404).json({ mensaje: 'Proveedor no encontrado' });
};

exports.eliminar = (req, res) => {
  const id = parseInt(req.params.id);
  const eliminado = proveedoresService.eliminar(id);
  eliminado ? res.json(eliminado) : res.status(404).json({ mensaje: 'Proveedor no encontrado' });
};

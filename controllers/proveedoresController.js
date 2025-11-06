const proveedoresService = require('../services/proveedoresService');

exports.obtenerTodos = (req, res) => {
  res.json(proveedoresService.listar());
};

exports.obtenerPorId = (req, res) => {
  const p = proveedoresService.buscarPorId(parseInt(req.params.id));
  p ? res.json(p) : res.status(404).json({ mensaje: 'Proveedor no encontrado' });
};

exports.crear = (req, res) => {
  try {
    const nuevo = proveedoresService.crear(req.body);
    res.status(201).json(nuevo);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.actualizar = (req, res) => {
  const actualizado = proveedoresService.actualizar(parseInt(req.params.id), req.body);
  actualizado ? res.json(actualizado) : res.status(404).json({ mensaje: 'Proveedor no encontrado' });
};

exports.eliminar = (req, res) => {
  const eliminado = proveedoresService.eliminar(parseInt(req.params.id));
  eliminado ? res.json(eliminado) : res.status(404).json({ mensaje: 'Proveedor no encontrado' });
};

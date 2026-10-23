const Producto = require('../models/producto.model');
// Valida los datos recibidos. Devuelve un mensaje de error o null si todo está bien.
const validarProducto = ({ nombre, precio, stock }) => {
 if (typeof nombre !== 'string' || nombre.trim() === '') {
 return 'El nombre es obligatorio';
 }
 if (precio === undefined || isNaN(Number(precio)) || Number(precio) < 0) {
 return 'El precio debe ser un número mayor o igual a 0';
 }
 if (stock !== undefined && (!Number.isInteger(Number(stock)) || Number(stock) < 0))
{
 return 'El stock debe ser un número entero mayor o igual a 0';
 }
 return null;
};
// GET /api/productos
const listar = async (req, res) => {
 try {
 const productos = await Producto.obtenerTodos();
 res.status(200).json(productos);
 } catch (error) {
 console.error(error);
 res.status(500).json({ mensaje: 'Error al obtener los productos' });
 }
};
// GET /api/productos/:id
const obtener = async (req, res) => {
 try {
 const producto = await Producto.obtenerPorId(req.params.id);
 if (!producto) {
 return res.status(404).json({ mensaje: 'Producto no encontrado' });
 }
 res.status(200).json(producto);
 } catch (error) {
 console.error(error);
 res.status(500).json({ mensaje: 'Error al obtener el producto' });
 }
};
// POST /api/productos
const crear = async (req, res) => {
 try {
 const datos = req.body ?? {};
 const errorValidacion = validarProducto(datos);
 if (errorValidacion) {
 return res.status(400).json({ mensaje: errorValidacion });
 }
 const nuevo = await Producto.crear(datos);
 res.status(201).json(nuevo);
 } catch (error) {
 console.error(error);
 res.status(500).json({ mensaje: 'Error al crear el producto' });
 }
};
// PUT /api/productos/:id
const actualizar = async (req, res) => {
 try {
 const { id } = req.params;
 const datos = req.body ?? {};
 const errorValidacion = validarProducto(datos);
 if (errorValidacion) {
 return res.status(400).json({ mensaje: errorValidacion });
 }
 const filasAfectadas = await Producto.actualizar(id, datos);
 if (filasAfectadas === 0) {
 return res.status(404).json({ mensaje: 'Producto no encontrado' });
 }
 const actualizado = await Producto.obtenerPorId(id);
 res.status(200).json(actualizado);
 } catch (error) {
 console.error(error);
 res.status(500).json({ mensaje: 'Error al actualizar el producto' });
 }
};
// DELETE /api/productos/:id
const eliminar = async (req, res) => {
 try {
 const filasAfectadas = await Producto.eliminar(req.params.id);
 if (filasAfectadas === 0) {
 return res.status(404).json({ mensaje: 'Producto no encontrado' });
 }
 res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
 } catch (error) {
 console.error(error);
 res.status(500).json({ mensaje: 'Error al eliminar el producto' });
 }
};
module.exports = { listar, obtener, crear, actualizar, eliminar };

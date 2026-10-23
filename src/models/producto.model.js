const db = require('../config/db');
const Producto = {
 async obtenerTodos() {
 const [filas] = await db.query('SELECT * FROM productos');
 return filas;
 },
 async obtenerPorId(id) {
 const [filas] = await db.query('SELECT * FROM productos WHERE id = ?', [id]);
 return filas[0];
 },
 async crear({ nombre, precio, stock = 0 }) {
 const [resultado] = await db.query(
 'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)',
 [nombre, precio, stock]
 );
 return { id: resultado.insertId, nombre, precio: Number(precio), stock:
Number(stock) };
 },
 async actualizar(id, { nombre, precio, stock = 0 }) {
 const [resultado] = await db.query(
 'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?',
 [nombre, precio, stock, id]
 );
 return resultado.affectedRows;
 },
 async eliminar(id) {
 const [resultado] = await db.query('DELETE FROM productos WHERE id = ?', [id]);
 return resultado.affectedRows;
 }
};
module.exports = Producto;Producto;
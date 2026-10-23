const express = require('express');
const productoRoutes = require('./routes/producto.routes');
const app = express();
// Permite que Express entienda el JSON que envía el cliente
app.use(express.json());
// Ruta de prueba
app.get('/', (req, res) => {
 res.json({ mensaje: 'API de productos funcionando' });
});
// Todas las rutas de productos comienzan con /api/productos
app.use('/api/productos', productoRoutes);
// Si ninguna ruta coincide, respondemos 404
app.use((req, res) => {
 res.status(404).json({ mensaje: 'Ruta no encontrada' });
});
module.exports = app;
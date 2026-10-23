require('dotenv').config();
const app = require('./app');
const db = require('./config/db');
const PORT = process.env.PORT || 3000;
// Comprobamos que la conexión con MySQL funciona
db.query('SELECT 1')
 .then(() => console.log('Conectado a MySQL'))
 .catch((error) => console.error('Error al conectar con MySQL:', error.message));
app.listen(PORT, () => {
 console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
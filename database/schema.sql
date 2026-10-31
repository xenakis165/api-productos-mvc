CREATE DATABASE IF NOT EXISTS tienda_db
 CHARACTER SET utf8mb4
 COLLATE utf8mb4_unicode_ci;
USE tienda_db;
CREATE TABLE IF NOT EXISTS productos (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nombre VARCHAR(100) NOT NULL,
 precio DECIMAL(10,2) NOT NULL,
 stock INT NOT NULL DEFAULT 0,
 usuario VARCHAR(50) NOT NULL,
 creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO productos (nombre, precio, stock, usuario) VALUES
 ('Mouse inalámbrico', 45.90, 20, ‘SENATI’),
 ('Teclado mecánico', 129.00, 10, ‘SENATI’);

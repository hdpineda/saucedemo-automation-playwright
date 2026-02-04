-- Creación de tablas para el sistema de gimnasios
CREATE TABLE Cliente (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    ciudad VARCHAR(50) NOT NULL
);

CREATE TABLE Sucursal (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ciudad VARCHAR(50) NOT NULL
);

CREATE TABLE Producto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipoProducto VARCHAR(50) NOT NULL
);

CREATE TABLE Inscripcion (
    idProducto INT REFERENCES Producto(id),
    idCliente INT REFERENCES Cliente(id),
    PRIMARY KEY (idProducto, idCliente)
);

CREATE TABLE Disponibilidad (
    idSucursal INT REFERENCES Sucursal(id),
    idProducto INT REFERENCES Producto(id),
    PRIMARY KEY (idSucursal, idProducto)
);

CREATE TABLE Visitan (
    idSucursal INT REFERENCES Sucursal(id),
    idCliente INT REFERENCES Cliente(id),
    fechaVisita DATE NOT NULL,
    PRIMARY KEY (idSucursal, idCliente, fechaVisita)
);
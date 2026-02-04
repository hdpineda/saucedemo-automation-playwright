-- Consulta para obtener los nombres y apellidos de los clientes que han visitado una sucursal específica en el último mes
SELECT DISTINCT
    c.nombre, 
    c.apellidos
FROM Cliente c
JOIN Visitan v ON c.id = v.idCliente
JOIN Sucursal s ON s.id = v.idSucursal
WHERE s.nombre = 'Sucursal Norte'
  AND v.fechaVisita >= CURRENT_DATE - INTERVAL '1 month';

-- Consulta para obtener el total de clientes distintos que han visitado cada sucursal
SELECT 
    s.nombre AS sucursal,
    COUNT(DISTINCT v.idCliente) AS total_clientes_distintos
FROM Sucursal s
LEFT JOIN Visitan v ON s.id = v.idSucursal
GROUP BY s.id, s.nombre
ORDER BY total_clientes_distintos DESC;

-- Consulta para obtener los productos disponibles en sucursales de Medellín pero no en Bogotá
SELECT p.nombre
FROM Producto p
JOIN Disponibilidad d ON p.id = d.idProducto
JOIN Sucursal s ON s.id = d.idSucursal
WHERE s.ciudad = 'Medellín'

EXCEPT -- O usa NOT IN si prefieres sintaxis de MySQL

SELECT p2.nombre
FROM Producto p2
JOIN Disponibilidad d2 ON p2.id = d2.idProducto
JOIN Sucursal s2 ON s2.id = d2.idSucursal
WHERE s2.ciudad = 'Bogotá';

-- Consulta para obtener los clientes inscritos en más de dos productos
SELECT 
    c.nombre, 
    c.apellidos, 
    COUNT(i.idProducto) AS cantidad_productos
FROM Cliente c
JOIN Inscripcion i ON c.id = i.idCliente
GROUP BY c.id, c.nombre, c.apellidos
HAVING COUNT(i.idProducto) > 2;

-- Consulta para obtener la última fecha de visita y la sucursal visitada por cada cliente
SELECT 
    c.nombre,
    c.apellidos,
    COALESCE(MAX(v.fechaVisita)::TEXT, 'Sin visitas') AS ultima_fecha,
    COALESCE((
        SELECT s.nombre 
        FROM Visitan v2 
        JOIN Sucursal s ON v2.idSucursal = s.id 
        WHERE v2.idCliente = c.id 
        ORDER BY v2.fechaVisita DESC LIMIT 1
    ), 'N/A') AS sucursal_visitada
FROM Cliente c
LEFT JOIN Visitan v ON c.id = v.idCliente
GROUP BY c.id, c.nombre, c.apellidos;

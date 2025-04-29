# API de Biblioteca

Este proyecto es una API RESTful de gestión de libros. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una base de datos MySQL que almacena la información de los libros.

## Requisitos

- **Node.js**
- **MySQL**

## Pasos para configurar la base de datos

### 1. Crear la base de datos `biblioteca`
Ejecuta el siguiente comando en MySQL para crear la base de datos `biblioteca`:
## sql
CREATE DATABASE biblioteca;

### 2. Seleccionar la base de datos
Selecciona la base de datos que acabas de crear:
## sql
USE biblioteca;

### 3. Crear la tabla libros
Ejecuta este comando para crear la tabla libros, que almacenará los datos de los libros:
## sql
CREATE TABLE libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(50),
    nombre VARCHAR(50),
    descripcion LONGTEXT
);

### 4. Insertar datos de ejemplo
Inserta algunos libros de ejemplo en la base de datos. Puedes usar los siguientes comandos para hacerlo:
## sql
INSERT INTO libros (titulo, nombre, descripcion)
VALUES ('Walden', 'Henry David Thoreau', 'Walden, escrita por Henry David Thoreau en 1854, es una reflexión filosófica y autobiográfica sobre la vida simple en la naturaleza...');

INSERT INTO libros (titulo, nombre, descripcion)
VALUES ('Siddharta', 'Hermann Hesse', 'Siddhartha, escrita por Hermann Hesse en 1922, es una novela espiritual que narra el viaje interior de un joven hindú llamado Siddhartha...');

INSERT INTO libros (titulo, nombre, descripcion)
VALUES ('Sin noticias de Gurb', 'Eduardo Mendoza', 'Sin noticias de Gurb, escrita por Eduardo Mendoza en 1991, es una novela humorística que relata la búsqueda de un extraterrestre...');

INSERT INTO libros (titulo, nombre, descripcion)
VALUES ('El proyecto esposa', 'Graeme Simsion', 'El proyecto esposa, escrita por Graeme Simsion en 2013, es una comedia romántica protagonizada por Don Tillman...');

INSERT INTO libros (titulo, nombre, descripcion)
VALUES ('La señora Potter no es exactamente Santa Claus', 'Laura Fernández', 'La señora Potter no es exactamente Santa Claus, de Laura Fernández, es una novela surrealista...');

INSERT INTO libros (titulo, nombre, descripcion)
VALUES ('Los asquerosos', 'Santiago Lorenzo', 'Los asquerosos, de Santiago Lorenzo, cuenta la historia de Manuel, quien huye a una aldea abandonada...');

### 5. Verificar los libros ingresados
Para ver los libros que se han insertado, puedes ejecutar:
## sql
SELECT * FROM libros;

### 5.1 También puedes consultar un libro específico por su id
## sql
SELECT * FROM libros WHERE id = 2;

### 6. Actualizar un libro existente
Si deseas actualizar la descripción de un libro, usa:
## sql
UPDATE libros 
SET descripcion = "El alquimista es una novela sobre Santiago, un joven pastor andaluz que emprende un viaje en busca de un tesoro soñado..." 
WHERE id = 7;

### 7. Eliminar un libro
Para eliminar un libro, puedes usar:
## sql
DELETE FROM libros WHERE id = 9;

## Configuración de la API
#### 1. Clonar el proyecto
Primero, clona este repositorio en tu máquina local

### 2. Instalar dependencias
Instala las dependencias del proyecto utilizando npm install

### 3.3. Código de la API
El código de la API se encuentra en el archivo index.js. Aquí se gestionan las rutas para realizar operaciones CRUD en la base de datos.

## Probar Endpoints
### EndPoints de la API

## Obtener todos los libros

Método: GET

URL: /api/biblioteca

Descripción: Obtiene todos los libros.

Ejemplo de uso: GET http://localhost:5001/api/biblioteca
## Obtener un libro por ID

Método: GET

URL: /api/libro/:id

Descripción: Obtiene un libro por su ID.

Ejemplo de uso: GET http://localhost:5001/api/libro/2

## Crear un nuevo libro

Método: POST

URL: /api/libro

Descripción: Crea un nuevo libro.

Ejemplo de uso:
POST http://localhost:5001/api/libro
{
  "titulo": "El alquimista",
  "nombre": "Paulo Coelho",
  "descripcion": "Descripción del libro"
}

## Actualizar un libro

Método: PUT

URL: /api/libro/:id

Descripción: Actualiza un libro existente.

Ejemplo de uso:
PUT http://localhost:5001/api/libro/2
{
  "titulo": "Nuevo título",
  "nombre": "Nuevo autor",
  "descripcion": "Nueva descripción"
}

## Eliminar un libro

Método: DELETE

URL: /api/libro/:id

Descripción: Elimina un libro por su ID.

Ejemplo de uso: 
DELETE http://localhost:5001/api/libro/2


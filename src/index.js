//Importar
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

//Crear el servidor
const app = express();

//Función para crear conexión con la base de datos
async function getDBConnection() { // es asíncrona porque las funciones con las bases de datos lo son
    const connection = await mysql.createConnection({ //creo la conexión con la librería que he importado arriba (mysql)
        host: "192.168.64.1", //En mi caso es diferente debido a unos permisos de Windwos
        user: "root",
        password: "2050Hola()",
        database: "biblioteca",
    });
    connection.connect();
    return connection;
}

//Configurar

app.use(cors()); //Habilitar las cors para que pueda recibir peticiones externas
app.use(express.json()) //Para que frontend me pueda enviar JSON
const port = 5001 // Inicializarlo en un puerto

app.listen(port, () => {
    console.log(`Servidor http://localhost:${port}`)
})

//Crear endpoint de tipo get para mostrar todos los libros de la base de datos

app.get("/api/biblioteca", async (req, res) => {
    const connection = await getDBConnection(); // Abrir la conexión
    const sqlQuery = "SELECT * FROM libros"; // Hago una Query para consultar en mi BD
    const [booksResult] = await connection.query(sqlQuery); //Ejecuto la query
    //console.log(booksResult); //pruebo result 

    connection.end(); //Cerrar la conexión

    res.status(200).json({ // Responder a Frontend con los libros
        info: {
            count: booksResult.length
        },
        results: booksResult
    }); //Me devuelve un objeto vacio para que no seme quede colgando

});

// Crear endpoint de tipo get para mostrar un libro solo

app.get("/api/libro/:id", async (req, res) => {
    const connection = await getDBConnection(); //Conectarme a la base de datos
    const { id } = req.params //Recoger el id que me envía frontend con url params -> También se puede hacer con const id = req.params.id
    //console.log(id) Lo hice para probar que me estaba funcionando

    const query = "SELECT * FROM libros WHERE id = ?"; //Consultar a la base de datos "donde el id sea.."
    const [resultBook] = await connection.query(query, [id]); //Ejecutar la query con el id

    connection.end(); //Cerrar conexión
    //console.log(resultBook); Para comprobar que me coge los libros con sus respectivos id

    res.status(200).json({ //Responder a Frontend con la info del libro
        status: "sucess",
        result: resultBook
    });


})

//Crear una nueva receta a través del tipo post (probar en postman)
app.post("/api/libro", async (req, res) => {
    const connection = await getDBConnection(); // Conectarme con la base de datos

    if (!req.body) {
        res.status(404).json({
            succes: false,
            message: "Provide the params"
        })
    } else {
        const { título, nombre, descripción } = req.body; //Recoger el libro  con especificaciones que me envía frontend a través de body params

        if (!título || !nombre || !descripción) { //Bonus alertar al usuario de que ha escrito mal los parametros 
            res.status(404).json({
                success: false,
                message: "Bad params. Provide 'título', 'nombre', 'descripción'."
            })
        } else {
            const sqlQuery = "INSERT INTO libros (titulo, nombre, descripcion)  VALUES(?, ?, ?)"; //Añado el libro nuevo con INSERT INTO y pasandole los valores ? que hacen referencia a la linea de arriba título, nombre y descripción
            const [result] = await connection.query(sqlQuery, [  //Ejecuto la query pasandole los nombres con los que se puede rellenar en frontend (Postman)
                título,
                nombre,
                descripción
            ])
            connection.end(); // Cerrando conexión
            res.status(201).json({ //Respondo a frontend con el estado 201 (indica que la solicitud ha sido un éxito y ha llevado a la creación de un nuevo recurso (libro))
                succes: true,
                id: result.insertId //añado el id que se ha creado automaticamente en Mysql
            });
        }
    }




})

//Actualizar (modificar) los libros a través del tipo put (probar en Postman)
app.put("/api/libro/:id", async (req, res) => {
    const connection = await getDBConnection(); // Conectarme a la base de datos

    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: "Provide the params"
        });
    }

    const { id } = req.params; // Extraer el id desde los parámetros de la URL
    const { título, nombre, descripción } = req.body; // Extraer los datos del libro del cuerpo de la solicitud

    // Verificar que los parámetros necesarios estén presentes
    if (!título || !nombre || !descripción) {
        return res.status(400).json({
            success: false,
            message: "Bad params. Provide 'título', 'nombre', 'descripción'."
        });
    }

    // Realizar la consulta para actualizar el libro
    const sqlQuery = "UPDATE libros SET titulo = ?, nombre = ?, descripcion = ? WHERE id = ?;";
    const [result] = await connection.query(sqlQuery, [título, nombre, descripción, id]);

    connection.end(); // Cerrar la conexión con la base de datos

    // Si no se actualizó ninguna fila, devolver un error
    if (result.affectedRows === 0) { //He tenido que ponerle .affectedRows y no (!id) . Si intentamos usar id no obtendremos la información correcta porque id no es relevante en un UPDATE. En una actualización, no hay un nuevo ID generado. Lo que realmente nos interesa es saber cuántas filas se vieron afectadas, lo que se puede obtener con affectedRows.
        return res.status(404).json({
            success: false,
            message: "The book with the given id does not exist."
        });
    }

    // Responder con éxito si se actualizó el libro
    res.status(200).json({
        success: true,
        message: "Successfully modified book",
        id: id // Devolver el id del libro modificado
    });
});

//Dejar a frontend que elimine un libro (probar en postman)

app.delete("/api/libro/:id", async (req, res) => {
    const connection = await getDBConnection(); // Me conecto a la base de datos
    const { id } = req.params; // Obtengo el id del libro que me manda el frontend a través de los parámetros de la URL

    try {
        // Intento ejecutar las operaciones que podrían fallar en este bloque

        // 1. Antes de eliminar el libro, verifico si realmente existe en la base de datos
        const checkQuery = "SELECT * FROM libros WHERE id = ?";
        const [existingBook] = await connection.query(checkQuery, [id]);

        // Si no encuentro el libro con ese id, respondo con un 404 (no encontrado)
        if (existingBook.length === 0) { // Si no existe el libro
            return res.status(404).json({
                success: false,
                message: "Book with the given id does not exist."
            });
        }

        // 2. Si el libro existe, procedo a eliminarlo de la base de datos
        const sqlQuery = "DELETE FROM libros WHERE id = ?";
        const [result] = await connection.query(sqlQuery, [id]); // Ejecuto la consulta de eliminación

        connection.end(); // Cierro la conexión con la base de datos

        // 3. Verifico si la eliminación fue exitosa
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Failed to delete the book, try again."
            });
        }

        // Si todo va bien, respondo con un mensaje de éxito
        res.status(200).json({
            success: true,
            message: "Book successfully removed."
        });

    } catch (error) {
        // Si ocurre cualquier error en el bloque try, este bloque catch lo captura
        // Y gestiono el error, enviando una respuesta clara al cliente

        console.error(error); // Imprimo el error en la consola para poder debuguear y ver qué ocurrió
        res.status(500).json({
            success: false,
            message: "An error occurred while trying to delete the book."
        });
    }
});
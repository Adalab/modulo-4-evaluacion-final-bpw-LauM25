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
    const { título, nombre, descripción } = req.body; //Recoger el libro  con especificaciones que me envía frontend a través de body params
    const sqlQuery = "INSERT INTO libros (titulo, nombre, descripcion)  VALUES(?, ?, ?)"; //Añado el libro nuevo con INSERT INTO y pasandole los valores ? que hacen referencia a la linea de arriba título, nombre y descripción
    const [result] = await connection.query(sqlQuery, [  //Ejecuto la query pasandole los nombres con los que se puede rellenar en frontend (Postman)
        título,
        nombre,
        descripción
    ])
    res.status(201).json({ //Respondo a frontend con el estado 201 (indica que la solicitud ha sido un éxito y ha llevado a la creación de un nuevo recurso (libro))
        succes: true,
        id: result.insertId //añado el id que se ha creado automaticamente en Mysql
    });
})

//Actualizar (modificar) los libros a través del tipo put (probar en Postman)
app.put("/api/libro/:id", async (req, res) => { //Se pone el id para que frontend me diga cual es el libro que se quiere manejar
    const connection = await getDBConnection(); //Conectarme a la base de datos
    const { id } = req.params; //Recojo el id del libro que quiere actualizar con url params
    const { título, nombre, descripción } = req.body; //Recojo los nuevos datos del libro a través del body 
    const sqlQuery = "UPDATE libros SET titulo = ?, nombre = ?, descripcion = ? WHERE id = ?;" //Consulto a la base de datos diciendole que las ? se rellenan desde lo que pongan en frontend (postman) pero ya poniendole los nombres reales de asignación que tienen en mySql
    const [result] = await connection.query(sqlQuery, [título, nombre, descripción, id]) //Ejecutar pasandole los nombres inventados de la linea 91
    //console.log(result); Lo utilicé para comprobarlo
    connection.end(); //Cerrar la conexión
    res.status(200).json({
        sucess: true,
        id: result.insertId // Respondo a Frontend 
    });
})

//Dejar a frontend que elimine un libro (probar en postman)
app.delete("/api/libro/:id", async (req, res) => {
    const connection = await getDBConnection(); //conectarme a la DB
    const { id } = req.params; //Recoger el id que me envía frontend a través de url params
    const sqlQuery = "DELETE FROM libros WHERE id = ?"; //Consulta a la base de datos con id dinámico (cogido de frontend)
    const [result] = await connection.query(sqlQuery, [id]); //Ejecuto la query
    connection.end(); //Cierro la conexión
    res.status(200).json({
        status: "sucsess",
        massage: "Removed resource"
    });
})

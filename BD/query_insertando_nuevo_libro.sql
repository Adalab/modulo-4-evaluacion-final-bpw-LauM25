CREATE database biblioteca;

USE biblioteca;

CREATE TABLE libros(
	id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(50),
    nombre VARCHAR(50),
    descripcion LONGTEXT
);

INSERT INTO libros (titulo, nombre, descripcion)
VALUES (
'Walden', 'Henry David Thoreau', 'Walden, escrita por Henry David Thoreau en 1854, es una reflexión filosófica y autobiográfica sobre la vida simple en la naturaleza. El autor relata su experiencia de vivir durante dos años en una cabaña junto al lago Walden, en Massachusetts, como un experimento de autosuficiencia, alejamiento de la sociedad y búsqueda de significado personal.'
);

INSERT INTO libros (titulo, nombre, descripcion)
VALUES (
'Siddharta', 'Hermann Hesse', 'Siddhartha, escrita por Hermann Hesse en 1922, es una novela espiritual que narra el viaje interior de un joven hindú llamado Siddhartha en busca de la iluminación. A través de diversas experiencias —desde la vida ascética hasta los placeres mundanos— el protagonista explora distintas formas de sabiduría hasta alcanzar un entendimiento profundo del yo y la unidad del universo.'
);

INSERT INTO libros (titulo, nombre, descripcion)
VALUES (
'Sin noticias de Gurb', 'Eduardo Mendoza', 'Sin noticias de Gurb, escrita por Eduardo Mendoza en 1991, es una novela humorística que relata la búsqueda de un extraterrestre, Gurb, perdido en Barcelona tras adoptar la forma de Marta Sánchez. Narrada a través del diario de su compañero alienígena, la historia ofrece una sátira divertida de la vida urbana, las costumbres humanas y la sociedad española, todo visto desde la perspectiva ingenua y lógica de un ser de otro planeta.'
);

INSERT INTO libros (titulo, nombre, descripcion)
VALUES (
'El proyecto esposa', 'Graeme Simsion', 'El proyecto esposa, escrita por Graeme Simsion en 2013, es una comedia romántica protagonizada por Don Tillman, un brillante pero socialmente torpe profesor de genética. Decidido a encontrar a la pareja perfecta, Don crea un riguroso cuestionario para seleccionar a la mujer ideal, pero sus planes cambian cuando conoce a Rosie, una mujer impulsiva y completamente opuesta a sus criterios. La novela explora con humor las relaciones humanas, el amor inesperado y la aceptación de las diferencias.'
);

INSERT INTO libros (titulo, nombre, descripcion)
VALUES (
'La señora Potter no es exactamente Santa Claus', 'Laura Fernández', 'La señora Potter no es exactamente Santa Claus, de Laura Fernández, es una novela surrealista y humorística sobre una ciudad ficticia atrapada en la fama de un libro infantil. A través de personajes excéntricos, explora temas como la identidad, la creación artística y el deseo de cambiar el destino impuesto.'
);

INSERT INTO libros (titulo, nombre, descripcion)
VALUES (
'Los asquerosos', 'Santiago Lorenzo', 'Los asquerosos, de Santiago Lorenzo, cuenta la historia de Manuel, quien huye a una aldea abandonada tras un incidente violento. Allí descubre una vida sencilla y autosuficiente, en contraste con la sociedad que rechaza.'
);

SELECT * FROM libros;

SELECT * FROM libros WHERE id = 2;

INSERT INTO libros (titulo, nombre, descripcion)
VALUES("El alquimista", "Paulo Coelho", "El alquimista de Paulo Coelho es una novela sobre Santiago, un joven pastor andaluz que emprende un viaje en busca de un tesoro soñado en las pirámides de Egipto. En el camino, descubre que el verdadero tesoro es seguir su “Leyenda Personal” y escuchar a su corazón.")


const connection = require('./connection');
let objectId = require('mongodb').ObjectId;

const dbName = 'cine_tp2';
const collection = 'peliculas';

async function getPeliculas(){
    const clientmongo = await connection.getConnection();
    //console.log(clientmongo);
    const peliculas = await clientmongo
        .db(dbName)
        .collection(collection)
        .find()
        .toArray();
    return peliculas;
}

async function getPelicula(id) {
    const clientMongo = await connection.getConnection();    
    const pelicula = await clientMongo
        .db(dbName)
        .collection(collection)
        .findOne({_id: new objectId(id)});
    return pelicula;
}

async function addPelicula(pelicula) {
    const clientMongo = await connection.getConnection();    
    const result = await clientMongo
        .db(dbName)
        .collection(collection)
        .insertOne(pelicula);
    return result;
}

async function updatePelicula(pelicula) {
    const clientMongo = await connection.getConnection();    
    const query = {_id: new objectId(pelicula._id)};
    const newValues = { $set: {
            nombre: pelicula.nombre,
            descripcion: pelicula.descripcion,
            genero: pelicula.genero,
            url_imagen: pelicula.url_imagen,
            url_trailer: pelicula.url_trailer,
            duracion: pelicula.duracion,
            calificacion: pelicula.calificacion,
            director: pelicula.director,
            actores: pelicula.actores
        }
    };
    const result = await clientMongo
        .db(dbName)
        .collection(collection)
        .updateOne(query, newValues);
    if (result.result.n != 1) {
        throw new Error('[!] No ha sido posible actualizar la película');
    }
    return result;        
}

async function deletePelicula(id) {
    const clientMongo = await connection.getConnection();    
    const result = await clientMongo
        .db(dbName)
        .collection(collection)
        .deleteOne({_id: new objectId(id)});
    if (result.deletedCount != 1) {
        throw new Error('[!] No ha sido posible eliminar la película');
    }
    return result;
}


module.exports = {getPeliculas, getPelicula, addPelicula, updatePelicula, deletePelicula};
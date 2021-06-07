const connection = require('./connection');
let objectId = require('mongodb').ObjectId;

const dbName = 'cine_tp2';
const collection = 'funciones';

async function getFunciones() {
    const clientMongo = await connection.getConnection();  
    const funciones = await clientMongo
        .db(dbName)
        .collection(collection)
        .find()
        .toArray();
    return funciones;
}

// chequear si funciona
async function getFuncionesPorPelicula(idPelicula) {
    const clientMongo = await connection.getConnection();  
    const funciones = await clientMongo
        .db(dbName)
        .collection(collection)
        .find({_idPelicula:idPelicula})
        .toArray();
    return funciones;
}

// chequear si funciona
async function getFuncionesPorSala(idSala) {
    const clientMongo = await connection.getConnection();  
    const funciones = await clientMongo
        .db(dbName)
        .collection(collection)
        .find({_idSala:idSala})
        .toArray();
    return funciones;
}

async function getFuncion(id) {
    const clientMongo = await connection.getConnection();    
    const funcion = await clientMongo
        .db(dbName)
        .collection(collection)
        .findOne({_id: new objectId(id)});
    return funcion;
}

async function addFuncion(funcion) {
    const clientMongo = await connection.getConnection();    
    const result = await clientMongo
        .db(dbName)
        .collection(collection)
        .insertOne(funcion);
    return result;
}

async function updateFuncion(funcion) {
    const clientMongo = await connection.getConnection();    
    const query = {_id: new objectId(funcion._id)};
    const newValues = { $set: {
            diaHorario: funcion.diaHorario,
            _idPelicula: funcion._idPelicula,
            _idSala: funcion._idSala,
            cantLugaresDisponibles: funcion.cantLugaresDisponibles,
        }
    };
    const result = await clientMongo
        .db(dbName)
        .collection(collection)
        .updateOne(query, newValues);
    return result;        
}

async function deleteFuncion(id) {
    const clientMongo = await connection.getConnection();    
    const result = await clientMongo
        .db(dbName)
        .collection(collection)
        .deleteOne({_id: new objectId(id)});
    return result;
}

module.exports = {getFunciones, getFuncion, addFuncion, updateFuncion, deleteFuncion};
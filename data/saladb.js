const connection = require('./connection');
let objectId = require('mongodb').ObjectId;

const dbName = 'cine_tp2';
const collection = 'salas';

async function getSalas() {
    const clientMongo = await connection.getConnection();  
    const salas = await clientMongo
        .db(dbName)
        .collection(collection)
        .find()
        .toArray();
    return salas;
}

async function getSala(id) {
    const clientMongo = await connection.getConnection();    
    const sala = await clientMongo
        .db(dbName)
        .collection(collection)
        .findOne({_id: new objectId(id)});
    return sala;
}

async function addSala(sala) {
    const clientMongo = await connection.getConnection();    
    const result = await clientMongo
        .db(dbName)
        .collection(collection)
        .insertOne(sala);
    return result;
}

async function updateSala(sala) {
    const clientMongo = await connection.getConnection();    
    const query = {_id: new objectId(sala._id)};
    const newValues = { $set: {
            descripcion: sala.descripcion,
            cantLugares: sala.cantLugares
        }
    };
    const result = await clientMongo
        .db(dbName)
        .collection(collection)
        .updateOne(query, newValues);
    return result;        
}

async function deleteSala(id) {
    const clientMongo = await connection.getConnection();    
    const result = await clientMongo
        .db(dbName)
        .collection(collection)
        .deleteOne({_id: new objectId(id)});
    return result;
}

module.exports = {getSalas, getSala, addSala, updateSala, deleteSala};
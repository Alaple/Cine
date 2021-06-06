const connection = require('./connection');
let objectId = require('mongodb').ObjectId;

const dbName = 'cine_tp2';
const collection = 'reservas';

async function getReservas() {
    const clientMongo = await connection.getConnection();  
    const reservas = await clientMongo
        .db(dbName)
        .collection(collection)
        .find()
        .toArray();
    return reservas;
}

async function getReserva(id) {
    const clientMongo = await connection.getConnection();    
    const reserva = await clientMongo
        .db(dbName)
        .collection(collection)
        .findOne({_id: new objectId(id)});
    return reserva;
}

async function addReserva(reserva) {
    const clientMongo = await connection.getConnection();    
    const result = await clientMongo
        .db(dbName)
        .collection(collection)
        .insertOne(reserva);
    return result;
}

async function updateReserva(reserva) {
    const clientMongo = await connection.getConnection();    
    const query = {_id: new objectId(reserva._id)};
    const newValues = { $set: {
            _idFuncion: reserva._idFuncion,
            _idUsuario: reserva._idUsuario,
            cantidadEntradas: reserva.cantidadEntradas,
            nroReserva: reserva.nroReserva,
            valorTotal: reserva.valorTotal,
            medioPago: reserva.medioPago
        }
    };
    const result = await clientMongo
        .db(dbName)
        .collection(collection)
        .updateOne(query, newValues);
    return result;        
}

async function deleteReserva(id) {
    const clientMongo = await connection.getConnection();    
    const result = await clientMongo
        .db(dbName)
        .collection(collection)
        .deleteOne({_id: new objectId(id)});
    return result;
}

module.exports = {getReservas, getReserva, addReserva, updateReserva, deleteReserva};
const connection = require('./connection');
//let objectId = require('mongodb').ObjectId;

async function getPeliculas(){
    const clientmongo = await connection.getConnection();
    console.log(clientmongo);
    const peliculas = await clientmongo.db('cine_tp2')
        .collection('peliculas')
        .find()
        .toArray();
    return peliculas;
}

module.exports = {getPeliculas};

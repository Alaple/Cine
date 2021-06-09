const mongodb = require('mongodb');
const connection = require('./connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const dbName = 'cine_tp2';
const collection = 'usuarios';

async function getAllUsers(){
    const connectiondb = await connection.getConnection();
    const users = await connectiondb
        .db(dbName)
        .collection(collection)
        .find()
        .toArray();
    console.log(users);
    return users;
}

async function addUser(user){
    const connectiondb = await connection.getConnection();

    user.clave = await bcrypt.hash(user.clave, 8);

    const result = await connectiondb.db(dbName)
        .collection(collection)
        .insertOne(user);
    return result;
}

async function getUser(id){
    const connectiondb = await connection.getConnection();
    const user = await connectiondb.db(dbName)
                        .collection(collection)
                        .findOne({_id: mongodb.ObjectId(id)});
    return user;
}

async function findByCredentials(email, clave) {
    const connectiondb = await connection.getConnection();
    const user = await connectiondb.db(dbName)
                        .collection(collection)
                        .findOne({email: email});

    if(!user){
        throw new Error('Credenciales no válidas');
    }

    const isMatch = await bcrypt.compare(clave, user.clave);
    if(!isMatch){
        throw new Error('Credenciales no válidas');
    }
    
    return user;
}

function generateAuthToken(user) {
    const token = jwt.sign({_id:user._id}, process.env.SECRET, {expiresIn: '2h'});
    return token;
}

module.exports = {addUser, getUser, findByCredentials, generateAuthToken, getAllUsers};
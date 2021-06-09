const mongodb = require('mongodb');
const connection = require('./connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const dbName = 'cine_tp2';
const collection = 'salas';

async function getAllUsers(){
    const connectiondb = await connection.getConnection();
    const users = await connectiondb.db(dbName)
                        .collection(collection)
                        .find()
                        .toArray();
    return users;
}

async function addUser(user){
    const connectiondb = await connection.getConnection();

    // los nombres de base de datos pueden cambiar   
    user.password = await bcrypt.hash(user.password, 8);

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

async function findByCredentials(email, password){
    const connectiondb = await connection.getConnection();
    const user = await connectiondb.db(dbName)
                        .collection(collection)
                        .findOne({email: email});

    if(!user){
        throw new Error('Credenciales no validas');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Credenciales no validas');
    }
    
    return user;
}

function generateAuthToken(user){
    const token = jwt.sign({_id:user._id}, process.env.SECRET, {expiresIn: '2h'});
    return token;
}

module.exports = {addUser, getUser, findByCredentials, generateAuthToken, getAllUsers};
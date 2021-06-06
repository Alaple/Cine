const express = require('express');
const router = express.Router();
const dataPelicula = require('../data/peliculadb');
const joi = require('joi');

// /api/peliculas/
router.get('/', async function(req, res, next) {
    let peliculas = await dataPelicula.getPeliculas();    
    res.json(peliculas);
});

module.exports = router;
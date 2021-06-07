const express = require('express');
const router = express.Router();
const dataPelicula = require('../data/peliculadb');
const joi = require('joi');

// /api/peliculas/

/* GET Películas */
router.get('/', async function(req, res, next) {
    let peliculas = await dataPelicula.getPeliculas();    
    res.json(peliculas);
});

/* GET película por id */
router.get('/:id', async (req, res) => {
    const pelicula = await dataPelicula.getPelicula(req.params.id);
    if (pelicula) {
        res.json(pelicula);
    } else {
        res.status(404).send('[!] Película no encontrada');
    }
});

/* POST película */
router.post('/', async (req, res) => {
    const schema = joi.object({
        nombre: joi.string().required(),
        descripcion: joi.string().required(),
        genero: joi.array().items(joi.string()).required(),
        url_imagen: joi.string().required(),
        url_trailer: joi.string().required(),
        duracion: joi.number().integer().min(1).required(),
        calificacion: joi.string().required(),
        director: joi.string().required(),
        actores: joi.array().items(joi.string()).required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
        let pelicula = req.body;
        pelicula = await dataPelicula.addPelicula(pelicula);
        res.json(pelicula);
    }
});

/* PUT película por id */
router.put('/:id', async (req, res) => {
    const schema = joi.object({
        nombre: joi.string().required(),
        descripcion: joi.string().required(),
        genero: joi.array().items(joi.string()).required(),
        url_imagen: joi.string().required(),
        url_trailer: joi.string().required(),
        duracion: joi.number().integer().min(1).required(),
        calificacion: joi.string().required(),
        director: joi.string().required(),
        actores: joi.array().items(joi.string()).required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
    } else {
        let pelicula = req.body;
        pelicula._id = req.params.id;
        pelicula = await dataPelicula.updatePelicula(pelicula);
        res.json(pelicula);
    }
});

/* DELETE pelicula por id */
router.delete('/:id', async (req, res) => {
    const pelicula = await dataPelicula.getPelicula(req.params.id)
    if (pelicula){
        dataPelicula.deletePelicula(req.params.id);
        res.status(200).send('[!] Película eliminada');
    } else {
        res.status(404).send('[!] Película no encontrada');
    }
});


module.exports = router;
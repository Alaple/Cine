const express = require('express');
const router = express.Router();
const dataFunciones = require('../data/funciondb');
const joi = require('joi');


function getValidacionFuncion() {
    return {
        diaHorario: joi.date().required(),
        _idPelicula: joi.string().alphanum().required(),
        _idSala: joi.string().alphanum().required(),
        // max debería ser el cant de entradas totales, cómo se haría? Se saca de entradas de la sala?
        cantLugaresDisponibles: joi.number().max(100).required()
    }
} 

/* GET funciones */
router.get('/', async function(req, res, next) {
  let funciones = await dataFunciones.getFunciones();
  res.json(funciones);
});

/* GET función por id */
router.get('/:id', async (req, res) => {
    const funcion = await dataFunciones.getFuncion(req.params.id);
    if (funcion) {
        res.json(funcion);
    } else {
        res.status(404).send('función no encontrada');
    }
});

/* POST función */
router.post('/', async (req, res) => {
    const schema = joi.object(getValidacionFuncion());
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
        let funcion = req.body;
        funcion = await dataFunciones.addFuncion(funcion);
        res.json(funcion);
    }
});

/* PUT funcion por id */
router.put('/:id', async (req, res) => {
    const schema = joi.object(getValidacionFuncion());
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
    } else {
        let funcion = req.body;
        funcion._id = req.params.id;
        datafunciones.udpateFuncion(funcion);
        res.json(funcion);
    }
});

/* DELETE funcion por id */
router.delete('/:id', async (req, res) => {
    const funcion = await dataFunciones.getFuncion(req.params.id)
    if (funcion){
        dataFunciones.deleteFuncion(req.params.id);
        res.status(200).send('función eliminada');
    } else {
        res.status(404).send('función no encontrada');
    }
});


module.exports = router;

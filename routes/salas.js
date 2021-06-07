const express = require('express');
const router = express.Router();
const dataSalas = require('../data/saladb');
const joi = require('joi');

/* GET salas */
router.get('/', async function(req, res, next) {
  let salas = await dataSalas.getSalas();
  res.json(salas);
});

/* GET sala por id */
router.get('/:id', async (req, res) => {
    const sala = await dataSalas.getSala(req.params.id);
    if (sala) {
        res.json(sala);
    } else {
        res.status(404).send('Sala no encontrada');
    }
});

/* POST sala */
router.post('/', async (req, res) => {
    const schema = joi.object({
        descripcion: joi.string().required(),
        cantLugares: joi.number().integer().min(1).required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
        let sala = req.body;
        sala = await dataSalas.addSala(sala);
        res.json(sala);
    }
});

/* PUT sala por id */
router.put('/:id', async (req, res) => {
    const schema = joi.object({
        descripcion: joi.string().required(),
        cantLugares: joi.number().integer().min(1).required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
    } else {
        let sala = req.body;
        sala._id = req.params.id;
        dataSalas.updateSala(sala);
        res.json(sala);
    }
});

/* DELETE sala por id */
router.delete('/:id', async (req, res) => {
    const sala = await dataSalas.getSala(req.params.id)
    if (sala){
        dataSalas.deleteSala(req.params.id);
        res.status(200).send('Sala eliminado');
    } else {
        res.status(404).send('Sala no encontrado');
    }
});


module.exports = router;

const express = require('express');
const router = express.Router();
const dataReservas = require('../data/reservadb');
const joi = require('joi');

/* GET reserva por id Usuario */

function getValidacionReserva() {
    return {
        _idFuncion: joi.string().alphanum().required(),
        _idUsuario: joi.string().alphanum().required(),
        // max deberia ser cantidad disponible en la sala
        cantidadEntradas: joi.number().max(2020).required(),
        // nroReserva deberia ser auto incremental?
        nroReserva: joi.number().required(),
        valorTotal: joi.number().required(),
        medioPago: joi.string().required()
    }
} 


/* GET reservas */
router.get('/', async function(req, res, next) {
  let reservas = await dataReservas.getReservas();
  res.json(reservas);
});

/* GET reserva por id */
router.get('/:id', async (req, res) => {
    const reserva = await dataReservas.getReserva(req.params.id);
    if (reserva) {
        res.json(reserva);
    } else {
        res.status(404).send('Reserva no encontrada');
    }
});

/* POST reserva */
router.post('/', async (req, res) => {
    const schema = joi.object(getValidacionReserva());
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
        let reserva = req.body;
        reserva = await dataReservas.addReserva(reserva);
        res.json(reserva);
    }
});

/* PUT reserva por id */
router.put('/:id', async (req, res) => {
    const schema = joi.object(getValidacionReserva());
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
    } else {
        let reserva = req.body;
        reserva._id = req.params.id;
        dataReservas.updateReserva(reserva);
        res.json(reserva);
    }
});

/* DELETE reserva por id */
router.delete('/:id', async (req, res) => {
    const reserva = await dataReservas.getReserva(req.params.id)
    if (reserva){
        dataReservas.deleteReserva(req.params.id);
        res.status(200).send('Reserva eliminado');
    } else {
        res.status(404).send('Reserva no encontrado');
    }
});


module.exports = router;

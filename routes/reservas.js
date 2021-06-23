const express = require('express');
const router = express.Router();
const dataReservas = require('../data/reservadb');
const dataFunciones = require('../data/funciondb');
const joi = require('joi');

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

/* GET reserva por id Usuario */
router.get('/usuario/:id', async (req, res) => {
    const reserva = await dataReservas.getReservasPorUsuario(req.params.id);
    if (reserva) {
        res.json(reserva);
    } else {
        res.status(404).send('Reserva no encontrada');
    }
});

/* GET reserva por NroReserva */
router.get('/reserva/:nroReserva', async (req, res) => {
    const reserva = await dataReservas.getReservaPorNro(req.params.nroReserva);
    if (reserva) {
        res.json(reserva);
    } else {
        res.status(404).send('Reserva no encontrada');
    }
});

/* POST reserva */
router.post('/', async (req, res) => {
    const funcionReserva = await dataFunciones.getFuncion(req.body._idFuncion);
    const schema = joi.object({
        _idFuncion: joi.string().alphanum().required(),
        _idUsuario: joi.string().alphanum().required(),
        cantidadEntradas: joi
            .number()
            .integer()
            .min(1)
            .max(funcionReserva.cantLugaresDisponibles)
            .required(),
        // No se valida NroReserva dado que es auto incremental
        valorTotal: joi.number().required(),
        medioPago: joi.string().required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
        let reserva = req.body;
        reserva.nroReserva = await dataReservas.getNewNroReserva();
        reserva = await dataReservas.addReserva(reserva);
        // TODO Actualizar la cant disponibles de la funcion restando las reservadas.
        res.json(reserva);
    }
});

/* PUT reserva por id */
router.put('/:id', async (req, res) => {
    const funcionReserva = await dataFunciones.getFuncion(req.body._idFuncion);
    const reservaOriginal = await dataReservas.getReserva(req.params.id);
    const maxLugaresDisponibles = funcionReserva.cantLugaresDisponibles + reservaOriginal.cantidadEntradas;
    const schema = joi.object({
        _idFuncion: joi.string().alphanum().required(),
        _idUsuario: joi.string().alphanum().required(),
        // max es la cantidad disponible en la sala + lugares de la reserva original
        cantidadEntradas: joi
            .number()
            .integer()
            .min(1)
            .max(maxLugaresDisponibles)
            .required(),
        // Nro de reserva no se puede actualizar. Es auto incremental
        nroReserva: joi.valid(reservaOriginal.nroReserva).required(),
        valorTotal: joi.number().required(),
        medioPago: joi.string().required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
    } else {
        let reserva = req.body;
        reserva._id = req.params.id;
        await dataReservas.updateReserva(reserva);
    // TODO Actualizar la cant disponibles de la funcion restando las reservadas.
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

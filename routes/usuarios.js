var express = require('express');
var router = express.Router();
const dataUsuario = require('../data/usuariodb');
const auth = require('../middleware/auth');

/* GET usuarios */
// api/usuarios/
router.get('/', auth, async function(req, res, next) {
  const users = await dataUsuario.getAllUsers();
  res.send(users);
});

router.post('/', async (req, res) =>{
  const result = await dataUsuario.addUser(req.body);
  res.send(result);
});

router.post('/login', async (req, res)=>{
  try {
    const user = await dataUsuario.findByCredentials(req.body.email, req.body.clave);
    const token = dataUsuario.generateAuthToken(user);
    res.send({user, token});
  } catch (error) {
      res.status(401).send(error.message);
  }
});

module.exports = router;
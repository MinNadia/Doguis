const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const temperaments = require("./temperaments.js");
const dogs = require ("./dogs.js");

const router = Router();

router.use('/temperaments', temperaments);
router.use('/dogs', dogs);


module.exports = router;

const { Router } = require('express');
const pokemonRoute = require('./pokemonRoutes');
const typeRoute = require('./typeRoutes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemon', pokemonRoute);
router.use('/type', typeRoute);


module.exports = router;

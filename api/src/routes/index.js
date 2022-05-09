const { Router } = require('express');
//const { Activity,Country, Op} = require('../db');
const country = require('./Country');
const activity = require('./Activity');
const router = Router();


router.use("/countries", country ) 
router.use("/activity",  activity)

module.exports = router;



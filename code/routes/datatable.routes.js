const express = require('express');
const router = express.Router();
const baza = require('../models/baza')



router.get('/',async function(req,res,next) {

    

    res.render('datatable');
});



module.exports = router;
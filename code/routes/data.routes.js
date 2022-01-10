const express = require('express');
const router = express.Router();
const baza = require('../models/baza');
const url = require('url');




router.get('/',async function(req,res,next) {
    var filter;
    var filtertype;
    if(req.get('Referer').length >= 25){
        var queryObject = url.parse(req.get('Referer'),true).query;
         filter = queryObject.filter;
         filtertype = queryObject.filtertype;
    } else {
        filter = undefined;
        filtertype = undefined;
    }
    let clubs = await baza.getData(filter,filtertype);

    res.json(clubs);
});



module.exports = router;
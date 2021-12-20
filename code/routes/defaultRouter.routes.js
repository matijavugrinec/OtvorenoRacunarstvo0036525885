const express = require('express');
const router = express.Router();


router.get('/',function(req,res,next) {

    let info = { "status" : "not implemented",
                 "message" : "Method not implemented for requested resource",
                 "response" : null    
                }

    res.status(501)
    res.send(info);
});

module.exports = router;
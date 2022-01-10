const express = require('express');
const router = express.Router();


router.get('/',function(req,res,next) {
    
    let auth = 0;
    if(req.oidc.isAuthenticated()){
        console.log(auth);
        auth = 1;
    }

    res.render('index', {
                Auth : auth
    });
});

module.exports = router;
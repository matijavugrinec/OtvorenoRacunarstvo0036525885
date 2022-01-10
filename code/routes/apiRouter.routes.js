const { urlencoded } = require('express');
const express = require('express');
const router = express.Router();
const baza = require('../models/baza');
const db = require('../db');
const bodyParser = require('body-parser')



router.get('/',async function(req,res,next) {
    let clubs = await baza.getData(undefined,undefined);

    let info = { "status" : "ok",
                 "message" : "Fetched all clubs in database",
                 "response" : clubs    
                }
    

    res.status(200)
    res.contentType('json')
    res.send(info)

    
});

router.get('/:id',async function(req,res,next) {

    let id = req.params.id;
    
    let club = await baza.getData(id,"naziv_kluba");

    
    let info;

    if(club == undefined) {
         info = { "status" : "not found",
                 "message" : "Coudnt find club with that name",
                 "response" : null    
                }

        res.status(404)
        
    } else {

     info = { "status" : "ok",
                 "message" : "Fetched club with id : " + id +"in database",
                 "response" : club  
                }

        res.status(200)
    }

    res.send(info);

});

router.get('/pozicija2021/:mjesto_na_tablici',async function(req,res,next) {

    let mjesto_na_tablici = req.params.mjesto_na_tablici;
    
    let club = await baza.getData(mjesto_na_tablici,"pozicija2021");

    
    let info;

    if(club == undefined) {
         info = { "status" : "not found",
                 "message" : "Coudnt find club at that position",
                 "response" : null    
                }

        res.status(404)
        
    } else {

     info = { "status" : "ok",
                 "message" : "Fetched club that was at postition : " + mjesto_na_tablici + " in season 20/21",
                 "response" : club  
                }

        res.status(200)
    }

    res.send(info);

});

router.get('/sjediste/:mjesto',async function(req,res,next) {

    let mjesto = req.params.mjesto;
    
    let club = await baza.getData(mjesto,"mjesto_sjedista");

    
    let info;

    if(club == undefined) {
         info = { "status" : "not found",
                 "message" : "Coudnt find club from that city",
                 "response" : null    
                }

        res.status(404)
        
    } else {

     info = { "status" : "ok",
                 "message" : "Fetched club that is from : " + mjesto,
                 "response" : club  
                }

        res.status(200)
    }

    res.send(info);

});

router.get('/godina_osnutka/:godina',async function(req,res,next) {

    let godina = req.params.godina;
    
    let club = await baza.getData(godina,"godina_osnutka");

    
    let info;

    if(club == undefined) {
         info = { "status" : "not found",
                 "message" : "Coudnt find a club that is established that year",
                 "response" : null    
                }

        res.status(404)
        
    } else {

     info = { "status" : "ok",
                 "message" : "Fetched clubs that are est. : " + godina,
                 "response" : club  
                }

        res.status(200)
    }

    res.send(info);

});

router.delete('/:id',async function(req,res,next) {

    let id = req.params.id;
    
    let club = await baza.getData(id,"naziv_kluba");


    
    let info;

    if(club == undefined) {
         info = { "status" : "not found",
                 "message" : "Coudnt find club with that name",
                 "response" : null    
                }

        res.status(404)
        
    } else {

    await db.query("DELETE FROM igraci WHERE naziv_kluba = '" + id +"'")
    await db.query("DELETE FROM pomocni_treneri WHERE naziv_kluba = '" + id +"'")
    await db.query("Delete from osnovni_podaci where naziv_kluba = '" + id + "'");
    


     info = { "status" : "ok",
              "message" : "Deleted the club with id : " + id +"in database"   
            }

        res.status(200)
    }

    res.send(info);

});

router.post('/:id',async function(req,res,next) {

    let id = req.params.id;
    
    let club = await baza.getData(id,"naziv_kluba");

    let body = req.body;
    


    let info;

    if(club != undefined || Object.keys(body).length === 0 ) {
         info = { "status" : "not acceptable",
                 "message" : "Club already exists with that id",
                 "response" : club    
                }

        res.status(406)
        
    } else {

        try {

        let naziv_kluba = req.body.naziv_kluba;
        if(naziv_kluba == undefined)
            throw new Error
        let ime_dvorane = req.body.ime_dvorane
        if(ime_dvorane == undefined)
            throw new Error
        let mjesto_sjedista = req.body.mjesto_sjedista;
        if(mjesto_sjedista == undefined)
            throw new Error
        let glavni_trener = req.body.glavni_trener;
        if(glavni_trener == undefined)
            throw new Error
        let godina_osnutka = req.body.godina_osnutka;
        if(godina_osnutka == undefined)
            throw new Error
        let pozicija2021 = req.body.pozicija2021;
        if(pozicija2021 == undefined)
            throw new Error
        let naziv_lige = req.body.naziv_lige;
        if(naziv_lige == undefined)
            throw new Error
        let kapacitet_dvorane = req.body.kapacitet_dvorane;
        if(kapacitet_dvorane == undefined)
            throw new Error
        let punoime_pomocnika = req.body.punoime_pomocnika;
        if(punoime_pomocnika == undefined)
            throw new Error
        let igraci = req.body.ime_igraca;
        if(igraci == undefined)
            throw new Error
        
        if(await (await db.query("SELECT FROM dvorane where ime_dvorane = '"+ ime_dvorane +"'")).rowCount == 0)
           await db.query("insert into dvorane (ime_dvorane,kapacitet_dvorane) values ('" + ime_dvorane + "','" + kapacitet_dvorane + "')");

        
       await db.query("insert into osnovni_podaci (naziv_kluba,mjesto_sjedista,glavni_trener,godina_osnutka,pozicija2021,ime_dvorane,naziv_lige) values('"+naziv_kluba+"','"+mjesto_sjedista+"','"+glavni_trener+"','"+godina_osnutka+"','"+pozicija2021+"','"+ime_dvorane+"','"+naziv_lige+"')");

        await db.query("insert into pomocni_treneri (punoime_pomocnika,naziv_kluba) values('"+punoime_pomocnika+"','"+naziv_kluba+"')")

        for(let i=0;i < igraci.length;i++)
            db.query("insert into igraci (punoime_igraca,naziv_kluba) values ('"+ igraci[i] + "','" + naziv_kluba + "')")
        


     info = { "status" : "ok",
              "message" : "Added the club with name(id) : " + id +"in database",   
              "response" : null
            }

        res.status(200)

        } catch(e) {

            info = { "status" : "not acceptable",
                 "message" : "Bad json given",
                 "response" : null    
                }

             res.status(406)
        }

    }

    res.send(info);

});

router.put('/:id',async function(req,res,next) {

    let id = req.params.id;
    
    let club = await baza.getData(id,"naziv_kluba");

    let body = req.body;
    


    let info;

    if(club == undefined || Object.keys(body).length === 0 ) {
         info = { "status" : "not found",
                 "message" : "Club doesnt exist with that id",
                 "response" : club    
                }

        res.status(404)
        
    } else {

        try {

     await db.query("DELETE FROM igraci WHERE naziv_kluba = '" + id +"'")
      await  db.query("DELETE FROM pomocni_treneri WHERE naziv_kluba = '" + id +"'")

   
     await   db.query("DELETE FROM osnovni_podaci WHERE naziv_kluba = '" + id +"'")


        let naziv_kluba = req.body.naziv_kluba;
        if(naziv_kluba == undefined)
            throw new Error

        let ime_dvorane = req.body.ime_dvorane
        if(ime_dvorane == undefined)
            throw new Error
        let mjesto_sjedista = req.body.mjesto_sjedista;
        if(mjesto_sjedista == undefined)
            throw new Error

        let glavni_trener = req.body.glavni_trener;
        if(glavni_trener == undefined)
            throw new Error

        let godina_osnutka = req.body.godina_osnutka;
        if(godina_osnutka == undefined)
            throw new Error

        let pozicija2021 = req.body.pozicija2021;
        if(pozicija2021 == undefined)
            throw new Error

        let naziv_lige = req.body.naziv_lige;
        if(naziv_lige == undefined)
            throw new Error

        let kapacitet_dvorane = req.body.kapacitet_dvorane;
        if(kapacitet_dvorane == undefined)
            throw new Error
            
        let punoime_pomocnika = req.body.punoime_pomocnika;
        if(punoime_pomocnika == undefined)
            throw new Error
        let igraci = req.body.ime_igraca;
        if(igraci == undefined)
                    throw new Error
        
        if(await (await db.query("SELECT FROM dvorane where ime_dvorane = '"+ ime_dvorane +"'")).rowCount == 0)
           await db.query("insert into dvorane (ime_dvorane,kapacitet_dvorane) values ('" + ime_dvorane + "','" + kapacitet_dvorane + "')");

        
       await db.query("insert into osnovni_podaci (naziv_kluba,mjesto_sjedista,glavni_trener,godina_osnutka,pozicija2021,ime_dvorane,naziv_lige) values('"+naziv_kluba+"','"+mjesto_sjedista+"','"+glavni_trener+"','"+godina_osnutka+"','"+pozicija2021+"','"+ime_dvorane+"','"+naziv_lige+"')");

       await  db.query("insert into pomocni_treneri (punoime_pomocnika,naziv_kluba) values('"+punoime_pomocnika+"','"+naziv_kluba+"')")

        for(let i=0;i < igraci.length;i++)
          await  db.query("insert into igraci (punoime_igraca,naziv_kluba) values ('"+ igraci[i] + "','" + naziv_kluba + "')")
        


     info = { "status" : "ok",
              "message" : "Changed the club with name(id) : " + id +"in database",   
              "response" : null
            }

        res.status(200)

        } catch(e) {

            info = { "status" : "not acceptable",
                 "message" : "Bad json given",
                 "response" : null    
                }

             res.status(406)
        }

    }

    res.send(info);

});

module.exports = router;
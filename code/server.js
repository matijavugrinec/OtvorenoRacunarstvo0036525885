//uvoz modula
const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg')
const db = require('./db')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)




//uvoz modula s definiranom funkcionalnosti ruta
const indexRouter = require('./routes/index.routes');
const datatableRouter = require('./routes/datatable.routes');
const dataRouter = require('./routes/data.routes');






//middleware - predlošci (ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));


//middleware - dekodiranje parametara
app.use(express.urlencoded({ extended: true }));



//pohrana sjednica u postgres bazu korštenjem connect-pg-simple modula
/*
app.use(
    session({
        secret: 'FER WiM',
        resave: true,
        saveUninitialized: true,
        store: new pgSession({
          pool: db.pool
        })
      })
)*/



//definicija ruta
app.use('/', indexRouter);
app.use('/datatable', datatableRouter);
app.use('/data',dataRouter);


//pokretanje poslužitelja na portu 80
app.listen('80','192.168.1.180', () => {
  console.info(`server started on port 80)`);
});
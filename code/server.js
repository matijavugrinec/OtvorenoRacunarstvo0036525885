//uvoz modula
const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg')
const db = require('./db')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const bodyParser = require('body-parser')





//uvoz modula s definiranom funkcionalnosti ruta
const indexRouter = require('./routes/index.routes');
const datatableRouter = require('./routes/datatable.routes');
const dataRouter = require('./routes/data.routes');
const apiRouter = require('./routes/apiRouter.routes')
const defaultRouter = require('./routes/defaultRouter.routes')




//middleware - predlošci (ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));


//middleware - dekodiranje parametara
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


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
app.use('/v1/klubovi',apiRouter)

app.use('*',defaultRouter);


//pokretanje poslužitelja na portu 80
app.listen('80','localhost', () => {
  console.info(`server started on port 80)`);
});
//uvoz modula
const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg')
const db = require('./db')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const bodyParser = require('body-parser')
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const baza = require('./models/baza');




const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'd6fd2f2d94892f2d71553fe63a4e9204423052d6f8d851f4f2c2c41538afc05a',
  baseURL: 'http://localhost:3000',
  clientID: 'sLYL19LqYtPqSvewsYor9GnUyheZ8jZe',
  issuerBaseURL: 'https://matija.eu.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
//app.get('/', (req, res,next) => {
  //if(req.oidc.isAuthenticated()) {
    //  next()
  //} else {
  //res.send( 'Logged out');
  //}
//});

app.get('/profile', requiresAuth(), (req, res) => {
  res.render('profile', {
    userData :JSON.stringify(req.oidc.user),
  });
});


app.get('/refresh',async (req,res) => {
    let clubs = await baza.getData(undefined,undefined);
    
    console.log(clubsJson);
});


//uvoz modula s definiranom funkcionalnosti ruta
const indexRouter = require('./routes/index.routes');
const datatableRouter = require('./routes/datatable.routes');
const dataRouter = require('./routes/data.routes');
const apiRouter = require('./routes/apiRouter.routes')
const defaultRouter = require('./routes/defaultRouter.routes');




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
app.listen('3000','localhost', () => {
  console.info(`server started on port 80)`);
});
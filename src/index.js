const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const  path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys');
const passport= require('passport');

//Initializations
const app = express();
require('./lib/passport');

//Setting



app.use(express.static('public'))

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'), 
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')

}))
app.set('view engine', '.hbs');

//Middlewartes
app.use(session({
secret: 'fastmysqlnodesession',
resave: false,
saveUninitialized: false,
store: new MySQLStore(database)
}));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Global variables
app.use((req, res, next)=> {
  app.locals.success = req.flash('success');  //hace disponible el mensaje en todas las vistas
  app.locals.message = req.flash('message');  //hace disponible el mensaje en todas las vistas
  app.locals.user = req.user; //almacena en una variable el user
    next();
});



//Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links' ,require('./routes/links'));


//Public

//Starting the Server
app.listen(app.get('port'),() =>{
console.log('Server on port', app.get('port'));
});

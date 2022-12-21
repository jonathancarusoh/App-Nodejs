const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const  path = require('path');


//Initializations
const app = express();

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
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Global variables
app.use((req, res, next)=> {
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

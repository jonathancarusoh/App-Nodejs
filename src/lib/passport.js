const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
usernameField: 'username',
passwordField: 'password',
passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body);
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]); //consultar a usuarion que coincidan con "username"
    if (rows.length > 0) { //si son mayor a 0 enocntro unusuario
        const user = rows[0]; // es para optener ese usuario
        const validPassword = await helpers.matchPassword(password, user.password); //validad contraseñas, compara contraseñas, devuelve true o false
        if(validPassword) {
            done(null, user, req.flash('success','welcome' + user.username)); //si la contraseña fue correcta, termino con el proceso de sign in
        } else {
            done(null, false, req.flash('message' ,'Incorrect Password')); // si la password es incorrecta
        }
      
    }
    else {
        return done(null, false, req.flash('message' ,'The Username does not exists')); //en caso de que no encontro un usuario
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname } = req.body;
    const newUser = {
    username,
    password,
    fullname
    };
    newUser.password = await helpers.encryptPassword(password); //toma una contraseña y la sifra
const result = await pool.query('INSERT INTO users SET ?', [newUser]);

newUser.id = result.insertId;
return done(null, newUser); 

}));

passport.serializeUser((user, done)=> {
        done(null, user.id)
 });

 passport.deserializeUser(async (id, done) => {
const rows = await pool.query('SELECT * FROM users where id = ?',[id]); //busca si el id ya existe
done(null, rows[0])
 })
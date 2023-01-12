const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn, isNoLoggedIn } = require('../lib/auth');

router.get('/add',isLoggedIn,(req, res) =>{
   res.render('links/add');
});


router.get('/body',(req, res) =>{
   res.render('links/body');
});



router.post('/add',isLoggedIn, async (req,res) =>{
  const { title, url, description }  = req.body;
  const newLink = { 
   title,
   url,
   description,
   user_id: req.user.id //enlasa la tarea con el id del usuarip
  };
  await pool.query('INSERT INTO links set ?', [newLink]);
  req.flash('success', 'link save successfully');//muentra un mensaje de Success save
 res.redirect('/links'); //redirecciona a la paguina principal
}); 

//
router.get('/',isLoggedIn, async (req, res) => {
const links = await pool.query('SELECT * FROM links WHERE user_id = ?',[req.user.id]); //selecciona todos los elnaces - enlases del id correspondiente 

res.render('links/list', { links });
});

//el AWAIT lo que hace es no seguir con el codigo hasta que cargue
//borra las url
router.get('/delete/:id',isLoggedIn, async(req,res) => {
   const { id } = req.params;
   await pool.query('DELETE FROM links WHERE ID = ?', [id] ); //elimina el id que le estamos preguntando
   req.flash('success', 'Links Removed successfully');
   res.redirect('/links'); //redirecciona a la ventana links
});

//Edita las Url
router.get('/edit/:id',isLoggedIn, async(req, res)=>{
   const { id } = req.params;
   const links = await pool.query ('SELECT *FROM links WhERE id = ?',[id]);
   res.render('links/edit', {link: links[0]});
  

});

//ruta de links editados
router.post('/edit/:id', isLoggedIn, async(req, res)=>{
const { id } = req.params;
const {title, description, url} = req.body;
const newLink = {
   title,
   description,
   url
}
await pool.query ('UPDATE links set ? WHERE id = ?', [newLink, id]);
req.flash('success', 'Link Updated successfully');
res.redirect('/links');
});

module.exports = router; 
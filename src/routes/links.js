const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add',(req, res) =>{
   res.render('links/add');
});


router.post('/add', async (req,res) =>{
  const { title, url, description }  = req.body;
  const newLink = { 
   title,
   url,
   description
  };
  await pool.query('insert into LINKS set ?', [newLink]);
 res.redirect('/links'); //redirecciona a la paguina principal
}); 

//
router.get('/', async (req, res) => {
const links = await pool.query('SELECT * FROM links');
console.log(links);
res.render('links/list', { links });
});

//el AWAIT lo que hace es no seguir con el codigo hasta que cargue
//borra las url
router.get('/delete/:id',async(req,res) => {
   const { id } = req.params;
   await pool.query('DELETE FROM links WHERE ID = ?', [id] ); //elimina el id que le estamos preguntando
   res.redirect('/links'); //redirecciona a la ventana links
});

//Edita las Url
router.get('/edit/:id',async(req, res)=>{
   const { id } = req.params;
   res.render('links/edit')
  

});

module.exports = router; 
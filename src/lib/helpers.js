const bcrypt = require('bcryptjs')
const  herlpers = {};

//encripta la contraseña para registro
herlpers.encryptPassword = async (password) => { //resive la contraseña
        const salt = await bcrypt.genSalt(10); //genera unpatron
        const hash = await bcrypt.hash(password, salt); //sifra la contraseña
        return hash; //retorna el sifrado de la contraseña
};
 

//encripta la contraseña para registro
herlpers.matchPassword = async (password, savePassword) =>{    
   try {
    return await bcrypt.compare(password, savePassword); //compara dos string, la contraseña que ingresa el y con la contraseña guardada
 } catch(e) {
    console.log(e);
 }
};

module.exports = herlpers;
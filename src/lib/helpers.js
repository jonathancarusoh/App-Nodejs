const bcrypt = require('bcryptjs')
const  herlpers = {};

herlpers.encryptPassword = async (password) => { //encripta la contraseña para registro
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
};

herlpers.matchPassword = async (password, savePassword) =>{    //encripta la contraseña para el logeo 
   try {
    await bcrypto.compare(password, savePassword);
 } catch(e) {
    console.log(e);
 }
};

module.exports = herlpers;
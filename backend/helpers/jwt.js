const jwt = require('jsonwebtoken');

/* const generarJWT = () =>{
const payload = {userid, username }
jwt.sign(payload, process.env.JWT_KEY, {expiresIn:60*60*2}, function(err,token){
if (err){
    console.log(err);
}else{
    console.log(token); 
}
console.log(token);
}) 
}

module.exports = {generarJWT} */

// En modo PROMISE
const generarJWT = (userID,username) =>{
    return new Promise((resolve, reject)=>{
        const payload = {userID,username};
        jwt.sign(payload, process.env.JWT_KEY, {expiresIn:60*60*2}, function(err,token){
            if (err){
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                console.log(token); 
                resolve(token)
            }
            
        }); 
           
    });
   
};


module.exports = {generarJWT}
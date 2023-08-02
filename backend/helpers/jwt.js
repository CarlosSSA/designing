import jwt from 'jsonwebtoken';

const generarJWT = (userID, username) => {
  return new Promise((resolve, reject) => {
    const payload = { userID, username };
    jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 60 * 60 * 2 }, (err, token) => {
      if (err) {
        console.log(err);
        reject('No se pudo generar el token');
      } else {
        console.log(token);
        resolve(token);
      }
    });
  });
};

export { generarJWT };
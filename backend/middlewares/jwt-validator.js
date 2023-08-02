import jwt from 'jsonwebtoken';

const validarJWT = (req, res, next) => {
  // Esto se supone que nos llega siempre en cada petición porque tenemos un interceptor axios en el front que lo crea
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición',
    });
  }

  // Si vemos que viene token, ahora comprobamos si es válido
  try {
    // Qué hace el verify --> Te saca todo el payload
    const payload = jwt.verify(
      token, // Esto es lo que llega por header
      process.env.JWT_KEY,
    );

    console.log('payload del validarJWT', payload);

    // Nos llevamos estos 2 valores del payload (del resultado del verify)
    // Puedo modificar la request y se la podemos pasar por referencia a la siguiente función por el next() DE LOCOS
    // La idea es: 1) Ver si tiene token 2) comprobar que es válido, si lo quiero renovar modifico el req y se lo paso a una función que genera uno nuevo

    req.userID = payload.userID;
    req.username = payload.username;

  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido',
    });
  }

  console.log('token que verificamos desde validarJWT', token);
  next();
};

export { validarJWT };
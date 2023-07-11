import axios from 'axios';

console.log(`la variable de enterno de VITE_BACKEND_URL es LOL XD ${import.meta.env.VITE_BACKEND_URL}`)
console.log(`el modo en que se ejecuta la aplicacion es VITE_BACKEND_URL es LOL XD ${import.meta.env.MODE}`)
console.log(`la base url es VITE_BACKEND_URL es LOL XD ${import.meta.env.BASE_URL}`)
console.log(`si la aplicacion se ejecuta en produccion de VITE_BACKEND_URL es LOL XD ${import.meta.env.PROD}`)
console.log(`si la aplicacion se ejecuta en desarrollo de VITE_BACKEND_URL es LOL XD ${import.meta.env.DEV}`)
console.log(`si la aplicacion se ejecuta en el servidor de VITE_BACKEND_URL es LOL XD ${import.meta.env.SSR}`)


const recetaApi = axios.create({
    //baseURL:import.meta.env.VITE_API_URL 
   // baseURL:'http://localhost:4001/api/'  si lo pongo así funciona
    baseURL:`${import.meta.env.VITE_BACKEND_URL}/api/`

});

// Interceptor en cada llamada GET. Ya que vamos a validar que tengamos un Token en cada useEffect del Router y vamos a ejecutar un método de validación que nos va a dar un Login | Logout

recetaApi.interceptors.request.use( config =>{

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

export default recetaApi
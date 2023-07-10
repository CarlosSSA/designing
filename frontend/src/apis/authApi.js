import axios from 'axios';

const recetaApi = axios.create({
    //baseURL:import.meta.env.VITE_API_URL 
    baseURL:'http://localhost:4001/api/' 

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
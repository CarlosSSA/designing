import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuthStore } from '../../hooks/useAuthStore';
import Swal from 'sweetalert2';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { GoogleLoginButton  } from "react-social-login-buttons";




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginInside() {
  const auth = getAuth();  //Firebase
  const provider = new GoogleAuthProvider();

  // usamos los Hooks :)
  const {startLogin, startRegister, errorMessage} = useAuthStore();

  // Login Social con Firebase
  const call_login_google = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        console.log("que mando ahora al BE social login?", user)
        console.log("email? ", user.email)
        console.log("nombre: ", user.displayName)
        console.log("uid: ", user.uid)
        
        // Llama a startRegister con la información del usuario de Google
        startLogin({
          email: user.email,       
          socialLogin: true // Asumiendo que tienes un flag para indicar registro social
        });
        
      })
      .catch((error) => {
        console.error("Error en Google SignIn:", error);
        // Maneja los errores de Google SignIn
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'), 
    }, "Formulario Enviado");

    console.log("startLogin con los datos del formulario");
    startLogin({email: data.get('email'), password: data.get('password'), sociaLogin: false});
  }; 

  // Alerta de sweetalerts si cambia el errorMessage del Hook
  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticacion', errorMessage, 'error')
    } 
  }, [errorMessage])
  


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <GoogleLoginButton onClick={() => call_login_google()} />

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
);
}
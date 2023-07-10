import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,} from "@mui/material";
import { useEffect, useState } from 'react';
import { Avatar, Card, CardActionArea, Grid, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogContent, DialogTitle, IconButton, Typography, TextField, Button } from '@mui/material';
import IngredientList from './IngredientList';
import { Cell, PieChart, Pie , Tooltip, LabelList,LineChart, Line ,RadarChart , PolarGrid, PolarAngleAxis,PolarRadiusAxis, Radar, Legend, ResponsiveContainer    } from 'recharts';
import PasosList from './PasosList';
import Grafica from './Grafica';
import Comentarios from './Comentarios';
import { useCommentStore } from '../../hooks/useCommentStore'
import { useRecipeStore } from '../../hooks/useRecipeStore'
import {useDispatch, useSelector} from 'react-redux';



const comments = [
    {
      id: 1,
      author: 'Usuario 1',
      content: '¡Me encanta esta receta!',
    },
    {
      id: 2,
      author: 'Usuario 2',
      content: 'Muy fácil de hacer y deliciosa.',
    },
  ];

const ContenidoCard = ({datos}) => {

    const {user} = useSelector(state => state.auth) // con esto pillo el slice


    const {startAddComentario} =  useCommentStore();
    const {startUpdateRecipeComments} =  useRecipeStore();
    

    const [data, setData] = useState()
    const [comentario, setComentario] = useState('');
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [estadoComentario, setEstadoComentario] = useState(false);
    const [maxLength, setMaxLength] = useState(60);


    useEffect(() => {
        console.log("recibo el data en ContenidoCard?", datos)
        console.log("y en el user", user)
        console.log("esto me ignora???")
        setData(datos)
    }, [])
    


    const tabNames = ["Pasos", "Ingredientes"];
    const [value, setValue] = useState(tabNames[0]);
    const handleChange = (event, newValue) => {
      setValue(tabNames[newValue]);
    };

    const handleComentarioChange = (event) => {
        setComentario(event.target.value);
      };

      const addComentario = async () => {
        if (!isButtonDisabled) {
          setButtonDisabled(true); // Deshabilita el botón
      
          console.log("Se supone que llamo a useCommentStore ")
          let nuevoComentario = await startAddComentario({texto:comentario, autor: user.uid})
          startUpdateRecipeComments({rid: datos.receta._id, comentarioID: nuevoComentario.comentario._id})
      
          setComentario('');
          

          setTimeout(() => {
            setButtonDisabled(false); // Habilita el botón después de 10 segundos
          }, 5000);
          
        }
      }




    return (
        <>            
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Pasos" />
                <Tab label="Ingredientes" />            
                </Tabs>
            </Box>
                {value === "Pasos" ? (
            
                <CardContent>
                    <PasosList pasos={datos.receta.pasos} />
                    <Box mt={2}>
                    <Typography variant="h6" component="div">
                        Comentarios
                        {datos.receta.comentarios.map((comentario) => (
                        <Comentarios key={comentario._id} comentario={comentario} user={user}/>
                        ))}
                    </Typography> 

                        <Typography variant="h6" component="div">
                        Añadir un Comentario
                        </Typography>                       

                        <TextField
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            value={comentario}
                            onChange={handleComentarioChange}
                            placeholder="Escribe un comentario..."
                            inputProps={{ maxLength: maxLength }} // propiedades para el input
                        />
                        <div>
                            {comentario.length}/{maxLength}
                        </div>

                        <Button variant="contained" color="primary" style={{ marginTop: 8 }} onClick={addComentario} disabled={isButtonDisabled}>
                            {isButtonDisabled ? 'Comentario Enviado' : 'Publicar comentario'}
                        </Button>
                    </Box>
                </CardContent>
            ) : (
                <CardContent>                    
                    <IngredientList ingredients={datos.receta.ingredientes} />
                    <Grafica datos={datos} />
                </CardContent>
            )}
        </>
    )  
} 



export default ContenidoCard;


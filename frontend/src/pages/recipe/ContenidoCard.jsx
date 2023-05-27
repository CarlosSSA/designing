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

    const [data, setData] = useState()

    useEffect(() => {
        console.log("recibo el data en ContenidoCard?", datos)
        console.log("esto me ignora???")
        setData(datos)
    }, [])
    


    const tabNames = ["Pasos", "Ingredientes"];
    const [value, setValue] = useState(tabNames[0]);
    const handleChange = (event, newValue) => {
      setValue(tabNames[newValue]);
    };




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
                        </Typography>                       

                        <TextField
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            placeholder="Escribe un comentario..."
                        />

                        <Button variant="contained" color="primary" style={{ marginTop: 8 }}>
                         Publicar comentario
                        </Button>
                    </Box>
                </CardContent>
            ) : (
                <CardContent>                    
                    <IngredientList ingredients={datos.receta.ingredientes} />
                    <Grafica datos={data} />
                </CardContent>
            )}
        </>
    )  
} 



export default ContenidoCard;


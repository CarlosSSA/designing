import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider'
import { Avatar, Card, CardActionArea, Grid, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogContent, DialogTitle, IconButton, Typography, TextField, Button, LinearProgress } from "@mui/material";
import { useEffect, useState } from 'react';

import IngredientList from './IngredientList';
import { Cell, PieChart, Pie , Tooltip, LabelList,LineChart, Line ,RadarChart , PolarGrid, PolarAngleAxis,PolarRadiusAxis, Radar, Legend, ResponsiveContainer    } from 'recharts';
import PasosList from './PasosList';
import Grafica from './Grafica';
import Comentarios from './Comentarios';
import { useCommentStore } from '../../hooks/useCommentStore'
import { useRecipeStore } from '../../hooks/useRecipeStore'
import {useDispatch, useSelector} from 'react-redux';
import './ContenidoCard.css'



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

  const ContenidoCard = ({ datos }) => {
    const { user } = useSelector((state) => state.auth);
  
    const { startAddComentario } = useCommentStore();
    const { startUpdateRecipeComments } = useRecipeStore();
  
    const [data, setData] = useState();
    const [comentario, setComentario] = useState('');
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [maxLength, setMaxLength] = useState(60);
    const [localComments, setLocalComments] = useState([]);
    const [showMicronutrients, setShowMicronutrients] = useState(false);

    const [numCommentsToShow, setNumCommentsToShow] = useState(5); // Mostrar inicialmente 5 comentarios
    const [hasMoreComments, setHasMoreComments] = useState(true); // Asumir que hay más comentarios al principio
  
    // Actualizacion de los pasos para que PasosList sea reactivo
    const [steps, setSteps] = useState(datos.receta.pasos);
    const updateSteps = (newSteps) => {
      setSteps(newSteps);
  };

    // Para el botón de Ver mas comentarios
    const handleShowMoreComments = () => {
      if (numCommentsToShow >= localComments.length) {
          setHasMoreComments(false); // Ya no hay más comentarios para mostrar
          return;
      }
      setNumCommentsToShow(prevCount => prevCount + 5); // Mostrar 5 comentarios más
  };

  // Para que los comentarios de uno mismo aparezcan siempre primeros en la lista
  const sortedComments = () => {
    return [...localComments].sort((a, b) => {
      if (a.autor._id === user.uid) return -1;
      if (b.autor._id === user.uid) return 1;
      return 0;
    });
  };

    useEffect(() => {
      setData(datos);
      setLocalComments(datos.receta.comentarios);
      console.log("que me viene en Contenido Card en datos?", datos)
    }, [datos]);
  
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
        setButtonDisabled(true);
  
        const nuevoComentario = await startAddComentario({
          texto: comentario,
          autor: user.uid,
        });
        startUpdateRecipeComments({
          rid: datos.receta._id,
          comentarioID: nuevoComentario.comentario._id,
        });
  
        const comentarioCompleto = {
          ...nuevoComentario.comentario,
          autor: {
            ...nuevoComentario.comentario.autor,
            nombre: user.nombre,
          },
        };
  
        setLocalComments([...localComments, comentarioCompleto]);
        setComentario('');
  
        setTimeout(() => {
          setButtonDisabled(false);
        }, 5000);
      }
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
            <PasosList 
                pasos={steps} 
                recipeID={datos.receta._id} 
                userRecipeID={datos.receta.autor._id} 
                userID={user.uid} 
                onUpdateSteps={updateSteps} 
            />
            <Box mt={2}>
            <Typography variant="h6" component="div">
                Comentarios
                {sortedComments().slice(0, numCommentsToShow).map((comentario) => (
                  <Comentarios key={comentario._id} comentario={comentario} user={user} />
                ))}
            </Typography>

            {hasMoreComments && <Button onClick={handleShowMoreComments}>Más Comentarios</Button>}
              
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
                inputProps={{ maxLength: maxLength }}
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
              <Divider style={{ margin: "20px 0" }} />
              
              <Button variant="contained" color="primary" onClick={() => setShowMicronutrients(!showMicronutrients)}>
                Completa la Información de tus macros
              </Button>
              {showMicronutrients && (
              <div style={{ marginTop: '20px' }}>
                <div className="micronutrient-container">
                  <LinearProgress variant="determinate" value={50} />
                  <Typography variant="caption" className="micronutrient-label">Vitamina B</Typography>
                </div>
                <div className="micronutrient-container">
                  <LinearProgress variant="determinate" value={75} />
                  <Typography variant="caption" className="micronutrient-label">Vitamina C</Typography>
                </div>
              </div>
          )}
        </CardContent>
        )}
      </>
    );
  };
  
  export default ContenidoCard;
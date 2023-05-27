import { Table,TableHead,TextField, TableBody, TableCell, TableRow, Paper, Button  } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const IngredientList = ({ ingredients}) => (
    
    <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Ingrediente</TableCell>
          <TableCell>Cantidad</TableCell>
          <TableCell>Opciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {ingredients.map((ingredient, index) => (
          <TableRow key={index}>
            <TableCell>{ingredient.ingrediente.nombre}</TableCell>            
            <TableCell>{ingredient.cantidad}</TableCell>
            <TableCell>

            <IconButton onClick={() => editItem(ingredient, index) }>
                <ModeEditIcon />
              </IconButton>
              
            <IconButton onClick={() => deleteItem(ingredient, index) }>
                <DeleteIcon />
              </IconButton>

              

            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
    
  );



export default IngredientList
import { Table,TextField, TableBody, TableCell, TableRow, Paper, Button  } from "@mui/material";


const IngredientTable = ({ ingredients, deleteItem }) => (
    
    <Paper>
      <Table>
        <TableBody>
          {ingredients.map((ingredient, index) => (
            <TableRow key={index}>
              <TableCell>{ingredient.ingredient}</TableCell>
              <TableCell>{ingredient.cantidad}</TableCell>
              <TableCell>
              <Button onClick={() => deleteItem(ingredients, index) }>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );



export default IngredientTable



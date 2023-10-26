import { Table,TextField, TableBody, TableCell, TableRow, Paper, Button  } from "@mui/material";
import { useEffect } from "react";


const IngredientTable = ({ ingredients, deleteItem }) => {
  useEffect(() => {
    console.log("que recibo en ingredients?", ingredients);
  }, [ingredients]);

  return (
    <Paper>
      <Table>
        <TableBody>
          {ingredients.map((ingredient, index) => (
            <TableRow key={index}>
              <TableCell>
                <img src={ingredient.imageUrl} alt={ingredient.name} style={{ width: '50px', height: 'auto' }} />
              </TableCell>
              <TableCell>{ingredient.name}</TableCell>
              <TableCell>{ingredient.amount} x {ingredient.unit} ({ingredient.gramsEquivalent}g)</TableCell>
              <TableCell>
                <Button onClick={() => deleteItem(ingredients, index)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default IngredientTable;



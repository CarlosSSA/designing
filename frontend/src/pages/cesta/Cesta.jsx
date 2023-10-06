import { useEffect, useState } from 'react';
import { useAuthStore } from "../../hooks/useAuthStore";
import { useSelector } from "react-redux";
import "./cesta.css"; // Importar el CSS




const Cesta = () => {
  // Definimos el estado local usando hooks useState.
  const [weekDates, setWeekDates] = useState([]);
  const [esISOweeks, setEsISOweeks] = useState([]);
  const [recetasCalendario, setRecetasCalendario] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  // Obtener el uid del usuario actual desde el estado global (Redux).
  const { uid } = useSelector(state => state.auth.user); 

  // Obtenemos el hook personalizado para obtener las recetas del usuario.
  const { startGetUsuarioCalendarRecipes } = useAuthStore();

  // Manejador del cambio del checkbox. Actualiza el estado local de los items marcados.
  const handleCheckboxChange = (ingrediente) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [ingrediente]: !prevState[ingrediente]
    }));
  };

  // Función para formatear fechas ISO a formato de día.
  const formatDateToDay = (isoDate) => {
    const date = new Date(isoDate);
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()).toISOString();
  }

  // Función asíncrona para obtener las recetas del usuario.
  const obtenerRecetas = async () => {
    const miUsuario = await startGetUsuarioCalendarRecipes({ uid });
    console.log("CESTA me llega algo de obtenerRecetas?", miUsuario)
    setRecetasCalendario(miUsuario.usuario.calendarRecipes);
    console.log("CESTA me llega bien", miUsuario.usuario.calendarRecipes)
  };

  useEffect(() => {
    // Función que devuelve todas las fechas de la semana actual.
    const getWeekDates = () => {
      let now = new Date();
      let dayOfWeek = now.getUTCDay();
      let numDay = now.getUTCDate();
      let start = new Date(now);
      start.setUTCDate(numDay - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
      let end = new Date(now);
      end.setUTCDate(numDay + (7 - dayOfWeek));
      
      let days = [];
      for (let d = start; d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
        days.push(new Date(d));
      }
      return days;
      
    }

    const currentWeekDates = getWeekDates();
    console.log("CESTA days",currentWeekDates )
    setWeekDates(currentWeekDates.map(d => `${d.getUTCDate()}/${d.getUTCMonth() + 1}`));
    setEsISOweeks(currentWeekDates.map(d => formatDateToDay(d.toISOString())));
    
    console.log("CESTA ISOWEeks",esISOweeks )
    obtenerRecetas();  // Llamamos a la función para obtener las recetas.
  }, []);

  // Función que devuelve la lista de compras basada en las recetas de la semana.
  const obtenerListaDeCompra = () => {
    const listaCompra = {};

    if (recetasCalendario !== null && esISOweeks.length) {      
      recetasCalendario.forEach(receta => {
        if (esISOweeks.includes(formatDateToDay(receta.fecha))) {
          receta.receta.ingredientes.forEach(ing => {
            if (listaCompra[ing.ingrediente.nombre]) {
              listaCompra[ing.ingrediente.nombre] += ing.cantidad;
            } else {
              listaCompra[ing.ingrediente.nombre] = ing.cantidad;
            }
          });
        }
      });
    }

    return listaCompra;
  }

  const listaCompra = obtenerListaDeCompra();
  console.log("CESTA listaCompra", listaCompra)

  return (
    <div>
      <h1>Esta es la cesta</h1>
      <ul>
        {Object.entries(listaCompra).map(([ingrediente, cantidad]) => (
          <li key={ingrediente}>
            <input 
              type="checkbox" 
              className={checkedItems[ingrediente] ? 'checked' : ''} // Añadir clase según estado
              checked={checkedItems[ingrediente] || false} 
              onChange={() => handleCheckboxChange(ingrediente)}
            />
            <span 
              className={checkedItems[ingrediente] ? 'checked' : ''} // Añadir clase según estado
            >
              {ingrediente}: {cantidad} g
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cesta;
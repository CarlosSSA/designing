

// Son cajas donde ponemos los datos del usuario


import { useState, useEffect } from 'react';


const  Formulario = () => {
  const [gender, setGender] = useState('male');
  const [objective, setObjective] = useState('mantenimiento');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [calories, setCalories] = useState(null);

  useEffect(() => {
    // Aquí lo que haría es mostrar una alerta de rollo "calorias guardadas ok"
    if(calories){
        alert("Has guardado correctamente us calorias")
    }  
    
  }, [calories])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calcular las calorías usando la fórmula Harris-Benedict
    const bmr = gender === 'male' 
      ? 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)
      : 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
    const activityFactors = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      extraActive: 1.9,
    };
    const calorieIntake = Math.round(bmr * activityFactors[activityLevel]);
    if (objective === 'volumen') {
      setCalories(calorieIntake + 500);
    } else if (objective === 'definicion') {
        setCalories(calorieIntake - 500);
    } else
    setCalories(calorieIntake);
    // Guardar en BBDD en kcal objetivo
  };

  return (
    <div>
      <h1>Fórmula Harris-Benedict</h1>
      <form onSubmit={handleSubmit}>
        <div>
        <label>
            Objetivo:
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="mantenimiento">Mantener Peso</option>
              <option value="volumen">Ganar Peso</option>
              <option value="definicion">Perder Peso</option>
            </select>
        </label>
        </div>
        <div>
          <label>
            Género:
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Edad:
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Altura (cm):
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Peso (kg):
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Nivel de actividad física:
            <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
              <option value="sedentary">Sedentario</option>
              <option value="lightlyActive">Ligeramente activo</option>
              <option value="moderatelyActive">Moderadamente activo</option>
              <option value="veryActive">Muy activo</option>
              <option value="extraActive">Extra activo</option>
            </select>
          </label>
        </div>
        <button type="submit">Calcular</button>
      </form>
      {calories !== null && (
        <div>
          <p>Las calorías diarias necesarias son: {calories} kcal.</p>
        </div>
      )}
    </div>
  );
}

export default Formulario
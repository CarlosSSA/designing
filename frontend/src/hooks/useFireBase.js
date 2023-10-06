import { app } from '../../../backend/firebase/config.js';  // Importa tu configuración de Firebase si es necesario
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const storage = getStorage(app);

export const uploadIngredientImage = async (file) => {
  const storageRef = ref(storage, 'ingredientImages/' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Puedes usar snapshot para mostrar un progreso de carga si lo deseas
      }, 
      (error) => {
        reject(error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};
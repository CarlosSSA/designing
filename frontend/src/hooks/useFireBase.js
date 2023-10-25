import { app } from '../../../backend/firebase/config.js';  // Importa tu configuración de Firebase si es necesario
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const storage = getStorage(app);

// Función genérica para subir imágenes a diferentes carpetas en Firebase
const uploadImage = async (file, folder) => {
  const storageRef = ref(storage, `${folder}/` + file.name);
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

export const uploadIngredientImage = async (file) => {
  return await uploadImage(file, 'ingredientImages');
};

export const uploadStepImage = async (file) => {
  console.log("Intentando subir el archivo:", file.name); // Añade esta línea
  const storageRef = ref(storage, 'stepImages/' + file.name);
  const metadata = {
    contentType: file.type,
  };
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

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
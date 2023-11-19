import { app } from '../../../backend/firebase/config.js';  // Importa tu configuración de Firebase si es necesario
import { getDownloadURL, getStorage, ref, uploadBytesResumable, deleteObject } from "firebase/storage";

const storage = getStorage(app);

// Función genérica para subir imágenes a diferentes carpetas en Firebase
export const uploadRecipeImage = async (file) => {
  const storageRef = ref(storage, 'recipeImages/' + file.name);
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
  return await uploadRecipeImage(file);
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

export const replaceRecipeImage = async (newImageFile, oldImagePath, folder) => {
  const storageRef = ref(storage, `${folder}/` + newImageFile.name);
  const uploadTask = uploadBytesResumable(storageRef, newImageFile);

  return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
          (snapshot) => {
              // Opcional: Manejo del progreso de subida
          },
          (error) => {
              reject(error);
          },
          async () => {
              try {
                  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                  // Eliminar la imagen anterior si existe
                  if (oldImagePath) {
                      const oldImageRef = ref(storage, oldImagePath);
                      await deleteObject(oldImageRef);
                  }

                  resolve(downloadURL);
              } catch (error) {
                  reject(error);
              }
          }
      );
  });
};
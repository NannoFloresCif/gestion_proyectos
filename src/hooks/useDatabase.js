import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase'; // Asegúrate que la ruta sea correcta
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

// Creamos nuestro hook personalizado.
// Acepta un argumento 'collectionName' para que sea reutilizable con cualquier colección.
const useDatabase = (collectionName) => {
  // Creamos los estados para los documentos y el estado de carga.
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Usamos useEffect para obtener los datos, igual que antes.
  useEffect(() => {
    // Creamos una consulta a la colección que nos pasaron como argumento.
    const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));

    // onSnapshot establece la escucha en tiempo real.
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setDocuments(docs);
      setIsLoading(false);
    }, (error) => {
      console.error("Error al obtener documentos: ", error);
      setIsLoading(false);
    });

    // La función de limpieza que cancela la suscripción.
    return () => unsubscribe();
  }, [collectionName]); // Se volverá a ejecutar si el nombre de la colección cambia.

  // El hook devuelve los documentos y el estado de carga.
  return { documents, isLoading };
};

export default useDatabase;
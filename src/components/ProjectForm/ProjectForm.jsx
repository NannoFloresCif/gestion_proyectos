import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios'; // Para hacer peticiones HTTP
import { db } from '../../firebase/firebase'; // Nuestra configuración de Firebase
import { collection, addDoc } from 'firebase/firestore';
import './ProjectForm.css'; // Importamos estilos específicos para el formulario


// Este es el componente funcional para nuestro formulario.
function ProjectForm() {
  // --- ESTADO DEL COMPONENTE ---
  // Hooks 'useState' para gestionar los valores de los campos del formulario.
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  // Este estado nos ayudará a forzar la actualización de la UI para mostrar los errores.
  const [, setValidator] = useState(0);
  const [isLoading, setIsLoading] = useState(false); 

  // --- VALIDACIÓN ---
  // Usamos 'useRef' para que la instancia del validador no se cree en cada render.
  const validator = useRef(
    new SimpleReactValidator({
      // Personalizamos los mensajes de error a español.
      messages: {
        required: 'El campo :attribute es obligatorio.',
        min: 'La :attribute debe tener al menos :min caracteres.',
      },
      // Le decimos al validador cómo mostrar el nombre del campo en los mensajes.
      element: (message) => <div style={{ color: 'red' }}>{message}</div>,
    })
  );

  // --- MANEJADOR DEL ENVÍO ---
  const handleSubmit = async (event) => {
    // Prevenimos que la página se recargue al enviar el formulario.
    event.preventDefault();

    // Verificamos si todos los campos son válidos según las reglas.
    if (validator.current.allValid()) {
      // Si todo es válido, aquí irá la lógica para guardar.
      // Por ahora, solo una alerta y limpiamos el formulario.
      setIsLoading(true);
      try{
        console.log("Haciendo llamada a la API externa...");
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        const externalData = response.data; // Guardamos los datos de la API
        console.log("Datos recibidos de la API:", externalData);

        // 3. PREPARAMOS EL OBJETO QUE GUARDAREMOS EN FIRESTORE
        const projectData = {
          name: projectName,
          description: description,
          // Añadimos un campo con los datos que obtuvimos de la API
          taskFromApi: externalData.title, 
          createdAt: new Date() // Guardamos la fecha de creación del proyecto
        };

        // 4. GUARDAMOS EL PROYECTO EN FIRESTORE
        // 'addDoc' es una función asíncrona, por eso usamos 'await'.
        // Le decimos que en nuestra 'db', queremos la 'collection' llamada "projects".
        // Si la colección "projects" no existe, Firestore la creará por nosotros.
        console.log("Guardando proyecto en Firestore...");
        await addDoc(collection(db, "projects"), projectData);

        // 5. TODO SALIÓ BIEN
        alert('¡Proyecto guardado con éxito!');
        setProjectName('');
        setDescription('');
        validator.current.hideMessages();

      } catch (error) {
        // 6. MANEJO DE ERRORES
        // Si algo falla (la llamada a la API o el guardado en Firestore),
        // mostraremos un error.
        console.error("Error al guardar el proyecto: ", error);
        alert('Hubo un error al guardar el proyecto. Inténtalo de nuevo.');
      } finally {
        // 7. ESTO SE EJECUTA SIEMPRE (AL FINAL, CON O SIN ERRORES)
        // Volvemos a habilitar el botón para que el usuario pueda intentarlo de nuevo.
        setIsLoading(false);
      }
      
    } else {
      // Si hay errores, mostramos los mensajes de validación.
      validator.current.showMessages();
      // Forzamos un re-render para que los mensajes de error aparezcan.
      setValidator(1);
    }
  };

  // --- RENDERIZADO DEL COMPONENTE (lo que se ve en pantalla) ---
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Crear Nuevo Proyecto</h2>
      <div className="form-group">
        <label>Nombre del Proyecto:</label><br />
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="form-input"
        />
        {/* Aquí se define y muestra el mensaje de error para 'nombre del proyecto' */}
        {validator.current.message('nombre del proyecto', projectName, 'required')}
      </div>

      <div className="form-group">
        <label>Descripción:</label><br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
        />
        {/* Y aquí para 'descripción', con dos reglas: obligatorio y mínimo 10 caracteres. */}
        {validator.current.message('descripción', description, 'required|min:10')}
      </div>
      
       {/* Usamos el estado 'isLoading' para deshabilitar el botón dinámicamente. */}
      {/* El texto del botón también cambia para dar feedback al usuario. */}
      <button type="submit" className="form-button" disabled={isLoading}>
        {isLoading ? 'Guardando...' : 'Agregar Proyecto'}
      </button>
    </form>
  );
}

export default ProjectForm;
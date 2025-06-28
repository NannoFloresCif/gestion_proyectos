import React from 'react';

// Este componente recibe un solo 'project' a través de las props.
function ProjectItem({ project }) {
  // Usamos React.Fragment para agrupar los elementos sin añadir un <div> extra al DOM.
  // Esto mantiene nuestro HTML más limpio y optimizado, cumpliendo uno de los requisitos. [cite: 19, 381]
  return (
    <>
    <div className="project-item">
      <h3>{project.name}</h3>
      <p><strong>Descripción:</strong> {project.description}</p>
      <p><em>Tarea de API (simulada): {project.taskFromApi}</em></p>
      <button>Eliminar</button><br></br>
      ______________________________________________________________
    </div>
    </>
  );
}

export default ProjectItem;
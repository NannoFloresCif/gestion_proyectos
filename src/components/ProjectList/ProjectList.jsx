import React from 'react';
import ProjectItem from '../ProjectItem/ProjectItem'; // Importamos el componente hijo

// Este componente recibe la lista completa de 'projects' como prop.
function ProjectList({ projects }) {
  return (
    <div className="project-list-container">
      {
        /* Usamos el método map() para iterar sobre el array de proyectos.  */
        /* 'map' transforma cada objeto 'project' del array en un componente <ProjectItem />. [cite: 62] */
        projects.map(project => (
          /* Es CRUCIAL pasar una 'key' única a cada elemento de una lista. */
          /* Esto ayuda a React a optimizar el renderizado y saber qué elemento es cuál. [cite: 17, 59] */
          /* Usamos el ID de Firestore porque es garantizado que será único. */
          <ProjectItem key={project.id} project={project} />
        ))
      }
    </div>
  );
}

export default ProjectList;
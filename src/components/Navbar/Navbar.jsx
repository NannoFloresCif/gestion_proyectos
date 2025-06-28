import React from 'react';
// Importamos 'Link' que es el componente para crear enlaces de navegación.
import { Link } from 'react-router-dom';
import './Nabvar.css'; // Importamos el CSS específico para este componente


function Navbar() {
  

  return (
    <nav className="navbar-container">
      {/* El componente 'Link' funciona como una etiqueta <a>, pero evita que la página se recargue. */}
      {/* 'to="/"' especifica la URL a la que navegará. */}
      <Link to="/" className="navbar-link">Inicio</Link>
      <Link to="/nuevo-proyecto" className="navbar-link">Agregar Proyecto</Link>
    </nav>
  );
}

export default Navbar;
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import NewProjectPage from './pages/NewProjectPage';
import './App.css'

function App() {


  return (
    <>
      
      <div className="App">
      {/* 1. La barra de navegación se muestra siempre, en la parte superior. */}
      <Navbar />
      <main>
        {/* 2. El componente 'Routes' define el área donde cambiarán las páginas. */}
        <Routes>
          {/* 3. Cada 'Route' define una regla: qué componente mostrar para qué URL. */}
          {/* La ruta para la URL raíz ("/") mostrará el componente HomePage. */}
          <Route path="/" element={<HomePage />} />
          {/* La ruta para la URL "/nuevo-proyecto" mostrará el componente NewProjectPage. */}
          <Route path="/nuevo-proyecto" element={<NewProjectPage />} />
        </Routes>
      </main>
    </div>
    </>
  )
}

export default App

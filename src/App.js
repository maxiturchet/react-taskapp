import { useState } from "react";
import "./App.css";
import { ListaPrincipal } from "./componentes/ListaPrincipal";
import { Menu } from "./componentes/Menu";

function App() {
  const [mostrar, setMostrar] = useState(true);

  const mostrarTodo = () => {
    if (!mostrar) {
      setMostrar(!mostrar);
    }
  };
  const mostrarEvent = () => {
    if (mostrar) {
      setMostrar(!mostrar);
    }
  };

  return (
    <div className="App">
      <div className="titulo-contenedor">
        <h1>My Tasks</h1> 
      </div>
      <div className="tareas-lista-principal">
        <Menu mostrarTodo={mostrarTodo} mostrarEvent={mostrarEvent} />
        <ListaPrincipal 
          mostrar={mostrar} />
      </div>
    </div>
  );
}

export default App;

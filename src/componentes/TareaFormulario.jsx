import "../styles/TareaFormulario.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TareaFormulario = ({onSubmit, saveData}) => {
  
  const [input, setInput] = useState("");

  const manejarCambio = (e) => {
    setInput(e.target.value);
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    e.target.reset()

    const tareaNueva = {
      id: uuidv4(),
      texto: input,
      completada: false,
      editar: false
    };
    onSubmit(tareaNueva);
  };

  return (
    <form className="tarea-formulario" onSubmit={manejarEnvio} >
      <input
        className="tarea-input"
        type="text"
        placeholder="Write a new task..."
        name="texto"
        onChange={manejarCambio}
      />
      <button 
        className="tarea-boton" 
        >
        Add Task
      </button>
    </form>
  );
};

export default TareaFormulario;

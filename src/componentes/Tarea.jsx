import { useState } from "react";
import "../styles/Tarea.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { RiEdit2Line } from "react-icons/ri";

const Tarea = ({
  id,
  texto,
  completada,
  editar,
  editarTarea,
  completarTarea,
  eliminarTarea,
  manejarCheck,
}) => {

  const [textoEditado, setTextoEditado] = useState('')

  const editTexto = (e) => {
    setTextoEditado(e.target.value)
  }

  return (
    <div
      className={
        completada ? "tarea-contenedor completada" : "tarea-contenedor"
      }
    >
      <div className='tarea-texto'>
          <input 
              className={editar 
                ? "tarea-texto-input" 
                : "tarea-texto-input hidden"}
              type="text"
              placeholder="Edit the task"
              name="texto"
              onChange={e => editTexto(e)}
            />
          <div className={editar 
                ? "tarea-texto-data hidden" 
                : "tarea-texto-data"}
          onClick={() => completarTarea(id)}>
            {texto}
          </div>
      </div>
      <div className="tarea-icono">
        <div 
          className={editar
              ? "tarea-icono-edit hidden"
              : "tarea-icono-edit"}
          onClick={() => editarTarea(id)}>
            <RiEdit2Line className="tarea-edit-icono" />
        </div>
        <div 
          className={editar
            ? "tarea-icono-check"
            : "tarea-icono-check hidden"} 
            onClick={() => manejarCheck(id, textoEditado)}>
            <RiCheckboxCircleLine className="tarea-check-icono" />
        </div>
        <div 
          className="tarea-icono-borrar" 
          onClick={() => eliminarTarea(id)}>
            <RiDeleteBinLine className="tarea-borrar-icono" />
        </div>
      </div>
      
    </div>
  );
};

export default Tarea;

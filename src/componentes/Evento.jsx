import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { RiEdit2Line } from "react-icons/ri";
import { RiCheckboxCircleLine } from "react-icons/ri";
import '../styles/Evento.css'

export const Evento = ({
  id,
  texto,
  fecha,
  diasRestantes,
  terminado,
  editar,
  editarEvento,
  manejarCheck,
  eliminarEvento
}) => {

  const [textoEditado, setTextoEditado] = useState('')
  const [fechaEditada, setFechaEditada] = useState(new Date())

  const editTexto = (e) => {
    setTextoEditado(e.target.value)
  }

  const editFecha = (date) => {
    const newDate = new Date(date.target.value)
    console.log(newDate)
    setFechaEditada(newDate)
  };

  return (
    <div className={
      terminado ? "evento-contenedor terminado" : "evento-contenedor "
    }>
      <div className='dias-restantes-contenedor'>
        <p className="numero-dias-restantes">{diasRestantes}</p>
        <p className="days-dias-restantes">days</p>
      </div>
      <div className='evento-texto'>
          <input 
              className={editar 
                ? "evento-texto-input" 
                : "evento-texto-input hidden"}
              type="text"
              placeholder="Edit the event"
              name="texto"
              onChange={e => editTexto(e)}
            />
        <div
            className={editar
              ? "evento-texto-data hidden"
              : "evento-texto-data"}>
          {texto}
        </div>
      </div>
      <div className='evento-fecha'>
          <input
            className={editar
              ? "evento-fecha-input"
              : "evento-fecha-input hidden"}
              type="date"
              onChange={date => editFecha(date)}
          />
          <div
            className={editar
              ? "evento-fecha-data hidden"
              : "evento-fecha-data"}
            >
            {fecha}
          </div>
      </div>
      <div className="evento-icono">
        <div 
          className={editar
              ? "evento-icono-edit hidden"
              : "evento-icono-edit"}
          onClick={() => editarEvento(id)}>
            <RiEdit2Line className="evento-edit-icono" />
        </div>
        <div 
          className={editar
            ? "evento-icono-check"
            : "evento-icono-check hidden"} 
          onClick={() => manejarCheck(id, textoEditado, fechaEditada)}>
            <RiCheckboxCircleLine className="evento-icono-edit" />
        </div>
      </div>
      <div 
        className="evento-icono" 
        onClick={() => eliminarEvento(id)}>
          <RiDeleteBinLine className="evento-icono-borrar" />
      </div>
    </div>
  )
}

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import '../styles/EventoFormulario.css'
import 'react-datepicker/dist/react-datepicker.css';

export const EventoFormulario = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [input, setInput] = useState("");
  const hoy = new Date()
  const fechaNueva = new Date(startDate)
  const diaActual = new Date( hoy.getTime() + Math.abs(hoy.getTimezoneOffset()*60000))
  const nuevaFecha = new Date( fechaNueva.getTime() + Math.abs(fechaNueva.getTimezoneOffset()*60000) )
  const diasRestantes = Math.round((nuevaFecha - diaActual)/(1000*60*60*24)+1)


  const manejarCambio = (e) => {
    setInput(e.target.value);
  }
  
  const manejarDate = (date) => {
    const newDate = new Date(date.target.value)
    setStartDate(newDate)
  };
  
  const manejarEnvio = (e) => {
    e.preventDefault();
    e.target.reset()
    
    const nuevoEvento = {
      id: uuidv4(),
      diasRestantes: diasRestantes,
      texto: input,
      fecha: nuevaFecha.toDateString(),
      terminado: diasRestantes < 0 ? true : false,
      editar: false
    };
    props.onSubmit(nuevoEvento)
  }

  return (
    <form className='evento-formulario' onSubmit={manejarEnvio}>
      <input
          className="evento-input"
          type="text"
          placeholder="Write a new event..."
          name="texto"
          onChange={manejarCambio}
      />
      <input 
        className="calendario-contenedor"
        type="date"
        onChange={date => manejarDate(date)}
      />
      <button 
        className="evento-boton" >
        Add Event
      </button>
    </form>
  )
}

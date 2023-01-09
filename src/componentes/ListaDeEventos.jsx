import { useEffect, useState } from "react"
import { Evento } from "./Evento"
import { EventoFormulario } from "./EventoFormulario"
import { MenuEstados } from "./MenuEstados"
import '../styles/ListaDeEventos.css'


export const ListaDeEventos = ({ mostrar }) => {
  const [eventosGuardados, setEventosGuardados] = useState(window.localStorage.getItem('eventos-guardados'))
  const [eventos, setEventos] = useState([])
  const [eventosFinalizados, setEventosFinalizados] = useState([]) 
  const [eventosActivos, setEventosActivos] = useState([])
  const [data, setData] = useState('focusAll')
  const [eventosEstados, setEventosEstados] = useState({
    'eventosAll': true,
    'eventosActive': false,
    'eventosComplete': false,
  }) 

  useEffect(() => {
    const loadEvents = window.localStorage.getItem('eventos-guardados')
    if(loadEvents){
      const savedEvents = JSON.parse(loadEvents)
      setEventosGuardados(savedEvents)
      setEventos(JSON.parse(eventosGuardados))
    }    
  },[])

  const agregarEvento = evento => {
    if (evento.texto.trim()) {
      evento.texto = evento.texto.trim();
      const eventosActualizados = [evento, ...eventos]
      setEventos(eventosActualizados)
    }
  }
  
  const eliminarEvento = id => {
    const eventosActualizados = eventos.filter(evento => evento.id !== id)
    setEventos(eventosActualizados)
  }

  const editarEvento = (id)=> {
    const eventosEditar = eventos.map(evento => {
      if(evento.id === id){
        evento.editar = true
      }
      return evento
    })
    setEventos(eventosEditar)
  }
  
  const manejarCheck = (id, textoEdit, fechaEdit) => {
    const actualizarEventos = eventos.map(evento => {
      if(evento.id === id) {
        const hoy = new Date()
        const fechaNueva = new Date(fechaEdit)
        const diaActual = new Date(hoy.getTime() + Math.abs(hoy.getTimezoneOffset()*60000))
        const nuevaFecha = new Date( fechaNueva.getTime() + Math.abs(fechaNueva.getTimezoneOffset()*60000) )
        const diasRestantes = Math.round((nuevaFecha - diaActual)/(1000*60*60*24)+1)
        evento.diasRestantes = diasRestantes
        if (textoEdit.trim()) {
          textoEdit = textoEdit.trim();
        evento.texto = textoEdit
        evento.fecha = nuevaFecha.toDateString()
        evento.editar = false
        }
      }
      return evento
    })
    setEventos(actualizarEventos)
  }

  const manejarAll = () => {
    const focus = 'focusAll'
    setData(focus)
    setEventos(eventos)
    const eventosStatus = {'eventosAll': true,
    'eventosActive': false,
    'eventosComplete': false}
    setEventosEstados(eventosStatus)
  }

  const manejarActive = () => {
    const focus = 'focusActive'
    setData(focus)
    const eventosActivos = eventos.filter(evento => evento.terminado === false)
    setEventosActivos(eventosActivos)
    const eventosStatus = {'eventosAll': false,
    'eventosActive': true,
    'eventosComplete': false}
    setEventosEstados(eventosStatus)
  }

  const manejarFinished = () => {
    const focus = 'focusFinished'
    setData(focus)
    const eventosTerminados = eventos.filter(evento => evento.terminado === true)
    setEventosFinalizados(eventosTerminados)
    const eventosStatus = {'eventosAll': false,
    'eventosActive': false,
    'eventosComplete': true}
    setEventosEstados(eventosStatus)
  }

  useEffect(() => {
    window.localStorage.setItem('eventos-guardados', JSON.stringify(eventos))
  }, [eventos])


  return (
    <div className={mostrar ? "eventos-contenedor hidden" : "eventos-contenedor"}>
      <EventoFormulario onSubmit={agregarEvento} />
      <MenuEstados
          isFocus={data}
          manejarAll={manejarAll}
          manejarActive={manejarActive} 
          manejarFinished={manejarFinished}/>
      <div className={eventosEstados.eventosAll
            ? 'evento-lista-contenedor'
            : 'evento-lista-contenedor hidden'}>
        {
          eventos.map(evento => 
            <Evento 
              key={evento.id}
              id={evento.id}
              texto={evento.texto} 
              fecha={evento.fecha}
              diasRestantes={evento.diasRestantes}
              terminado={evento.diasRestantes < 0 ? true : false}
              editar={evento.editar}
              editarEvento={editarEvento}
              eliminarEvento={eliminarEvento} 
              manejarCheck={manejarCheck}/>
        )}
      </div>
      <div className={eventosEstados.eventosActive 
        ? 'evento-lista-contenedor'
        : 'evento-lista-contenedor hidden'}>
        {
          eventosActivos.map(evento => 
            <Evento 
              key={evento.id}
              id={evento.id}
              texto={evento.texto} 
              fecha={evento.fecha}
              diasRestantes={evento.diasRestantes}
              terminado={evento.diasRestantes < 0 ? true : false}
              editar={evento.editar}
              editarEvento={editarEvento}
              eliminarEvento={eliminarEvento} 
              manejarCheck={manejarCheck}/>
        )}
      </div>
      <div className={eventosEstados.eventosComplete
            ? 'evento-lista-contenedor'
            : 'evento-lista-contenedor hidden'}>
        {
          eventosFinalizados.map(evento => 
            <Evento 
              key={evento.id}
              id={evento.id}
              texto={evento.texto} 
              fecha={evento.fecha}
              diasRestantes={evento.diasRestantes}
              terminado={evento.diasRestantes < 0 ? true : false}
              editar={evento.editar}
              editarEvento={editarEvento}
              eliminarEvento={eliminarEvento} 
              manejarCheck={manejarCheck}/>
        )}
      </div>
    </div>
  )
}

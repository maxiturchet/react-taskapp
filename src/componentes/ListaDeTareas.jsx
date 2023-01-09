import { useState, useEffect } from "react";
import TareaFormulario from "./TareaFormulario";
import { MenuEstados } from "./MenuEstados";
import Tarea from "./Tarea";
import '../styles/ListaDeTareas.css'

export const ListaDeTareas = ({ mostrar}) => {
  const [tareasGuardadas, setTareasGuardadas] = useState(window.localStorage.getItem('tareas-guardadas'))
  const [tareas, setTareas] = useState([]);
  const [tareasTerminadas, setTareasFinalizadas] = useState([]) 
  const [tareasActivas, setTareasActivas] = useState([])
  const [tareasEstados, setTareasEstados] = useState({
    'tareasAll': true,
    'tareasActive': false,
    'tareasComplete': false,
  }) 


  useEffect(() => {
    const loadedTodo = window.localStorage.getItem('tareas-guardadas')
    if(loadedTodo) {
      const savedTodo = JSON.parse(loadedTodo)
      setTareasGuardadas(savedTodo)
      setTareas(JSON.parse(tareasGuardadas))
    }}, [])



  const agregarTarea = tarea => {
    if (tarea.texto.trim()) {
      tarea.texto = tarea.texto.trim();
      const tareasActualizadas = [tarea, ...tareas];
      setTareas(tareasActualizadas);
    }
  };

  const eliminarTarea = id => {
    const tareasActualizadas = tareas.filter (tarea => tarea.id !== id) 
    setTareas(tareasActualizadas)
  };

  const completarTarea = id => {
    const tareasActualizadas = tareas.map(tarea => {
      if(tarea.id === id){
        tarea.completada = !tarea.completada;
      }
      return tarea
    });
    setTareas(tareasActualizadas);
  };  

  const editarTarea = id => {
    const tareasEditar = tareas.map(tarea => {
      if(tarea.id === id){ 
        tarea.editar = true
      }
      return tarea
    })
    setTareas(tareasEditar)
  }
  
  const manejarCheck = (id, textoEdit) => {
    const actualizarTareas = tareas.map(tarea => {
      if(tarea.id === id) {
        if (textoEdit.trim()) {
          textoEdit = textoEdit.trim();
          tarea.texto = textoEdit
        }
        tarea.editar = false
      }
      return tarea
    })
    setTareas(actualizarTareas)
  }
  
  const manejarAll = () => {
    setTareas(tareas)
    const tareasStatus = {'tareasAll': true,
    'tareasActive': false,
    'tareasComplete': false}
    setTareasEstados(tareasStatus)
  }

  const manejarActive = () => {
    const tareasActivas = tareas.filter(tarea => tarea.completada === false)
    setTareasActivas(tareasActivas)
    const tareasStatus = {'tareasAll': false,
    'tareasActive': true,
    'tareasComplete': false}
    setTareasEstados(tareasStatus)
  }

  const manejarFinished = () => {
    const tareasTerminadas = tareas.filter(tarea => tarea.completada === true)
    setTareasFinalizadas(tareasTerminadas)
    const tareasStatus = {'tareasAll': false,
    'tareasActive': false,
    'tareasComplete': true}
    setTareasEstados(tareasStatus)
  }

  useEffect(() => {
      window.localStorage.setItem(
      'tareas-guardadas', JSON.stringify(tareas))
    },[tareas])

  return (
    <div className={mostrar ? "todo-contenedor" : "todo-contenedor hidden"}>
        <TareaFormulario onSubmit={agregarTarea} />
        <MenuEstados 
          manejarAll={manejarAll}
          manejarActive={manejarActive} 
          manejarFinished={manejarFinished}/>
        <div className={tareasEstados.tareasAll
        ? 'tarea-lista-contenedor'
        : 'tarea-lista-contenedor hidden'}> 
        {
          tareas.map((tarea) => 
            <Tarea 
                key={tarea.id}
                id={tarea.id}
                texto={tarea.texto} 
                completada={tarea.completada}
                editar={tarea.editar}
                editarTarea={editarTarea}
                completarTarea={completarTarea}
                eliminarTarea= {eliminarTarea}
                manejarCheck={manejarCheck}
                />
        )}       
        </div>    
        <div className={tareasEstados.tareasActive 
        ? 'tarea-lista-contenedor'
        : 'tarea-lista-contenedor hidden'}> 
        {
          tareasActivas.map((tarea) => 
            <Tarea 
                key={tarea.id}
                id={tarea.id}
                texto={tarea.texto} 
                completada={tarea.completada}
                editar={tarea.editar}
                editarTarea={editarTarea}
                completarTarea={completarTarea}
                eliminarTarea= {eliminarTarea}
                manejarCheck={manejarCheck}
                />
        )}    
        </div>    
        <div className={tareasEstados.tareasComplete
        ? 'tarea-lista-contenedor'
        : 'tarea-lista-contenedor hidden'}> 
        {
          tareasTerminadas.map((tarea) => 
            <Tarea 
                key={tarea.id}
                id={tarea.id}
                texto={tarea.texto} 
                completada={tarea.completada}
                editar={tarea.editar}
                editarTarea={editarTarea}
                completarTarea={completarTarea}
                eliminarTarea= {eliminarTarea}
                manejarCheck={manejarCheck}
                />
        )}        
        </div>
    </div>
  )
}

import '../styles/MenuEstados.css'

export const MenuEstados = ({ manejarAll, manejarActive, manejarFinished}) => {
  return (
    <div className='menu-eventos-contenedor'>
        <div 
            className='eventos-all'
            onClick={manejarAll}> 
          All
        </div>
        <div
            className='eventos-active'
            onClick={manejarActive}>
          Active
        </div>
        <div
            className='eventos-finished'
            onClick={manejarFinished}>
          Finished
        </div>
    </div>
  )
}

import { useState } from 'react'
import '../styles/MenuEstados.css'

export const MenuEstados = ({ 
      manejarAll, 
      manejarActive,
      manejarFinished,
      isFocus
}) => {

  const [focus, setFocus] = useState(isFocus)

  return (
    <div className='menu-eventos-contenedor'>
        <div 
            className={isFocus === 'focusAll'
              ? 'eventos-all focus'
              : 'eventos-all'}
            onClick={manejarAll}> 
          All
        </div>
        <div
            className={isFocus === 'focusActive'
              ? 'eventos-active focus'
              : 'eventos-active'}
            onClick={manejarActive}>
          Active
        </div>
        <div
            className={isFocus === 'focusFinished'
              ? 'eventos-finished focus'
              : 'eventos-finished'}
            onClick={manejarFinished}>
          Finished
        </div>
    </div>
  )
}

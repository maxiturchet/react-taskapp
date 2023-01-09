import '../styles/MenuBoton.css'

export const MenuBoton = ({ texto, mostrar }) => {
  return (
    <button className="botones-principales" onClick={mostrar}>
      {texto}
    </button>
  )
}

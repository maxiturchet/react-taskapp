import "../styles/Menu.css";
import { MenuBoton } from "./MenuBoton";

export const Menu = ({mostrarTodo, mostrarEvent}) => {
  return (
    <div className="contenedor-botones-principales">
      <MenuBoton texto="To Do List" mostrar={mostrarTodo} />
      <MenuBoton texto="Event List" mostrar={mostrarEvent} />
    </div>
  );
};

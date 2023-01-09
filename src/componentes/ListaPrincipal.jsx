import "../styles/ListaPrincipal.css";
import { ListaDeTareas } from "./ListaDeTareas";
import { ListaDeEventos } from "./ListaDeEventos";

export const ListaPrincipal = ({ mostrar }) => {
  return (
    <>
      <ListaDeTareas mostrar={mostrar} />
      <ListaDeEventos mostrar={mostrar} />
    </>
  );
};

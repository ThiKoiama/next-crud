import { useState } from "react";
import Cliente from "../core/Cliente";
import Botao from "./Botao";
import Entrada from "./Entrada";

interface FormularioProps {
  cliente: Cliente;
  cancelado?: () => void
  clienteMudou?: (cliente: Cliente) => void
}

export default function Formulario(props: FormularioProps) {
  const [nome, setNome] = useState(props.cliente?.nome ?? "");
  const [idade, setIdade] = useState(props.cliente?.idade ?? "");
  const id = props.cliente?.id;

  return (
    <div>
      {id ? <Entrada somenteLeitura texto="Código" className="mb-5" valor={id} /> : false}
      <Entrada texto="Nome" valor={nome} valorMudou={setNome} className="mb-5"/>
      <Entrada texto="Idade" tipo="number" valor={idade} valorMudou={setIdade} className="mb-5" />
   
    <div className="flex justify-end mt-7">
        <Botao cor="blue" className="mr-2" onClick={()=> props.clienteMudou?.(new Cliente(nome, +idade, id))}>{id ? 'Alterar': 'Salvar'}</Botao>
        <Botao onClick={props.cancelado}>Cancelar</Botao>
    </div>
   </div>
  );
}
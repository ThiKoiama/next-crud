import Cliente from "../core/Cliente";
import ClienteRepositorio from "../core/ClienteRepositorio";
import { useEffect, useState } from "react";
import ColecaoCliente from "../backend/db/ColecaoCliente";
import useTabelaOuForm from "./useTabelaOuForm";

export default function useClientes(){
    const repo: ClienteRepositorio = new ColecaoCliente()
  
 const {tabelaVisivel, formularioVisivel, exibirFormulario, exibirTabela} = useTabelaOuForm()
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const [clientes, setCLientes] = useState<Cliente[]>([])

useEffect(obterTodos, [])


function obterTodos(){
  repo.obterTodos().then(clientes=>{
    setCLientes(clientes)
    exibirTabela()
  })
}


function clienteSelecionado(cliente:Cliente){
  setCliente(cliente)
  exibirFormulario()
}
async function clienteExcluido(cliente:Cliente){
  await repo.excluir(cliente)
  obterTodos()
}

async function salvarCliente(cliente: Cliente){
  await repo.salvar(cliente)
  obterTodos()
}

function novoCliente(){
  setCliente(Cliente.vazio())
  exibirFormulario()
}

    return {
        novoCliente,
        salvarCliente,
        clienteExcluido,
        clienteSelecionado,
        obterTodos,
        cliente,
        clientes,
        tabelaVisivel,
        exibirTabela,
    }


}
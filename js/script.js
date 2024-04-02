class Cliente {
    constructor(){ //é chamado toda vez que a classe é instanciada
        this.clientes = JSON.parse(localStorage.getItem('tbClientes')) || []       
    }

    static fields = ['nome','nascimento','mensalidade','estadocivil','sexo']

    salva(cliente){
        this.clientes.push(cliente) //o push adiciona no fim do array
        localStorage.setItem('tbClientes', JSON.stringify(this.clientes))
        alert('Cliente salvo com sucesso ✔')
        this.lista() // atualiza a listagem
        //limpando os campos
        document.getElementById('nome').value = ''
        document.getElementById('nascimento').value = ''
        document.getElementById('mensalidade').value = ''
        document.getElementById('estadocivil').value = ''
    }
    lista(){
        const tbody = document.getElementById('listaClientes')        
        const linhas = this.clientes.map(cliente => {
            return `
            <tr>
               <td>${cliente.nome}</td>
               <td>${new Date(cliente.nascimento).toLocaleDateString()}</td>
               <td>${cliente.mensalidade}</td>
               <td>${cliente.estadocivil}</td>
               <td>${cliente.sexo}</td>
            </tr>   
            `        
        })
        tbody.innerHTML = linhas.join('')
}
}
//criando o objeto cliente
const cliente = new Cliente()

document.getElementById('salvar').addEventListener('click', (event) => {
    event.preventDefault() //evita que a página seja recarregada
    let valorSexo = ''
    if(document.getElementById('masculino').checked){
        valorSexo = 'Masculino'
    } else {
        valorSexo = 'Feminino'
    }

    const registro = {
        nome: document.getElementById('nome').value,
        nascimento: document.getElementById('nascimento').value,
        mensalidade: document.getElementById('mensalidade').value,
        estadocivil: document.getElementById('estadocivil').value,
        sexo: valorSexo
    }
    //salvando os dados
    cliente.salva(registro)
})

//Carregar a listagem no momento que carregar a página
window.onload = function(){
    cliente.lista()
}


// https://divtable.com/table-styler/
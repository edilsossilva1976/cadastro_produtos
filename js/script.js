class Produto{

    constructor(){

        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
        
    }

    salvar(){
        //pegar os dados do input
        let produto = this.lerDados();

        if(this.validaCampos(produto)){
            if(this.editId == null){
                this.adicionar(produto)
            }else{
                this.atualizar(this.editId, produto);
            }

        }

        this.listaTabela();
        this.cancelar();
    }

    listaTabela(){
        const tbody = document.getElementById('tbody');
        tbody.innerText = '';
        
        for (let index = 0; index < this.arrayProdutos.length; index++) {
            const tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[index].id;
            td_produto.innerText = this.arrayProdutos[index].nomeProduto;
            td_preco.innerText = this.arrayProdutos[index].preco;

            td_id.classList.add('center');
            

            let imgEdit = document.createElement("img");
            imgEdit.src = './img/edit.png';
            imgEdit.setAttribute("onclick", "produto.preparaEdicao(" + JSON.stringify(this.arrayProdutos[index]) +")");

            let imgTrash = document.createElement("img");
            imgTrash.src = './img/trash.png';
            imgTrash.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[index].id +")");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgTrash);
            td_acoes.classList.add('center');

            console.log(this.arrayProdutos);
        }
    }

    adicionar(produto){
        produto.preco = parseFloat(produto.preco);
        this.arrayProdutos.push(produto);
        this.id++;
    }

    atualizar(id, produto){
        for(let i=0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preco = produto.preco;
            }
        }

    }

    preparaEdicao(dados){
        this.editId = dados.id;
        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('preco').value = dados.preco;

        document.getElementById('btn_salvar').innerText = 'Atualizar';
    }

    lerDados(){
        let produto = {}

        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.preco = document.getElementById('preco').value;

        return produto;
    }

    validaCampos(produto){
        let msg = '';
        if(produto.nomeProduto == ''){
            msg += '- Informe o nome do produto\n';
        }

        if(produto.preco == ''){
            msg += '- Informe o preço do produto\n';
        }

        if(msg != ''){
            alert(msg);
            return false;
        }

        return true;
    }

    cancelar(){ 
        document.getElementById('produto').value = '';
        document.getElementById('preco').value = '';

        document.getElementById('btn_salvar').innerText = 'Salvar';
        this.editId = null;
    }

    deletar(id){
        if(confirm('Tem certeza em excluir o produto de ID '+ id + '?')){
            const tbody = document.getElementById('tbody');

            for(let i=0; i < this.arrayProdutos.length; i++){
                if(this.arrayProdutos[i].id == id){
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
        }
        console.log(this.arrayProdutos);
        }
        
    }
}
let produto = new Produto();
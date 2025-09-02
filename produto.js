document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('detalhe-produto-container');
    const relacionadosContainer = document.querySelector('#produtos-relacionados .produtos-container');

    function carregarDetalhesProduto() {
        const urlParams = new URLSearchParams(window.location.search);
        const produtoId = parseInt(urlParams.get('id'));
        const catalogo = JSON.parse(localStorage.getItem('catalogoProdutos'));

        if (!produtoId || !catalogo) {
            container.innerHTML = '<p>Produto não encontrado ou catálogo indisponível. <a href="index.html">Voltar para a loja</a>.</p>';
            return;
        }

        const produto = catalogo.find(p => p.id === produtoId);

        if (!produto) {
            container.innerHTML = '<p>Produto não encontrado. <a href="index.html">Voltar para a loja</a>.</p>';
            return;
        }

        document.title = "Sossego - " + produto.nome;

        container.innerHTML = `
            <div class="produto-imagem-grande">
                <img src="${produto.imagem.replace('/200/200', '/350/350')}" alt="${produto.nome}">
            </div>
            <div class="produto-info">
                <span class="categoria">${produto.categoria}</span>
                <h1>${produto.nome}</h1>
                <p class="descricao">${produto.descricao}</p>
                <div class="seletor-quantidade">
                    <button id="btn-diminuir-qtd">-</button>
                    <input type="number" id="input-qtd" value="1" min="1">
                    <button id="btn-aumentar-qtd">+</button>
                </div>
                <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
                <button id="btn-adicionar-detalhe">Adicionar ao Carrinho</button>
            </div>
        `;

        carregarRelacionados(produto, catalogo);
        adicionarEventos(produto);
    }

    function carregarRelacionados(produtoPrincipal, catalogo) {
        if (!relacionadosContainer) return;
        relacionadosContainer.innerHTML = '';

        const produtosRelacionados = catalogo.filter(p =>
            p.categoria === produtoPrincipal.categoria && p.id !== produtoPrincipal.id
        ).slice(0, 3);

        if (produtosRelacionados.length === 0) {
            document.getElementById('produtos-relacionados').style.display = 'none';
            return;
        }

        produtosRelacionados.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'produto-card';
            card.innerHTML = `
                <a href="produto.html?id=${produto.id}" style="text-decoration: none; color: inherit; display: flex; flex-direction: column; height: 100%;">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <h3>${produto.nome}</h3>
                    <p style="margin-top: auto;">R$ ${produto.preco.toFixed(2)}</p>
                </a>
            `;
            relacionadosContainer.appendChild(card);
        });
    }

    function adicionarEventos(produto) {
        const btnAdicionar = document.getElementById('btn-adicionar-detalhe');
        const btnDiminuir = document.getElementById('btn-diminuir-qtd');
        const btnAumentar = document.getElementById('btn-aumentar-qtd');
        const inputQtd = document.getElementById('input-qtd');

        if (!btnAdicionar) return;

        btnAumentar.addEventListener('click', () => {
            inputQtd.value = parseInt(inputQtd.value) + 1;
        });

        btnDiminuir.addEventListener('click', () => {
            const valor = parseInt(inputQtd.value);
            if (valor > 1) {
                inputQtd.value = valor - 1;
            }
        });

        btnAdicionar.addEventListener('click', () => {
            const quantidade = parseInt(inputQtd.value);
            if (quantidade > 0) {
                adicionarAoCarrinho(produto, quantidade); // A função adicionarAoCarrinho está no shared.js
            }
        });
    }

    carregarDetalhesProduto();
});
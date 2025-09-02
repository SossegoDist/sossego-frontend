document.addEventListener('DOMContentLoaded', () => {

    const produtos = [
        // Cervejas e Bebidas Populares
        { id: 1, nome: 'Cerveja Skol Lata 350ml', preco: 7.50, imagem: 'images/cerveja-skol.png', categoria: 'Cervejas e Bebidas Populares', descricao: 'A clássica Skol Pilsen, uma cerveja leve, refrescante e fácil de beber. Com seu amargor suave e aroma discreto, é a escolha ideal para dias quentes e encontros com amigos. Harmoniza perfeitamente com petiscos e pratos leves. Teor Alcoólico: 4.7%.' },
        { id: 2, nome: 'Cerveja Heineken Long Neck 330ml', preco: 12.00, imagem: 'images/cerveja-heineken.png', categoria: 'Cervejas e Bebidas Populares', descricao: 'Uma lager premium de renome mundial, feita com puro malte, lúpulo e água. Seu sabor marcante e equilibrado, com notas frutadas e amargor sutil, é resultado de um processo de fermentação exclusivo. Teor Alcoólico: 5.0%.' },
        { id: 3, nome: 'Cerveja Stella Artois Long Neck 330ml', preco: 13.00, imagem: 'images/cerveja-stella.png', categoria: 'Cervejas e Bebidas Populares', descricao: 'Símbolo de sofisticação e tradição belga, a Stella Artois é uma Premium American Lager de sabor intenso e final suave. Seu lúpulo nobre, Saaz, confere um amargor distinto e agradável. Teor Alcoólico: 5.0%.' },
        { id: 4, nome: 'Cerveja Corona Long Neck 330ml', preco: 14.00, imagem: 'images/cerveja-corona.png', categoria: 'Cervejas e Bebidas Populares', descricao: 'A cerveja mexicana que evoca a sensação de praia e relaxamento. Leve e refrescante, é tradicionalmente servida com uma fatia de limão no gargalo para realçar sua acidez e sabor. Teor Alcoólico: 4.5%.' },
        { id: 5, nome: 'Cerveja Budweiser 600ml', preco: 16.00, imagem: 'images/cerveja-budweiser.png', categoria: 'Cervejas e Bebidas Populares', descricao: 'Conhecida como "The King of Beers", esta American Lager é maturada com lascas de madeira de faia, resultando em um sabor excepcionalmente limpo, fresco e nítido. Teor Alcoólico: 5.0%.' },
        // Vinhos
        { id: 6, nome: 'Vinho Chileno Reservado Concha y Toro 750ml', preco: 40.00, imagem: 'images/vinho-concha-y-toro.png', categoria: 'Vinhos', descricao: 'Um Cabernet Sauvignon do Vale Central do Chile, este vinho é conhecido por sua versatilidade e sabor frutado. Apresenta notas de cereja e pimenta preta, com taninos macios. Ideal para carnes e massas.' },
        { id: 7, nome: 'Vinho Argentino Trapiche Malbec 750ml', preco: 55.00, imagem: 'images/vinho-trapiche.png', categoria: 'Vinhos', descricao: 'Encorpado e rico em sabores de ameixa e cereja preta, este Malbec de Mendoza é um excelente exemplo da uva emblemática da Argentina. Perfeito para acompanhar um bom churrasco.' },
        { id: 8, nome: 'Vinho Português Periquita 750ml', preco: 65.00, imagem: 'images/vinho-periquita.png', categoria: 'Vinhos', descricao: 'Um dos vinhos portugueses mais tradicionais, conhecido por seus taninos macios e aromas de frutas vermelhas e especiarias.' },
        { id: 9, nome: 'Vinho Italiano Lambrusco Rosso 750ml', preco: 75.00, imagem: 'images/vinho-lambrusco.png', categoria: 'Vinhos', descricao: 'Da região da Emília-Romanha, este vinho tinto frisante é levemente adocicado e refrescante. Seus aromas lembram morangos e frambesas. Ótimo como aperitivo.' },
        { id: 10, nome: 'Vinho Miolo Reserva Cabernet Sauvignon 750ml', preco: 85.00, imagem: 'images/vinho-miolo.png', categoria: 'Vinhos', descricao: 'Um excelente exemplar da Campanha Gaúcha, Brasil. Vinho intenso, com aromas de frutas vermelhas, especiarias e um toque de carvalho. Taninos firmes e final persistente.' },
        // Destilados Mais Acessíveis
        { id: 11, nome: 'Vodka Smirnoff 1L', preco: 50.00, imagem: 'images/destilado-smirnoff.png', categoria: 'Destilados Mais Acessíveis', descricao: 'A vodka mais vendida no mundo, triplamente destilada e dez vezes filtrada para uma pureza e suavidade excepcionais, perfeita para coquetéis. Teor Alcoólico: 37.5%.' },
        { id: 12, nome: 'Cachaça 51 Ouro 1L', preco: 55.00, imagem: 'images/destilado-cachaca-51.png', categoria: 'Destilados Mais Acessíveis', descricao: 'Uma versão envelhecida da cachaça mais popular do Brasil, com um sabor mais suave e amadeirado, ideal para drinks e caipirinhas. Teor Alcoólico: 38%.' },
        { id: 13, nome: 'Rum Bacardi Carta Blanca 980ml', preco: 70.00, imagem: 'images/destilado-bacardi.png', categoria: 'Destilados Mais Acessíveis', descricao: 'O rum mais premiado do mundo, com um perfil de sabor suave e aromático. Notas de baunilha e amêndoa e um final seco e nítido o tornam perfeito para coquetéis clássicos. Teor Alcoólico: 38%.' },
        { id: 14, nome: 'Tequila Jose Cuervo Especial 750ml', preco: 120.00, imagem: 'images/destilado-jose-cuervo.png', categoria: 'Destilados Mais Acessíveis', descricao: 'A tequila "Gold" que iniciou a categoria. Feita com agave azul, possui um sabor doce e sutil, com notas de carvalho, baunilha e agave. Ideal para a clássica Margarita. Teor Alcoólico: 38%.' },
        { id: 15, nome: 'Gin Beefeater 750ml', preco: 130.00, imagem: 'images/destilado-beefeater.png', categoria: 'Destilados Mais Acessíveis', descricao: 'Um autêntico London Dry Gin, destilado no coração de Londres. Seu sabor é marcado por fortes notas de zimbro, com um toque cítrico e final picante. Essencial para um Gin Tônica perfeito. Teor Alcoólico: 47%.' },
        // Espumantes e Champagnes
        { id: 16, nome: 'Espumante Chandon Brut 750ml', preco: 150.00, imagem: 'images/espumante-chandon.png', categoria: 'Espumantes e Champagnes', descricao: 'Produzido na Serra Gaúcha, este espumante é fresco e equilibrado, com notas cítricas e florais. Perfeito para celebrações.' },
        { id: 17, nome: 'Espumante Casa Valduga Arte Brut 750ml', preco: 170.00, imagem: 'images/espumante-casa-valduga.png', categoria: 'Espumantes e Champagnes', descricao: 'Elegância e sofisticação definem este espumante do Vale dos Vinhedos. Com aromas de frutas brancas e pão torrado, possui uma cremosidade e acidez vibrantes em boca.' },
        { id: 18, nome: 'Champagne Veuve Clicquot Brut 750ml', preco: 500.00, imagem: 'images/champagne-veuve-clicquot.png', categoria: 'Espumantes e Champagnes', descricao: 'Um ícone de luxo da França. Este champagne é potente e complexo, com notas de brioche e frutas maduras. Sua persistência em boca é notável. Perfeito para ocasiões especiais.' },
        { id: 19, nome: 'Champagne Moët & Chandon Brut 750ml', preco: 650.00, imagem: 'images/champagne-moet-chandon.png', categoria: 'Espumantes e Champagnes', descricao: 'O champagne mais famoso do mundo, sinônimo de celebração. Paladar vibrante com notas de maçã verde e frutas cítricas, e um final elegante e cremoso.' },
        { id: 20, nome: 'Champagne Dom Pérignon Vintage 750ml', preco: 1000.00, imagem: 'images/champagne-dom-perignon.png', categoria: 'Espumantes e Champagnes', descricao: 'Um champagne de prestígio absoluto, produzido apenas em anos de safra excepcional. É uma obra-prima de complexidade, com aromas que evoluem na taça e um final longo e memorável.' },
        // Whiskies
        { id: 21, nome: 'Whisky Red Label 1L', preco: 100.00, imagem: 'images/whisky-red-label.png', categoria: 'Whiskies', descricao: 'O blended Scotch mais vendido globalmente, famoso por seu caráter vibrante e picante. Apresenta notas de canela, pimenta e um toque de fumaça. Ideal para coquetéis. Teor Alcoólico: 40%.' },
        { id: 22, nome: 'Whisky Black Label 1L', preco: 220.00, imagem: 'images/whisky-black-label.png', categoria: 'Whiskies', descricao: 'Um ícone envelhecido por no mínimo 12 anos. Este blend é suave e profundo, com notas de frutas escuras, baunilha e um característico final defumado. Teor Alcoólico: 40%.' },
        { id: 23, nome: 'Whisky Chivas Regal 12 anos 1L', preco: 280.00, imagem: 'images/whisky-chivas-regal.png', categoria: 'Whiskies', descricao: 'Um blended Scotch whisky rico e generoso, conhecido por sua suavidade excepcional. No paladar, destacam-se notas de mel, baunilha e maçã madura. Teor Alcoólico: 40%.' },
        { id: 24, nome: 'Whisky Blue Label 750ml', preco: 950.00, imagem: 'images/whisky-blue-label.png', categoria: 'Whiskies', descricao: 'Uma obra-prima da Johnnie Walker, um blend luxuoso criado a partir dos whiskies mais raros e excepcionais da Escócia. Paladar aveludado com notas de mel, avelã e um final longo e defumado. Teor Alcoólico: 40%.' },
        { id: 25, nome: 'Whisky Royal Salute 21 anos 750ml', preco: 1100.00, imagem: 'images/whisky-royal-salute.png', categoria: 'Whiskies', descricao: 'Criado para celebrar a coroação da Rainha Elizabeth II, este whisky é envelhecido por no mínimo 21 anos, resultando em opulência e sofisticação. Teor Alcoólico: 40%.' },
    ];

    let termoBusca = '';
    let categoriaSelecionada = 'Todos';
    let ordenacaoAtual = 'padrao';

    const vitrineEl = document.querySelector('.vitrine');
    const inputBuscaEl = document.getElementById('input-busca');
    const botoesCategoriaEl = document.getElementById('botoes-categoria');
    const seletorOrdenacaoEl = document.getElementById('seletor-ordenacao');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');

    function renderizarFiltros() {
        const categorias = ['Todos', ...new Set(produtos.map(p => p.categoria))];
        botoesCategoriaEl.innerHTML = '';
        categorias.forEach(categoria => {
            const btn = document.createElement('button');
            btn.innerText = categoria;
            btn.dataset.categoria = categoria;
            if (categoria === categoriaSelecionada) {
                btn.classList.add('ativo');
            }
            botoesCategoriaEl.appendChild(btn);
        });
    }

    function renderizarProdutos() {
        const conteineresAntigos = vitrineEl.querySelectorAll('.categoria-titulo, .produtos-container, .nenhum-produto');
        conteineresAntigos.forEach(el => el.remove());

        let produtosParaExibir = [...produtos];

        switch (ordenacaoAtual) {
            case 'preco-asc':
                produtosParaExibir.sort((a, b) => a.preco - b.preco);
                break;
            case 'preco-desc':
                produtosParaExibir.sort((a, b) => b.preco - a.preco);
                break;
            case 'nome-asc':
                produtosParaExibir.sort((a, b) => a.nome.localeCompare(b.nome));
                break;
        }

        produtosParaExibir = produtosParaExibir.filter(p => {
            const buscaValida = p.nome.toLowerCase().includes(termoBusca.toLowerCase());
            const categoriaValida = categoriaSelecionada === 'Todos' || p.categoria === categoriaSelecionada;
            return buscaValida && categoriaValida;
        });

        if (produtosParaExibir.length === 0) {
            const aviso = document.createElement('p');
            aviso.className = 'nenhum-produto';
            aviso.innerText = 'Nenhum produto encontrado com os filtros selecionados.';
            vitrineEl.appendChild(aviso);
            return;
        }

        const categoriasVisiveis = [...new Set(produtosParaExibir.map(p => p.categoria))];
        categoriasVisiveis.forEach(categoria => {
            const tituloCategoria = document.createElement('h2');
            tituloCategoria.className = 'categoria-titulo';
            tituloCategoria.innerText = categoria;
            vitrineEl.appendChild(tituloCategoria);

            const produtosContainer = document.createElement('div');
            produtosContainer.className = 'produtos-container';
            vitrineEl.appendChild(produtosContainer);

            const produtosDaCategoria = produtosParaExibir.filter(p => p.categoria === categoria);
            produtosDaCategoria.forEach(produto => {
                const card = document.createElement('div');
                card.className = 'produto-card';
                card.innerHTML = `
                    <a href="produto.html?id=${produto.id}" class="produto-card-link">
                        <img src="${produto.imagem}" alt="${produto.nome}">
                        <h3>${produto.nome}</h3>
                        <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
                    </a>
                    <div class="card-botoes">
                        <button class="btn-adicionar" data-id="${produto.id}">Adicionar</button>
                        <button class="btn-quick-view" data-id="${produto.id}" title="Visualização Rápida"><i class="fas fa-eye"></i></button>
                    </div>
                `;
                produtosContainer.appendChild(card);
            });
        });
    }

    function abrirModal(produtoId) {
        const produto = produtos.find(p => p.id === produtoId);
        if (!produto) return;

        modalContent.innerHTML = `
            <button id="modal-close-btn" class="modal-close-btn">&times;</button>
            <div class="produto-imagem-grande">
                <img src="${produto.imagem}" alt="${produto.nome}">
            </div>
            <div class="produto-info">
                <span class="categoria">${produto.categoria}</span>
                <h1>${produto.nome}</h1>
                <p class="descricao">${produto.descricao.substring(0, 150)}...</p>
                <div class="seletor-quantidade">
                    <button id="modal-btn-diminuir-qtd">-</button>
                    <input type="number" id="modal-input-qtd" value="1" min="1">
                    <button id="modal-btn-aumentar-qtd">+</button>
                </div>
                <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
                <button id="modal-btn-adicionar">Adicionar ao Carrinho</button>
                <a href="produto.html?id=${produto.id}" style="text-align: center; margin-top: 10px; display: block;">Ver página completa do produto</a>
            </div>
        `;
        modalOverlay.style.display = 'flex';

        document.getElementById('modal-close-btn').addEventListener('click', fecharModal);
        const inputQtd = document.getElementById('modal-input-qtd');
        document.getElementById('modal-btn-aumentar-qtd').addEventListener('click', () => {
            inputQtd.value = parseInt(inputQtd.value) + 1;
        });
        document.getElementById('modal-btn-diminuir-qtd').addEventListener('click', () => {
            if (inputQtd.value > 1) {
                inputQtd.value = parseInt(inputQtd.value) - 1;
            }
        });
        document.getElementById('modal-btn-adicionar').addEventListener('click', () => {
            adicionarAoCarrinho(produto, parseInt(inputQtd.value));
            fecharModal();
        });
    }

    function fecharModal() {
        modalOverlay.style.display = 'none';
    }

    seletorOrdenacaoEl.addEventListener('change', (e) => {
        ordenacaoAtual = e.target.value;
        renderizarProdutos();
    });

    vitrineEl.addEventListener('click', (event) => {
        const target = event.target;
        const btnAdd = target.closest('.btn-adicionar');
        const btnQuickView = target.closest('.btn-quick-view');

        if (btnAdd) {
            const produtoId = parseInt(btnAdd.dataset.id);
            const produto = produtos.find(p => p.id === produtoId);
            if (produto) {
                adicionarAoCarrinho(produto, 1);
            }
        } else if (btnQuickView) {
            abrirModal(parseInt(btnQuickView.dataset.id));
        }
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            fecharModal();
        }
    });

    inputBuscaEl.addEventListener('input', (e) => {
        termoBusca = e.target.value;
        renderizarProdutos();
    });

    botoesCategoriaEl.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            categoriaSelecionada = e.target.dataset.categoria;
            botoesCategoriaEl.querySelector('.ativo')?.classList.remove('ativo');
            e.target.classList.add('ativo');
            renderizarProdutos();
        }
    });

    localStorage.setItem('catalogoProdutos', JSON.stringify(produtos));
    renderizarFiltros();
    renderizarProdutos();
});
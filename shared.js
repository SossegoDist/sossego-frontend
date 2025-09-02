// Lógica que será compartilhada entre todas as páginas

// --- FUNÇÕES DE TOAST (NOTIFICAÇÃO) ---
function mostrarToast(mensagem, tipo = 'sucesso') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.innerText = mensagem;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3500);
}

// --- LÓGICA DO CARRINHO ---
let carrinho = [];

function salvarCarrinhoNoLocalStorage() {
    localStorage.setItem('carrinhoDistribuidora', JSON.stringify(carrinho));
}

function carregarCarrinhoDoLocalStorage() {
    const carrinhoSalvo = localStorage.getItem('carrinhoDistribuidora');
    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
    }
}

function adicionarAoCarrinho(produto, quantidade = 1) {
    const itemExistente = carrinho.find(item => item.id === produto.id);
    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({ ...produto,
            quantidade: quantidade
        });
    }
    salvarCarrinhoNoLocalStorage();
    renderizarCarrinho();
    mostrarToast(`${quantidade}x ${produto.nome} adicionado(s)!`);
}

function limparCarrinho() {
    carrinho = [];
    salvarCarrinhoNoLocalStorage();
    renderizarCarrinho();
}

window.removerDoCarrinho = function(produtoId) {
    carrinho = carrinho.filter(item => item.id !== produtoId);
    salvarCarrinhoNoLocalStorage();
    renderizarCarrinho();
}

window.incrementarQuantidade = function(produtoId) {
    const item = carrinho.find(item => item.id === produtoId);
    if (item) {
        item.quantidade++;
        salvarCarrinhoNoLocalStorage();
        renderizarCarrinho();
    }
}

window.decrementarQuantidade = function(produtoId) {
    const item = carrinho.find(item => item.id === produtoId);
    if (item) {
        if (item.quantidade > 1) {
            item.quantidade--;
            salvarCarrinhoNoLocalStorage();
            renderizarCarrinho();
        } else {
            removerDoCarrinho(produtoId);
        }
    }
}

function renderizarCarrinho() {
    const carrinhoItensEl = document.getElementById('carrinho-itens');
    const totalCarrinhoEl = document.getElementById('total-carrinho');

    if (!carrinhoItensEl || !totalCarrinhoEl) return;

    let total = 0;
    if (carrinho.length === 0) {
        carrinhoItensEl.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        carrinhoItensEl.innerHTML = '';
        carrinho.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'carrinho-item';
            itemEl.innerHTML = `
                <div class="item-info">
                    <span>${item.nome}</span>
                    <span>R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
                </div>
                <div class="item-controle">
                    <button class="btn-qtd" onclick="decrementarQuantidade(${item.id})">-</button>
                    <span>${item.quantidade}</span>
                    <button class="btn-qtd" onclick="incrementarQuantidade(${item.id})">+</button>
                    <button class="btn-remover-item" onclick="removerDoCarrinho(${item.id})"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
            carrinhoItensEl.appendChild(itemEl);
            total += item.preco * item.quantidade;
        });
    }
    totalCarrinhoEl.innerText = `R$ ${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const btnLimparCarrinho = document.getElementById('btn-limpar-carrinho');
    const btnMinimizarCarrinho = document.getElementById('btn-minimizar-carrinho');
    const carrinhoEl = document.querySelector('.carrinho');
    const btnFinalizarCompra = document.getElementById('btn-finalizar-compra');

    if (btnLimparCarrinho) {
        btnLimparCarrinho.addEventListener('click', limparCarrinho);
    }

    if (btnMinimizarCarrinho && carrinhoEl) {
        btnMinimizarCarrinho.addEventListener('click', () => {
            carrinhoEl.classList.toggle('minimizado');
            const icone = btnMinimizarCarrinho.querySelector('i');
            if (carrinhoEl.classList.contains('minimizado')) {
                icone.classList.remove('fa-minus');
                icone.classList.add('fa-window-maximize');
            } else {
                icone.classList.remove('fa-window-maximize');
                icone.classList.add('fa-minus');
            }
        });
    }

    if (btnFinalizarCompra) {
        btnFinalizarCompra.addEventListener('click', () => {
            if (carrinho.length === 0) {
                mostrarToast('Seu carrinho está vazio!', 'erro');
                return;
            }
            window.location.href = 'checkout.html';
        });
    }

    carregarCarrinhoDoLocalStorage();
    renderizarCarrinho();
});
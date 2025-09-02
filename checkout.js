document.addEventListener('DOMContentLoaded', () => {
    const listaItensResumo = document.getElementById('lista-itens-resumo');
    const totalResumoEl = document.getElementById('total-resumo');
    const btnPagar = document.getElementById('btn-pagar');
    let valorTotal = 0;

    // --- IMPORTANTE: SUBSTITUA PELOS SEUS DADOS DE TESTE ---
    const MERCURYO_PARTNER_ID = 'SEU_PARTNER_ID_AQUI';
    const SEU_ENDERECO_DE_CARTEIRA = 'SEU_ENDERECO_DE_CARTEIRA_CRIPTO_AQUI';
    const CRIPTO_A_SER_COMPRADA = 'USDT'; // Ex: 'USDT', 'BTC', 'ETH'

    // --- IMPORTANTE: APÓS PUBLICAR O BACK-END NO RENDER, COLOQUE A URL AQUI ---
    // Exemplo: 'https://seu-backend.onrender.com'
    const BACKEND_URL = 'http://localhost:3001';

    function carregarResumo() {
        const carrinho = JSON.parse(localStorage.getItem('carrinhoDistribuidora')) || [];

        if (carrinho.length === 0) {
            listaItensResumo.innerHTML = '<p>Seu carrinho está vazio. Volte para a página inicial para comprar.</p>';
            btnPagar.disabled = true;
            btnPagar.style.backgroundColor = '#aaa';
            return;
        }

        listaItensResumo.innerHTML = '';
        carrinho.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'item-resumo';
            itemEl.innerHTML = `
                <span>${item.nome} (x${item.quantidade})</span>
                <strong>R$ ${(item.preco * item.quantidade).toFixed(2)}</strong>
            `;
            listaItensResumo.appendChild(itemEl);
            valorTotal += item.preco * item.quantidade;
        });

        totalResumoEl.innerText = `R$ ${valorTotal.toFixed(2)}`;
    }

    async function iniciarPagamentoMercuryo() {
        if (MERCURYO_PARTNER_ID.includes('SEU_PARTNER_ID')) {
            alert('Por favor, configure suas credenciais da Mercuryo no arquivo checkout.js');
            return;
        }
        btnPagar.disabled = true;
        btnPagar.innerText = 'Gerando pagamento...';

        const dadosTransacao = {
            partner_id: MERCURYO_PARTNER_ID,
            type: 'buy',
            fiat_currency: 'BRL',
            fiat_amount: valorTotal.toFixed(2),
            currency: CRIPTO_A_SER_COMPRADA,
            address: SEU_ENDERECO_DE_CARTEIRA,
        };

        try {
            const respostaBackend = await fetch(`${BACKEND_URL}/gerar-assinatura-mercuryo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosTransacao)
            });

            if (!respostaBackend.ok) {
                throw new Error('Falha ao se comunicar com o servidor back-end.');
            }
            const {
                signature
            } = await respostaBackend.json();
            if (!signature) {
                throw new Error('Não foi possível obter a assinatura do servidor.');
            }

            const widgetConfig = { ...dadosTransacao,
                signature
            };

            mercuryo.run(widgetConfig, (data) => {
                console.log('Evento do widget Mercuryo:', data);
                if (data.status === 'paid' || data.status === 'success' || data.status === 'succeeded') {
                    alert('Pagamento concluído com sucesso!');
                    localStorage.removeItem('carrinhoDistribuidora');
                    window.location.href = 'index.html';
                }
                if (data.event === 'close') {
                    btnPagar.disabled = false;
                    btnPagar.innerText = 'Pagar com Mercuryo';
                }
            });

        } catch (error) {
            console.error('Erro ao iniciar pagamento:', error);
            alert('Ocorreu um erro ao iniciar o pagamento. Verifique o console para mais detalhes.');
            btnPagar.disabled = false;
            btnPagar.innerText = 'Pagar com Mercuryo';
        }
    }

    btnPagar.addEventListener('click', iniciarPagamentoMercuryo);
    carregarResumo();
});
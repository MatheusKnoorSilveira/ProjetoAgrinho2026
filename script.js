/* ==========================================================================
   QUIZ INTERATIVO: AGRO FORTE, FUTURO SUSTENTÁVEL (CORRIGIDO)
   ========================================================================== */

// Perguntas do Quiz
const perguntasQuiz = [
    {
        pergunta: "1. Qual técnica paranaense evita a erosão mantendo a palha da colheita anterior no solo?",
        opcoes: ["Arado convencional", "Sistema de Plantio Direto", "Queimada controlada", "Cultivo hidropônico"],
        correta: 1, // Índice da resposta correta (começa em 0)
        explicacao: "O Sistema de Plantio Direto é uma referência do Paraná para o mundo, protegendo o solo e retendo água!"
    },
    {
        pergunta: "2. Como os drones ajudam a reduzir o impacto ambiental na agricultura?",
        opcoes: [
            "Substituindo os tratores nas colheitas pesadas",
            "Identificando pragas precocemente para usar menos defensivos",
            "Modificando geneticamente as sementes em pleno voo",
            "Espantando pássaros da plantação"
        ],
        correta: 1,
        explicacao: "Com imagens de alta precisão, os drones mostram o local exato da praga, evitando aplicar produtos onde não precisa."
    },
    {
        pergunta: "3. O que significa a sigla ILPF na agricultura sustentável?",
        opcoes: [
            "Indústria de Lavoura Pronta e Forte",
            "Irrigação de Lavouras por Meio de Poços Fontes",
            "Integração Lavoura-Pecuária-Floresta",
            "Instituto de Logística de Produtos Frescos"
        ],
        correta: 2,
        explicacao: "A Integração Lavoura-Pecuária-Floresta combina árvores, pasto e plantações, otimizando a terra e capturando carbono!"
    }
];

let indicePerguntaAtual = 0;
let pontuacao = 0;

// Aguarda o HTML carregar completamente
document.addEventListener("DOMContentLoaded", () => {
    const secaoFuturo = document.getElementById("futuro");

    // Cria a estrutura do Quiz via JS
    const containerQuiz = document.createElement("div");
    containerQuiz.id = "quiz-container";
    containerQuiz.style.cssText = `
        background: var(--light-bg);
        max-width: 650px;
        margin: 40px auto 0 auto;
        padding: 30px;
        border-top: 6px solid var(--wwf-accent);
        text-align: left;
        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    `;

    secaoFuturo.appendChild(containerQuiz);
    mostrarPergunta(containerQuiz);
});

// Função para renderizar a pergunta atual
function mostrarPergunta(container) {
    container.innerHTML = ""; // Limpa o container

    if (indicePerguntaAtual < perguntasQuiz.length) {
        const dadosPergunta = perguntasQuiz[indicePerguntaAtual];

        // Título da Pergunta
        const titulo = document.createElement("h3");
        titulo.textContent = dadosPergunta.pergunta;
        titulo.style.cssText = "color: var(--wwf-dark); margin-bottom: 20px; font-weight: 800;";
        container.appendChild(titulo);

        // Container das Opções
        const listaOpcoes = document.createElement("div");
        listaOpcoes.style.cssText = "display: flex; flex-direction: column; gap: 10px;";

        // Criamos uma lista vazia para armazenar as referências dos botões
        const botoesAlternativas = [];

        dadosPergunta.opcoes.forEach((opcao, index) => {
            const botao = document.createElement("button");
            botao.textContent = opcao; // CORRIGIDO: de 'opçao' para 'opcao'
            botao.style.cssText = `
                background: #ffffff;
                border: 2px solid #e0e0e0;
                padding: 12px 20px;
                text-align: left;
                cursor: pointer;
                font-size: 1rem;
                font-weight: 600;
                transition: all 0.2s ease;
            `;

            // Efeito de hover no botão
            botao.onmouseover = () => { if (!botao.disabled) botao.style.background = "#f0f0f0"; };
            botao.onmouseout = () => { if (!botao.disabled) botao.style.background = "#ffffff"; };

            // Evento de clique na resposta
            botao.addEventListener("click", () => verificarResposta(index, botoesAlternativas, container));

            listaOpcoes.appendChild(botao);
            botoesAlternativas.push(botao); // Guarda o botão na nossa lista de controle
        });

        container.appendChild(listaOpcoes);

    } else {
        // Fim do Quiz - Mostra Resultado
        container.innerHTML = `
            <h3 style="color: var(--wwf-dark); font-weight: 800; margin-bottom: 15px;">🌱 Quiz Concluído!</h3>
            <p style="font-size: 1.2rem; margin-bottom: 15px;">Você acertou <strong>${pontuacao}</strong> de <strong>${perguntasQuiz.length}</strong> perguntas.</p>
            <p style="color: var(--wwf-green); font-weight: 700;">${pontuacao === perguntasQuiz.length
                ? "Incrível! Você é um especialista no Agro Sustentável do Paraná! 🏆"
                : "Muito bom! Continue estudando para proteger nosso futuro. 🧑‍🌾"
            }</p>
            <button onclick="reiniciarQuiz()" style="margin-top: 20px; background: var(--wwf-dark); color: white; border: none; padding: 10px 20px; cursor: pointer; font-weight: 700; text-transform: uppercase;">Jogar Novamente</button>
        `;
    }
}

// Função para validar a resposta do usuário
function verificarResposta(indiceSelecionado, botoes, container) {
    const perguntaAtual = perguntasQuiz[indicePerguntaAtual];

    // Desabilita todos os botões para o usuário não clicar de novo após responder
    botoes.forEach(btn => btn.disabled = true);

    if (indiceSelecionado === perguntaAtual.correta) {
        botoes[indiceSelecionado].style.background = "#d4edda";
        botoes[indiceSelecionado].style.borderColor = "var(--wwf-green)";
        pontuacao++;
    } else {
        botoes[indiceSelecionado].style.background = "#f8d7da";
        botoes[indiceSelecionado].style.borderColor = "#dc3545";
        // Mostra a correta em verde para o usuário aprender
        botoes[perguntaAtual.correta].style.background = "#d4edda";
        botoes[perguntaAtual.correta].style.borderColor = "var(--wwf-green)";
    }

    // Explicação pedagógica da resposta
    const textoExplicacao = document.createElement("p");
    textoExplicacao.innerHTML = `<strong>Explicação:</strong> ${perguntaAtual.explicacao}`;
    textoExplicacao.style.cssText = "margin-top: 15px; font-size: 0.95rem; color: #555; background: #fff; padding: 10px; border-left: 4px solid var(--wwf-dark);";
    container.appendChild(textoExplicacao);

    // Botão de Avançar
    const btnAvancar = document.createElement("button");
    btnAvancar.textContent = "Próxima Pergunta ➡️";
    btnAvancar.style.cssText = "margin-top: 15px; background: var(--wwf-green); color: white; border: none; padding: 10px 20px; cursor: pointer; font-weight: 700; float: right;";
    btnAvancar.onclick = () => {
        indicePerguntaAtual++;
        mostrarPergunta(container);
    };
    container.appendChild(btnAvancar);
}

// Função para reiniciar o jogo
window.reiniciarQuiz = function () {
    indicePerguntaAtual = 0;
    pontuacao = 0;
    const container = document.getElementById("quiz-container");
    mostrarPergunta(container);
};
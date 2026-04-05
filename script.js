// ==========================================
// 1. INICIALIZAÇÃO DO SWIPER (CARROSSEL)
// ==========================================
const swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay: { delay: 2500, disableOnInteraction: false },
    slidesPerView: 'auto',
    spaceBetween: 15,
});

// ==========================================
// 2. ELEMENTOS GLOBAIS
// ==========================================
const btnAssistir = document.querySelector('.btn-assistir');
const paginaVideo = document.getElementById('pagina-video');
const videoIframe = document.getElementById('meuVideo');
const modalFotos = document.getElementById("modal-momento");
const modalMsg = document.getElementById('modal-mensagem');
const btnLista = document.querySelector('.btn-lista');

// ==========================================
// 3. LÓGICA DO VÍDEO (ABRIR E FECHAR)
// ==========================================
if (btnAssistir) {
    btnAssistir.addEventListener('click', function() {
        const secoesParaEsconder = ['.banner', '.momentos', '.elenco-container', '.episodios-container', '.detalhes-tecnicos', '.rodape', '.cabecalho'];
        secoesParaEsconder.forEach(s => {
            const el = document.querySelector(s);
            if(el) el.style.display = 'none';
        });

        paginaVideo.style.display = 'flex';
        window.scrollTo(0, 0);

        let url = videoIframe.src;
        if (!url.includes('autoplay=1')) {
            videoIframe.src = url.includes('?') ? `${url}&autoplay=1` : `${url}?autoplay=1`;
        }
    });
}

function fecharVideo() {
    paginaVideo.style.display = 'none';
    videoIframe.src = "https://www.youtube.com/embed/HJXtL4OrN-o?rel=0&enablejsapi=1";
    restaurarHome();
}

// ==========================================
// 4. MODO CONFORTO (SAFE PLACE)
// ==========================================
function abrirModoConforto() {
    const secoesHome = ['.banner', '.momentos', '.elenco-container', '.episodios-container', '.detalhes-tecnicos', '.rodape', '.cabecalho'];
    secoesHome.forEach(s => {
        const el = document.querySelector(s);
        if(el) el.style.display = 'none';
    });

    const telaConforto = document.getElementById('modo-conforto');
    if(telaConforto) {
        telaConforto.style.display = 'flex';
        window.scrollTo(0, 0);
    }
}

function fecharModoConforto() {
    document.getElementById('modo-conforto').style.display = 'none';
    restaurarHome();
}

// ==========================================
// 5. MODAIS (FOTOS E MENSAGENS LINDAS)
// ==========================================

// Abrir Modal de Fotos
document.querySelectorAll('.momento').forEach(img => {
    img.onclick = function() {
        modalFotos.style.display = "flex";
        document.getElementById("img-modal").src = this.src;
        document.getElementById("titulo-modal").innerText = this.alt;
        document.getElementById("descricao-modal").innerText = ""; 
    };
});

// Abrir Modal de Mensagem Linda
function exibirMensagem(texto) {
    const textoMsg = document.getElementById('texto-mensagem');
    textoMsg.innerText = texto;
    modalMsg.style.display = 'flex';
}

// Função Única para fechar o Card de Mensagem (Chamada pelo X)
function fecharCardMensagem() {
    const modalMsg = document.getElementById('modal-mensagem');
    if (modalMsg) {
        modalMsg.style.display = 'none';
    }
}

// FECHAMENTO GLOBAL: Trata o clique fora das caixas e os botões X
window.addEventListener('click', function(e) {
    // Se clicar no fundo do modal de fotos
    if (e.target === modalFotos) {
        modalFotos.style.display = "none";
    }
    // Se clicar no fundo do modal de mensagem
    if (e.target === modalMsg) {
        modalMsg.style.display = "none";
    }
    // Se clicar no X do modal de fotos
    if (e.target.classList.contains('fechar-modal')) {
        const modalPai = e.target.closest('.modal');
        if (modalPai) modalPai.style.display = 'none';
    }
});

// ==========================================
// 6. FUNÇÕES AUXILIARES E ESTÉTICAS
// ==========================================
function restaurarHome() {
    const secoesHome = ['.cabecalho', '.banner', '.momentos', '.elenco-container', '.episodios-container', '.detalhes-tecnicos', '.rodape'];
    secoesHome.forEach(seletor => {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            if (seletor === '.cabecalho' || seletor === '.banner') {
                elemento.style.display = 'flex';
            } else if (seletor === '.detalhes-tecnicos') {
                elemento.style.display = 'grid';
            } else {
                elemento.style.display = 'block';
            }
        }
    });
    window.scrollTo(0, 0);
}

function entrarNoSite(nome) {
    const somTudum = new Audio('https://www.myinstants.com/media/sounds/netflix-intro.mp3');
    somTudum.volume = 0.4;
    somTudum.play().catch(() => {});

    // 1. Esconde a tela de perfis
    const telaPerfis = document.getElementById('tela-perfis');
    telaPerfis.style.opacity = '0';
    
    setTimeout(() => { 
        telaPerfis.style.display = 'none'; 
        
        // 2. MOSTRA o conteúdo principal
        const mainContent = document.getElementById('conteudo-principal');
        mainContent.style.display = 'block';
        
        // Pequeno delay para o efeito de fade-in ficar suave
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 50);

    }, 500);
}

// Contador
const dataInicio = new Date("2025-04-05T00:00:00").getTime();
setInterval(() => {
    const agora = new Date().getTime();
    const diferenca = agora - dataInicio;
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
    const elementoContador = document.querySelector('.detalhes span'); 
    if (elementoContador) {
        elementoContador.innerHTML = `05 DE ABRIL • 1 TEMPORADA • ${dias}d ${horas}h ${minutos}m ${segundos}s`;
    }
}, 1000);

// Minha Lista
if (btnLista) {
    btnLista.onclick = () => {
        btnLista.innerHTML = '<i class="fa-solid fa-check"></i> Na Lista do Luan';
        btnLista.style.background = "#46d369";
        btnLista.style.color = "#fff";
        setTimeout(() => { alert("✨ Item adicionado aos favoritos!"); }, 300);
    };
}
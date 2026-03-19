// 1. Inicialização do Swiper
const swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay: { delay: 2500, disableOnInteraction: false },
    slidesPerView: 'auto',
    spaceBetween: 15,
});

// 2. Elementos Globais
const btnAssistir = document.querySelector('.btn-assistir');
const paginaVideo = document.getElementById('pagina-video');
const videoIframe = document.getElementById('meuVideo');
const modal = document.getElementById("modal-momento");
const btnLista = document.querySelector('.btn-lista');

// 3. Abrir Vídeo (Simulando Página Separada)
if (btnAssistir) {
    btnAssistir.addEventListener('click', function() {
        // Esconde as outras seções do site
        document.querySelector('.banner').style.display = 'none';
        document.querySelector('.momentos').style.display = 'none';
        document.querySelector('.elenco-container').style.display = 'none';
        document.querySelector('.episodios-container').style.display = 'none';
        document.querySelector('.detalhes-tecnicos').style.display = 'none';
        document.querySelector('.rodape').style.display = 'none';
        document.querySelector('.cabecalho').style.display = 'none';

        // Mostra a tela do vídeo ocupando a tela toda
        paginaVideo.style.display = 'flex';
        window.scrollTo(0, 0);

        // Ativa o som
        let url = videoIframe.src;
        if (!url.includes('autoplay=1')) {
            videoIframe.src = url.includes('?') ? `${url}&autoplay=1` : `${url}?autoplay=1`;
        }
    });
}

// 4. Fechar Vídeo (Restaurando a Home por completo)
function fecharVideo() {
    // 1. Esconde a tela de vídeo e reseta o player para parar o som
    const paginaVideo = document.getElementById('pagina-video');
    const videoIframe = document.getElementById('meuVideo');
    
    paginaVideo.style.display = 'none';
    videoIframe.src = "https://www.youtube.com/embed/HJXtL4OrN-o?rel=0&enablejsapi=1";

    // 2. MOSTRA todas as seções que foram escondidas ao clicar em assistir
    const secoesParaMostrar = [
        '.cabecalho',
        '.banner',
        '.momentos',
        '.elenco-container',
        '.episodios-container',
        '.detalhes-tecnicos',
        '.rodape'
    ];

    secoesParaMostrar.forEach(seletor => {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            // Se for o header ou banner, costuma ser flex, o resto block ou grid
            if (seletor === '.cabecalho' || seletor === '.banner') {
                elemento.style.display = 'flex';
            } else if (seletor === '.detalhes-tecnicos') {
                elemento.style.display = 'grid';
            } else {
                elemento.style.display = 'block';
            }
        }
    });

    // 3. Garante que o scroll volte para o topo da home
    window.scrollTo(0, 0);
}

// 5. Entrar no Site (Com o som TUDUM)
function entrarNoSite(nome) {
    // Som clássico da Netflix
    const somTudum = new Audio('https://www.myinstants.com/media/sounds/netflix-intro.mp3');
    somTudum.volume = 0.4;
    somTudum.play().catch(() => console.log("Áudio bloqueado até interação"));

    const telaPerfis = document.getElementById('tela-perfis');
    
    // Animação de zoom no avatar antes de sumir
    const avatarClicado = event.currentTarget.querySelector('.avatar');
    if(avatarClicado) avatarClicado.style.transform = "scale(1.2)";

    setTimeout(() => {
        telaPerfis.style.opacity = '0';
        setTimeout(() => { 
            telaPerfis.style.display = 'none'; 
        }, 500);
    }, 300);
}

// 6. Contador de Tempo
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

// 7. Modal de Fotos (Momentos)
document.querySelectorAll('.momento').forEach(img => {
    img.onclick = function() {
        modal.style.display = "flex";
        document.getElementById("img-modal").src = this.src;
        document.getElementById("titulo-modal").innerText = this.alt;
        document.getElementById("descricao-modal").innerText = "Um dos nossos capítulos favoritos.";
    };
});

// Fechar Modal ao clicar fora ou no X
window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; }
const fecharBtn = document.querySelector(".fechar-modal");
if(fecharBtn) {
    fecharBtn.onclick = () => modal.style.display = "none";
}

// 8. Funcionalidade da Minha Lista
if (btnLista) {
    btnLista.onclick = () => {
        btnLista.innerHTML = '<i class="fa-solid fa-check"></i> Na Lista do Luan';
        btnLista.style.background = "#46d369";
        btnLista.style.color = "#fff";
        
        setTimeout(() => {
            alert("✨ Item adicionado aos favoritos! Próximos capítulos: Viagens, jantares e muito mais amor!");
        }, 300);
    };
}
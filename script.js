// 1. Inicialização do Swiper
const swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay: { delay: 2500, disableOnInteraction: false },
    slidesPerView: 'auto',
    spaceBetween: 15,
});

// 2. Elementos
const btnAssistir = document.querySelector('.btn-assistir');
const paginaVideo = document.getElementById('pagina-video');
const videoIframe = document.getElementById('meuVideo');
const modal = document.getElementById("modal-momento");

// 3. Abrir Vídeo (Centralizado)
if (btnAssistir) {
    btnAssistir.onclick = function() {
        paginaVideo.style.display = 'flex'; // Importante para o CSS de centralização
        window.scrollTo(0, 0);
    };
}

// 4. Fechar Vídeo
function fecharVideo() {
    paginaVideo.style.display = 'none';
    // Para o som do YouTube
    const urlOriginal = videoIframe.src;
    videoIframe.src = ""; 
    videoIframe.src = urlOriginal;
}

// 5. Entrar no Site
function entrarNoSite(nome) {
    const telaPerfis = document.getElementById('tela-perfis');
    if (telaPerfis) {
        telaPerfis.style.opacity = '0';
        setTimeout(() => { telaPerfis.style.display = 'none'; }, 500);
    }
}

// 6. Contador
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

// 7. Modal de Fotos
document.querySelectorAll('.momento').forEach(img => {
    img.onclick = function() {
        modal.style.display = "flex";
        document.getElementById("img-modal").src = this.src;
        document.getElementById("titulo-modal").innerText = this.alt;
        document.getElementById("descricao-modal").innerText = "Um dos nossos capítulos favoritos.";
    };
});

window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; }
if(document.querySelector(".fechar-modal")) {
    document.querySelector(".fechar-modal").onclick = () => modal.style.display = "none";
}
class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        const horaAtual = new Date().getHours();
        let saudacao;
        if (horaAtual >= 5 && horaAtual < 12) {
            saudacao = "bom dia";
        } else if (horaAtual >= 12 && horaAtual < 18) {
            saudacao = "boa tarde";
        } else {
            saudacao = "boa noite";
        }
        const mensagemTexto = `Olá, Viviana, ${saudacao}. Espero que esteja bem. Estou procurando por acompanhamento psicológico e gostaria de agendar uma sessão de acolhimento. Qual é a melhor forma de proceder?`;

        const mensagemCodificada = encodeURIComponent(mensagemTexto);
        this.innerHTML = `
        <header>
            <nav>
                <a href="index.html" class="brand">
                    <img src="cerebro_vivian_alves.svg" alt="Logo Cérebro Florescendo" class="logo-img">
                    <div>
                        <span class="logo-text">Vivian Alves</span>
                        <span class="logo-sub">Psicóloga Clínica</span>
                    </div>
                </a>

                <ul>
                    <li><a href="index.html">Início</a></li>
                    <li><a href="sobre.html">Sobre</a></li>
                    <li><a href="index.html#servicos">Atendimentos</a></li>
                    <li>
                        <a href="https://wa.me/559888788357?text=${mensagemCodificada}" 
                           class="btn-contato"
                           target="_blank"
                           rel="noopener noreferrer">
                           Agendar Consulta
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
        `;

        setTimeout(() => {
            this.querySelectorAll('nav a[href^="#"]').forEach(link => {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if(href.includes('#')) {
                        e.preventDefault();
                        const targetId = href.split('#')[1];
                        const targetElement = document.getElementById(targetId);
                        if(targetElement) {
                            const headerHeight = document.querySelector('header').offsetHeight;
                            const targetPosition = targetElement.offsetTop - headerHeight - 20;
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });
        }, 100);
    }
}

customElements.define('site-header', HeaderComponent);
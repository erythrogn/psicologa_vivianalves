class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const horaAtual = new Date().getHours();
        let saudacao;
        
        if (horaAtual >= 5 && horaAtual < 12) {
            saudacao = "bom dia";
        } else if (horaAtual >= 12 && horaAtual < 18) {
            saudacao = "boa tarde";
        } else {
            saudacao = "boa noite";
        }

        const mensagemTexto = `Olá! ${saudacao} cheguei até você pelo seu site.
Estou buscando atendimento psicológico no momento e gostaria de saber como funciona o processo, valores e disponibilidade.
Fico no aguardo. Obrigada(o).?`;
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

                <button class="mobile-btn" aria-label="Abrir menu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </button>

                <ul class="nav-list">
                    <li><a href="index.html">Início</a></li>
                    <li><a href="sobre.html">Sobre</a></li>
                    <li><a href="depoimentos.html">Depoimentos</a></li>

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

        // 3. Inicializa os Eventos
        this.initEvents();
    }

    initEvents() {
        const mobileBtn = this.querySelector('.mobile-btn');
        const navList = this.querySelector('.nav-list');
        const navLinks = this.querySelectorAll('.nav-list a');

        // Toggle Menu Mobile
        mobileBtn.addEventListener('click', () => {
            navList.classList.toggle('active');
            mobileBtn.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link (UX)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                mobileBtn.classList.remove('active');
            });
        });

        this.querySelectorAll('a[href^="#"], a[href*="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                const targetId = href.includes('#') ? href.split('#')[1] : null;
                
                if (targetId) {
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        const headerHeight = this.querySelector('header').offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight - 20;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

customElements.define('site-header', HeaderComponent);
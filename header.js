class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.isMobileMenuOpen = false;
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

                <button class="mobile-btn" aria-label="Abrir menu" aria-expanded="false">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </button>

                <ul class="nav-list">
                    <li><a href="index.html">Início</a></li>
                    <li><a href="sobre.html">Sobre</a></li>
                    <li><a href="depoimentos.html">Depoimentos</a></li>
                    <li class="btn-contato-wrapper">
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

        this.initEvents();
    }

    initEvents() {
        const mobileBtn = this.querySelector('.mobile-btn');
        const navList = this.querySelector('.nav-list');
        const navLinks = this.querySelectorAll('.nav-list a');

        const toggleMenu = () => {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
            navList.classList.toggle('active');
            mobileBtn.classList.toggle('active');
            mobileBtn.setAttribute('aria-expanded', this.isMobileMenuOpen);
            document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
        };

        mobileBtn.addEventListener('click', toggleMenu);
        
        mobileBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMobileMenuOpen) {
                    toggleMenu();
                }
            });
            
            link.addEventListener('mouseenter', () => {
                if (!this.isMobileMenuOpen) {
                    link.style.transform = 'translateY(-2px)';
                }
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = '';
            });
        });

        document.addEventListener('click', (e) => {
            if (this.isMobileMenuOpen && 
                !navList.contains(e.target) && 
                !mobileBtn.contains(e.target)) {
                toggleMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileMenuOpen) {
                toggleMenu();
            }
        });

        this.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href === '#') return;
                
                const targetId = href.replace('#', '');
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    if (this.isMobileMenuOpen) {
                        toggleMenu();
                    }
                    
                    const headerHeight = this.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

customElements.define('site-header', HeaderComponent);
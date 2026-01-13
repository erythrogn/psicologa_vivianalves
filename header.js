class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.isMobileMenuOpen = false;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleEscapeKey = this.handleEscapeKey.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    connectedCallback() {
        const horaAtual = new Date().getHours();
        let saudacao = (horaAtual >= 5 && horaAtual < 12) ? "bom dia" : 
                       (horaAtual >= 12 && horaAtual < 18) ? "boa tarde" : "boa noite";

        const mensagemTexto = `Olá! ${saudacao} cheguei até você pelo seu site. Estou buscando atendimento psicológico no momento e gostaria de saber como funciona o processo, valores e disponibilidade. Fico no aguardo. Obrigada(o).`;
        const mensagemCodificada = encodeURIComponent(mensagemTexto);

        const currentTheme = localStorage.getItem('theme') || 'light';
        const themeIcon = currentTheme === 'dark' ? '☀️' : '🌙';

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

                <div class="header-actions">
                    <button class="mobile-btn" aria-label="Abrir menu" aria-expanded="false">
                        <span class="bar bar1"></span>
                        <span class="bar bar2"></span>
                        <span class="bar bar3"></span>
                        <span class="sr-only">Menu</span>
                    </button>
                </div>

                <div class="nav-overlay"></div>
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
                    <li class="theme-wrapper">
                        <button id="theme-toggle" class="theme-btn" aria-label="Alternar modo noturno">
                            ${themeIcon}
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
        `;

        this.initEvents();
        this.initTheme();
    }

    disconnectedCallback() {
        this.removeEventListeners();
    }

    initTheme() {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
        }
    }

    initEvents() {
        const mobileBtn = this.querySelector('.mobile-btn');
        const navList = this.querySelector('.nav-list');
        const navOverlay = this.querySelector('.nav-overlay');
        const themeToggle = this.querySelector('#theme-toggle');

        themeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeToggle.textContent = isDark ? '☀️' : '🌙';
        });

        const toggleMenu = (open) => {
            const shouldOpen = open !== undefined ? open : !this.isMobileMenuOpen;
            this.isMobileMenuOpen = shouldOpen;
            
            navList.classList.toggle('active', shouldOpen);
            mobileBtn.classList.toggle('active', shouldOpen);
            if (navOverlay) navOverlay.classList.toggle('active', shouldOpen);
            
            mobileBtn.setAttribute('aria-expanded', shouldOpen);
            document.body.style.overflow = shouldOpen ? 'hidden' : '';
            
            if (shouldOpen) {
                this.addEventListeners();
            } else {
                this.removeEventListeners();
            }
        };

        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        navOverlay.addEventListener('click', () => {
            toggleMenu(false);
        });

        this.querySelectorAll('.nav-list a:not(.btn-contato)').forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu(false);
            });
        });

        this.querySelectorAll('.nav-list .btn-contato, .nav-list .theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                setTimeout(() => toggleMenu(false), 300);
            });
        });

        window.addEventListener('resize', this.handleResize);
    }

    addEventListeners() {
        document.addEventListener('click', this.handleClickOutside);
        document.addEventListener('keydown', this.handleEscapeKey);
    }

    removeEventListeners() {
        document.removeEventListener('click', this.handleClickOutside);
        document.removeEventListener('keydown', this.handleEscapeKey);
    }

    handleClickOutside(e) {
        const nav = this.querySelector('nav');
        const mobileBtn = this.querySelector('.mobile-btn');
        
        if (!nav.contains(e.target) && this.isMobileMenuOpen) {
            const toggleMenu = () => {
                this.isMobileMenuOpen = false;
                this.querySelector('.nav-list').classList.remove('active');
                this.querySelector('.mobile-btn').classList.remove('active');
                const overlay = this.querySelector('.nav-overlay');
                if (overlay) overlay.classList.remove('active');
                document.body.style.overflow = '';
                this.removeEventListeners();
            };
            toggleMenu();
        }
    }

    handleEscapeKey(e) {
        if (e.key === 'Escape' && this.isMobileMenuOpen) {
            const toggleMenu = () => {
                this.isMobileMenuOpen = false;
                this.querySelector('.nav-list').classList.remove('active');
                this.querySelector('.mobile-btn').classList.remove('active');
                const overlay = this.querySelector('.nav-overlay');
                if (overlay) overlay.classList.remove('active');
                document.body.style.overflow = '';
                this.removeEventListeners();
            };
            toggleMenu();
        }
    }

    handleResize() {
        if (window.innerWidth > 768 && this.isMobileMenuOpen) {
            const toggleMenu = () => {
                this.isMobileMenuOpen = false;
                this.querySelector('.nav-list').classList.remove('active');
                this.querySelector('.mobile-btn').classList.remove('active');
                const overlay = this.querySelector('.nav-overlay');
                if (overlay) overlay.classList.remove('active');
                document.body.style.overflow = '';
                this.removeEventListeners();
            };
            toggleMenu();
        }
    }
}

customElements.define('site-header', HeaderComponent);
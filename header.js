
class HeaderComponent extends HTMLElement {
    constructor() {
        super();
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
                    <li><a href="index.html#contato" class="btn-contato">Fale Comigo</a></li>
                </ul>
            </nav>
        </header>
        `;
        setTimeout(() => {
            this.querySelectorAll('nav a[href^="#"]').forEach(link => {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    // Se for um link âncora (#), prevenir comportamento padrão
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

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
    }
}

customElements.define('site-header', HeaderComponent);
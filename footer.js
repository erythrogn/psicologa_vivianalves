
class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <footer id="contato">
            <div class="container">
                <h2>Vamos conversar?</h2>
                <p>Atendimento online para todo o mundo.</p>
                <p class="copyright">Vivian Alves - Psicóloga Clínica | CRP 10/09546</p>
                <p class="copyright"> </p>
                <div class="social-links">
                    <a href="https://wa.me/5594984272294"target="_blank" rel="noopener noreferrer">WhatsApp</a>
                    <a href="https://www.instagram.com/psi.vivianalves?igsh=N2k4aHFwem1oNDlq" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
            </div>
        </footer>
        `;
    }
}
customElements.define('site-footer', FooterComponent);
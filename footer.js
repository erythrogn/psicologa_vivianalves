class FooterComponent extends HTMLElement {
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

       
        const mensagemTexto = `Olá, Viviana, ${saudacao}. Espero que esteja bem. Estou procurando por acompanhamento psicológico e gostaria de agendar uma sessão de acolhimento. Qual é a melhor forma de proceder?`;
       
        const mensagemCodificada = encodeURIComponent(mensagemTexto);

        const anoAtual = new Date().getFullYear();

      
        this.innerHTML = `
        <footer id="contato">
            <div class="container">
                <h2>Vamos conversar?</h2>
                <p>Atendimento online para todo o mundo.</p>
                
                <p class="copyright">Vivian Alves - Psicóloga Clínica | CRP 10/09546</p>
                <p class="copyright">&copy; ${anoAtual} by <a href="https://dimen-6.vercel.app/" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">Dimen6</a>.</p>
                
                <div class="social-links">
                    <a href="https://wa.me/559888788357?text=${mensagemCodificada}" 
                       target="_blank" 
                       rel="noopener noreferrer">
                        WhatsApp
                    </a>
                    
                    <a href="https://www.instagram.com/psi.vivianalves?igsh=N2k4aHFwem1oNDlq" 
                       target="_blank" 
                       rel="noopener noreferrer">
                        Instagram
                    </a>
                </div>
            </div>
        </footer>
        `;
    }
}

customElements.define('site-footer', FooterComponent);
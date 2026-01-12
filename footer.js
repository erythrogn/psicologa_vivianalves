class FooterComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // --- 1. Lógica da Saudação (Mesma do Header) ---
        const horaAtual = new Date().getHours();
        let saudacao;

        if (horaAtual >= 5 && horaAtual < 12) {
            saudacao = "bom dia";
        } else if (horaAtual >= 12 && horaAtual < 18) {
            saudacao = "boa tarde";
        } else {
            saudacao = "boa noite";
        }

        // Mensagem personalizada
        const mensagemTexto = `Olá, Viviana, ${saudacao}. Espero que esteja bem. Estou procurando por acompanhamento psicológico e gostaria de agendar uma sessão de acolhimento. Qual é a melhor forma de proceder?`;
        
        // Codifica para URL
        const mensagemCodificada = encodeURIComponent(mensagemTexto);

        // Pega o ano atual automaticamente para o Copyright
        const anoAtual = new Date().getFullYear();

        // --- 2. Renderização do HTML ---
        this.innerHTML = `
        <footer id="contato">
            <div class="container">
                <h2>Vamos conversar?</h2>
                <p>Atendimento online para todo o mundo.</p>
                
                <p class="copyright">Vivian Alves - Psicóloga Clínica | CRP 10/09546</p>
                <p class="copyright">&copy; ${anoAtual} by Dimen_6.</p>
                
                <div class="social-links">
                    <a href="https://wa.me/5594984272294?text=${mensagemCodificada}" 
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
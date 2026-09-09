import './App.css';

function App() {
  return (
    <>
      <header className="hero">
        <div className="hero-content">
          <h1>Bnei Noach - Filhos da Aliança</h1>
          <p>Uma comunidade dedicada ao estudo e prática das Sete Leis de Noé</p>
          <a href="#sobre" className="btn-primary">Saiba Mais</a>
        </div>
      </header>

      <section id="sobre" className="section">
        <div className="container">
          <h2>O que é Bnei Noach?</h2>
          <p>Bnei Noach (filhos de Noé) são não-judeus que escolhem viver de acordo com as Sete Leis de Noé, um código moral e ético baseado na tradição judaica, considerado universal e válido para toda a humanidade.</p>
          <p>Estas leis foram dadas inicialmente a Adão e Eva, reiteradas a Noé após o dilúvio, e formam o fundamento ético para todas as nações.</p>
        </div>
      </section>

      <section id="leis" className="section section-alt">
        <div className="container">
          <h2>As Sete Leis de Noé</h2>
          <div className="laws-grid">
            <div className="law-item">
              <h3>1. Proibição do Idolatria</h3>
              <p>Reconhecer e servir apenas ao Único Deus verdadeiro.</p>
            </div>
            <div className="law-item">
              <h3>2. Proibição do Blasfêmia</h3>
              <p>Respeitar o Nome de Deus e não blasfemar contra o Criador.</p>
            </div>
            <div className="law-item">
              <h3>3. Proibição do Assassinato</h3>
              <p>Respeitar a vida humana em todas as suas formas.</p>
            </div>
            <div className="law-item">
              <h3>4. Proibição do Furto</h3>
              <p>Respeitar os direitos de propriedade e não roubar.</p>
            </div>
            <div className="law-item">
              <h3>5. Proibição da Imoralidade Sexual</h3>
              <p>Manter padrões de pureza e respeito nas relações sexuais.</p>
            </div>
            <div className="law-item">
              <h3>6. Proibição do Crueldade com Animais</h3>
              <p>Não causar sofrimento desnecessário aos animais.</p>
            </div>
            <div className="law-item">
              <h3>7. Estabelecimento de Tribunais de Justiça</h3>
              <p>Criar sistemas legais justos para fazer cumprir as leis e manter a ordem social.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="comunidade" className="section">
        <div className="container">
          <h2>Nossa Comunidade</h2>
          <p>Somos um grupo de estudos dedicado ao aprofundamento das Sete Leis de Noé e suas aplicações práticas na vida moderna.</p>
          <p>Oferecemos:</p>
          <ul className="benefits-list">
            <li>Estudos semanais sobre as Leis de Noé</li>
            <li>Discussões sobre ética e moralidade contemporânea</li>
            <li>Orientação para aplicação prática no dia a dia</li>
            <li>Recursos educativos e materiais de estudo</li>
            <li>Comunidade de apoio mútuo</li>
          </ul>
          <a href="#contato" className="btn-secondary">Junte-se a nós</a>
        </div>
      </section>

      <section id="contato" className="section section-contact">
        <div className="container">
          <h2>Entre em Contato</h2>
          <p>Tem perguntas sobre Bnei Noach ou deseja participar dos nossos estudos?</p>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
              <input type="text" id="nome" name="nome" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="mensagem">Mensagem:</label>
              <textarea id="mensagem" name="mensagem" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn-primary">Enviar Mensagem</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Bnei Noach - Todos os direitos reservados</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="YouTube">YouTube</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
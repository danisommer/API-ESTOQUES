import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="header">
        <div>
          <img
            className="logo"
            src="../Storage_icon.png"
            alt="Logo"
            onClick={handleHome}
          />
        </div>
        <div className="auth-buttons">
          <button className="login-button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            className="sign-in-button"
            onClick={() => navigate("/cadastro")}
          >
            Cadastro
          </button>
        </div>
      </div>
      <div className="content">
        <h1>Bem-vindo ao StockManager!</h1>
        <p>Sua solução completa para gestão de materiais e estoque</p>
        <p>
          Você está buscando uma maneira fácil e eficiente de gerenciar seu
          estoque? O StockManager é a ferramenta ideal para você! Com nossa
          plataforma, você pode organizar, controlar e acompanhar todos os
          materiais do seu estoque de forma simples e segura.
        </p>
        <h2>O que você pode fazer com o StockManager?</h2>
        <ul>
          <li>
            <strong>Cadastro Simples:</strong> Crie sua conta rapidamente e
            comece a usar a plataforma em poucos minutos.
          </li>
          <li>
            <strong>Gerencie seu Estoque:</strong> Adicione novos materiais,
            visualize o que está disponível, atualize informações e remova itens
            que não precisa mais.
          </li>
          <li>
            <strong>Segurança Garantida:</strong> Todos os seus dados estão
            protegidos, garantindo que apenas você e sua equipe tenham acesso.
          </li>
        </ul>
        <h2>Por que escolher o StockManager?</h2>
        <ul>
          <li>
            <strong>Fácil de Usar:</strong> Nossa interface é intuitiva e
            amigável, sem complicações.
          </li>
          <li>
            <strong>Acesso de Qualquer Lugar:</strong> Gerencie seu estoque de
            qualquer dispositivo com acesso à internet.
          </li>
          <li>
            <strong>Suporte Dedicado:</strong> Estamos aqui para ajudar você com
            qualquer dúvida ou necessidade.
          </li>
        </ul>
        <p>
          Pronto para transformar a maneira como você gerencia seu estoque?
          Experimente o StockManager hoje mesmo e veja como é fácil manter tudo
          organizado e sob controle.
        </p>
        <p>
          Explore a nossa plataforma e descubra como podemos simplificar a
          gestão do seu estoque!
        </p>
      </div>
    </div>
  );
};

export default HomePage;

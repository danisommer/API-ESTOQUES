import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const onLogin = (token) => {
    setToken(token);
    navigate("/summary");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.login(email, senha);
      onLogin(api.getToken());
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="header">
        <img
          className="logo"
          src="../Storage_icon.png"
          alt="Logo"
          onClick={handleHome}
        />
      </div>
      <div className="content">
        <h2>Já tenho uma conta</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

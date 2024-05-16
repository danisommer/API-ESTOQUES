import React, { useState } from 'react';
import api from '../services/api';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.login(email, senha);
      onLogin(api.getToken());
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div>
      <h2>Já tenho uma conta</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;

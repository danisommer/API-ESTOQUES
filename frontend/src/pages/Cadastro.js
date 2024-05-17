import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const onLogin = (token) => {
    setToken(token);
    navigate('/summary');
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      const response = await api.registrar(nome, email, senha);
      onLogin(api.getToken());
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };

  const handleHome = () => {
    navigate('/');
   };

  return (
    <div>
       <div>
        <div className='header'>
          <img className="logo" src="../Storage_icon.png" alt="Logo" onClick={handleHome} />
        </div>
        <h2>Cadastro</h2>
        <form onSubmit={handleCadastro}>
          <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;

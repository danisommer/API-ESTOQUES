// AutenticacaoPage.js
import React, { useState } from 'react';
import Login from './Login';
import Cadastro from './Cadastro';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  const handleLogin = (token) => {
    setToken(token);
    navigate('/summary');
  };

  return (
    <div>
      {!token && (
        <div>
          <Login onLogin={handleLogin} />
          <Cadastro onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default AuthPage;
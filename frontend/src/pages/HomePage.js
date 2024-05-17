import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
   };

return (
    <div className="header">
        <div>
            <img className="logo" src="../Storage_icon.png" alt="Logo" onClick={handleHome} />
        </div>
        <div>
            <button className="login-button" onClick={() => navigate('/login')}>Login</button>
            <button className="sign-in-button" onClick={() => navigate('/cadastro')}>Cadastro</button>
        </div>
    </div>
);
};

export default HomePage;
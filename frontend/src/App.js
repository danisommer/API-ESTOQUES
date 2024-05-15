import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import SummaryPage from './pages/SummaryPage';
import api from './services/api';

function App() {
  const isAuthenticated = !api.getToken();

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/auth" /> : <Navigate to="/summary" />} />
          <Route path="/summary" element={<SummaryPage/>} />
          <Route path="/auth" element={<AuthPage/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

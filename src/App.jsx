// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CadastroPage from "./pages/CadastroPage";
import InicioPage from "./pages/InicioPage";
import PerfilPage from "./pages/PerfilPage";
import GroupPage from "./pages/GroupPage";
import InicioAmigoPage from "./pages/InicioAmigoPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/inicio" element={<InicioPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/grupo" element={<GroupPage />} />
        <Route path="/inicio/:amigoId" element={<InicioAmigoPage />} />
      </Routes>
    </Router>
  );
}

export default App;

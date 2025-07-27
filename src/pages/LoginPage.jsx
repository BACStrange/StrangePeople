// src/pages/LoginPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/api/usuarios/login", {
        email,
        senha,
      });
      
      if (response.status === 200) {
        const usuario = response.data.usuario;
        console.log(response.data.usuario);
        localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
        console.log("Usuário salvo!");
        navigate("/inicio", { state: { usuario } });
      }
    } catch (err) {
      alert("Erro no login: " + err.response?.data?.mensagem || "Erro desconhecido");
    }
    
  };

  return (
  <div className="login-page">
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="logo">
        <p>SP</p>
      </div>
      <div className="cartao">
        <h2 className="titulo">Entrar</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="input-campo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="input-campo"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit" className="botao">Entrar</button>
        </form>
        <p className="link-texto">
          Não tem uma conta? <Link to="/cadastro">Cadastrar</Link>
        </p>
      </div>
    </div>
  </div>
  );
}

export default LoginPage;
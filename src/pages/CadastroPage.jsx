// src/pages/CadastroPage.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../LoginPage.css";

function CadastroPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      const resposta = await axios.post("http://localhost:5000/api/usuarios/cadastrar", {
        nome,
        email,
        senha,
      });
      alert(resposta.data.mensagem);
      navigate("/");
    } catch (err) {
      alert("Erro ao cadastrar usuário!");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="logo">
        <p>SP</p>
      </div>
      <div className="cartao">
        <h2 className="titulo">Cadastro</h2>
        <form onSubmit={handleCadastro}>
          <input
            type="text"
            placeholder="Nome"
            className="input-campo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
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
          <button type="submit" className="botao">
            Cadastrar
          </button>
          {/* Botão para voltar à página de login */}
        <button
          className="botao"
          style={{ marginTop: "1rem", backgroundColor: "#6b7280" }}
          onClick={() => navigate("/")}
        >
          Voltar para Login
        </button>
        </form>
      </div>
    </div>
  );
}

export default CadastroPage;
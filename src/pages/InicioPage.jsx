import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../InicioPage.css";

function InicioPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const usuario = location.state?.usuario;

  const [mensagem, setMensagem] = useState("");
  const [postagens, setPostagens] = useState([]);

  useEffect(() => {
    if (!usuario) {
      navigate("/");
    } else {
      carregarPostagens();
    }
  }, [usuario, navigate]);

  const carregarPostagens = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/postagens/${usuario._id}`);
      setPostagens(response.data);
    } catch (err) {
      console.error("Erro ao carregar postagens", err);
    }
  };

  const handlePostar = async (e) => {
    e.preventDefault();

    if (mensagem.trim() === "") return;

    try {
        await axios.post("http://localhost:5000/api/postagens", {
        usuarioId: usuario._id,
        conteudo: mensagem,
      });
      alert("Postagem relizada com sucesso");
      setMensagem("");
      carregarPostagens();
    } catch (err) {
      console.error("Erro ao postar", err);
    }
  };

  return (
    <div className="inicio-page">
    <div className="pagina-inicio">
      <div className="barra-postagem">
        <h2>Bem-vindo, {usuario?.nome}!</h2>
        <form onSubmit={handlePostar} className="formulario-postagem">

          <input
          placeholder="Escreva algo..."
          className="input-campo"
          rows={4}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          />

          <button type="submit" className="botao">
            Pensar
          </button>

        </form>

      </div>
       <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginBottom: "1rem" }}>
        <button
          className="botao"
          onClick={() => navigate("/perfil", { state: { usuario } })}
        >
          Espelho
        </button>
        <button
          className="botao"
          onClick={() => navigate("/grupo")}
        >
          Sair de Casa
        </button>
      </div>

      <div className="container-postagens">
        <h3 className="titulo">Pensamentos...</h3>
        {postagens.length === 0 ? (
          <p style={{ textAlign: "center" }}>Nenhuma postagem ainda.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {postagens.map((post) => (
              <li key={post._id} className="postagem">
                {post.conteudo}
                <div className="data">
                  {new Date(post.data).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </div>
  );
}

export default InicioPage;
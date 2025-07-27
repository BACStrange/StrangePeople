/*import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function InicioAmigoPage() {
  const { id } = useParams(); // captura o ID do amigo da URL
  const [amigo, setAmigo] = useState(null);
  const [postagens, setPostagens] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const respostaUsuario = await axios.get(`/api/usuarios/${id}`);
        const respostaPostagens = await axios.get(`/api/postagens/${id}`);
        console.log("Postagens recebidas:", respostaPostagens.data);
        setPostagens(respostaPostagens.data);
        setAmigo(respostaUsuario.data);
        setPostagens(respostaPostagens.data);
      } catch (erro) {
        console.error("Erro ao carregar dados do amigo:", erro);
      }
    }

    carregarDados();
  }, [id]);

  if (!amigo) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Página de {amigo.nome}</h2>
      <ul>
        {postagens.map((post) => (
          <li key={post._id}>{post.conteudo}</li>
        ))}
      </ul>
    </div>
  );
}

*/

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../InicioPage.css";

function InicioAmigoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const usuario = location.state?.usuario;
  const { amigoId } = useParams(); // captura o ID do amigo da URL
  const amigo = location.state?.a;

  const [postagens, setPostagens] = useState([]);

  useEffect(() => {
      carregarPostagens();
  }, [amigoId]);

  const carregarPostagens = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/postagens/${amigoId}`);
      console.log("ID do amigo:", amigoId);
      setPostagens(response.data);
    } catch (err) {
      console.error("Erro ao carregar postagens", err);
    }
  };

  return (
    <div className="inicio-page">
    <div className="pagina-inicio">
        {amigo && (
        <div className="amigo-header">
            <img 
                src={amigo.fotoPerfil} 
                alt="Foto do amigo" 
                width="150"
                height="150"
            />
            <h2 className="nome-amigo">{amigo.nome}</h2>
        </div>
        )}
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

export default InicioAmigoPage;

import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function GroupPage() {
  // usuário logado
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();

  const [mensagem, setMensagem] = useState("");
  const [posts, setPosts] = useState([]);

  // carregar todas as mensagens ao abrir a página
  const carregarPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/grupo");
      setPosts(res.data);
    } catch (err) {
      console.error("Erro ao carregar posts do grupo", err);
    }
  };

  useEffect(() => { carregarPosts(); }, []);

  // enviar nova mensagem
  const postar = async (e) => {
    e.preventDefault();

    if (mensagem.trim() === "") return;

    try {
      await axios.post("http://localhost:5000/api/grupo", {
        autor: usuario._id,
        conteudo: mensagem,
      });
      alert("Postagem relizada com sucesso");
      setMensagem("");
      carregarPosts();
    } catch (err) {
      console.error("Erro ao postar no grupo", err);
    }
  };

  return (
    <div className="pagina-inicio">
      {/* barra de postagem */}
      <div className="barra-postagem">
        <h2>Grupo – mensagens públicas</h2>

        <form onSubmit={postar} className="formulario-postagem">
          <input
          placeholder="Compartilhe algo com todos…"
          className="input-campo"
          rows={4}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          />
          <button type="submit" className="botao">Postar</button>
        </form>
        <button className="botao" style={{marginTop:"1rem"}} onClick={() => navigate("/inicio",{state:{usuario}})}>
          Voltar para Casa
        </button>
      </div>

      {/* lista de posts */}
      <div className="container-postagens">
        {posts.map((p) => (
          <div key={p._id} className="postagem">
            <p>{p.conteudo}</p>
            <small>
              <span
                style={{ cursor: "pointer", textDecoration: "underline", color: "#000" }}
                onClick={() =>
                  navigate(`/inicio/${p.autor._id}`, {
                    state: { amigo: p.autor },
                  })
                }
              >
                {p.autor?.nome}
              </span>{" "}
              – {new Date(p.data).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
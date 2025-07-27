import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../PerfilPage.css"

function PerfilPage() {
  let usuario = null;

  try {
    const usuarioLocal = localStorage.getItem("usuario");
    usuario = usuarioLocal ? JSON.parse(usuarioLocal) : null;
  } catch (err) {
    console.error("Erro ao recuperar usuário do localStorage:", err);
  }

  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fotoSalva, setFotoSalva] = useState(usuario?.fotoPerfil || null);
  const navigate = useNavigate(); 
  const [amigos, setAmigos] = useState([]);
  const [mostrarAdd, setMostrarAdd] = useState(false);
  const [nomeBusca, setNomeBusca]   = useState("");

  // carregar lista de amigos na montagem
  useEffect(() => {
    const carregarAmigos = async () => {
      const res = await axios.get(`http://localhost:5000/api/amigos/${usuario._id}`);
      setAmigos(res.data);
    };
    carregarAmigos();
  }, [usuario._id]);

  if (!usuario) {
  return <p>Usuário não encontrado. Faça login novamente.</p>;
  }

    const handleLogout = () => {
    localStorage.removeItem("usuario");      // limpa usuário salvo
    navigate("/");                           // volta à tela de login (ou “/inicio” se preferir)
  };

  const voltarParaInicio = () => {
  navigate("/inicio", { state: { usuario } }); // envia o usuário novamente
  };

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUploadImagem = async () => {
    if (!imagem) return;

    const formData = new FormData();
    formData.append("fotoPerfil", imagem);

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const urlCloudinary = response.data.caminho;

      await axios.put(`http://localhost:5000/api/usuarios/${usuario._id}/foto`, {
        fotoPerfil: urlCloudinary,
      });

      setFotoSalva(urlCloudinary);
      alert("Foto de perfil atualizada!");
    } catch (err) {
      console.error("Erro ao enviar imagem", err);
      alert("Erro ao enviar imagem");
    }
  };

  const adicionarAmigo = async (e) => {
    e.preventDefault();
    if (!nomeBusca.trim()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/amigos/adicionar", {
        userId: usuario._id,
        nomeAmigo: nomeBusca.trim(),
      });
      // Atualizar lista local
      setAmigos([...amigos, { _id: res.data.amigoId, nome: res.data.amigoNome }]);
      setNomeBusca("");
      alert("Amigo adicionado!");
    } catch (err) {
      alert(err.response?.data?.erro || "Erro ao adicionar amigo");
    }
  };

  return (
  <div className="perfil-container">
    <div className="cartao">
      <p><strong>Nome:</strong> {usuario.nome}</p>
      <p><strong>Email:</strong> {usuario.email}</p>

      {fotoSalva && (
        <img
          src={fotoSalva}
          alt="Foto de perfil"
          width="150"
          height="150"
        />
      )}

      <input type="file" accept="image/*" onChange={handleImagemChange} />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          width="100"
        />
      )}

      <button className="botao" onClick={handleUploadImagem}>
        Enviar nova foto
      </button>

      <button className="botao" onClick={() => setMostrarAdd(!mostrarAdd)}>
        {mostrarAdd ? "Cancelar" : "Adicionar amigos"}
      </button>

    {mostrarAdd && (
  <form
    onSubmit={adicionarAmigo}
    style={{
      marginTop: "1rem",
      display: "flex",
      gap: "0.5rem",
      alignItems: "center"
    }}
  >
    <input
      type="text"
      placeholder="Nome do usuário"
      value={nomeBusca}
      onChange={(e) => setNomeBusca(e.target.value)}
      className="input-campo"
      style={{ flex: 1, minWidth: "400px" }}
    />
    <button
      className="botao"
      style={{
        padding: "0.5rem 1rem",
        whiteSpace: "nowrap"
      }}
    >
      Adicionar
    </button>
  </form>
)}


      <button className="botao" onClick={voltarParaInicio}>
        Voltar para o Início
      </button>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "1rem",
          backgroundColor: "#dc3545",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "0.5rem 1rem",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

      <div className="lista-amigos">
        <h3>Amigos</h3>
        {amigos.length === 0 ? (
          <p>Você ainda não tem amigos.</p>
        ) : (
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {amigos.map((a) => (
              <li
                key={a._id}
                style={{
                  background: "#f5f5f5",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
                onClick={() => navigate(`/inicio/${a._id}`, {state: {a}})}
              >
                {a.nome}
              </li>
            ))}
          </ul>

        )}
      </div>
    </div>
  </div>
);

}

export default PerfilPage;

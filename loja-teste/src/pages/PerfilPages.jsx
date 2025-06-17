import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PerfilPage() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("usuario"));
    if (!dados) {
      navigate("/login");
    } else {
      setUsuario(dados);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  if (!usuario) return null;

  return (
    <div style={{ padding: "20px" }}>
      <h2>👤 Olá, {usuario.nome}</h2>
      <p><strong>Email:</strong> {usuario.email}</p>
      <button onClick={handleLogout} style={{ marginTop: "10px" }}>
        Sair
      </button>
    </div>
  );
}

export default PerfilPage;

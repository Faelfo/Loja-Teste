import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
    };

    const usuario = { nome, email };
    localStorage.setItem("usuario", JSON.stringify(usuario));
    navigate("/perfil"); 

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
            <h2>🔐 Login</h2>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" style={{ padding: "10px", backgroundColor: "#333", color: "#fff" }}>
                    Entrar
                </button>
            </form>
        </div>
    );

}

export default LoginPage;
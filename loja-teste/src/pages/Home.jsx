import { Link } from "react-router-dom";

const categorias = [
    { nome: "Camisetas", imagem: "/img/camisetas.jpg" },
    { nome: "Calças", imagem: "/img/calcas.jpg" },
    { nome: "Acessórios", imagem: "/img/acessorios.jpg" },
];

function Home() {
    return (
        <div>
            {/* Banner principal */}
            <div style={{ width: "100%", height: "300px", overflow: "hidden", marginBottom: "20px" }}>
                <img
                    src="/img/banner-loja.jpg"
                    alt="Banner"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </div>

            {/* Categorias */}
            <h2>Categorias</h2>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {categorias.map((cat) => (
                    <Link key={cat.nome} to={`/categoria/${cat.nome.toLowerCase()}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <div style={{ width: "200px", textAlign: "center", border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden" }}>
                            <img src={cat.imagem} alt={cat.nome} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                            <p style={{ margin: "10px 0" }}>{cat.nome}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Home;
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ totalItens, carrinho }) {
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    setMostrarCarrinho(false);
  }, [location]);

  return (
    <header style={{
      backgroundColor: "#333",
      color: "#fff",
      padding: "10px 20px 20px 10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative",
    }}>
      <h1 style={{ margin: 0 }}>Minha Loja</h1>

      <div style={{ position: "relative" }}>
        <div
          onClick={() => setMostrarCarrinho(!mostrarCarrinho)}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          🛒 Carrinho: {totalItens} item{totalItens !== 1 ? "s" : ""}
        </div>

        {mostrarCarrinho && (
          <div style={{
            position: "absolute",
            right: 0,
            top: "100%",
            background: "#222",
            padding: "10px",
            borderRadius: "8px",
            minWidth: "250px",
            zIndex: 100,
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
          }}>
            {carrinho.length === 0 ? (
              <p>O carrinho está vazio.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {carrinho.map(({ produto, quantidade }) => (
                  <li key={produto.id} style={{ marginBottom: "8px" }}>
                    <strong>{produto.title}</strong><br />
                    Qtd: {quantidade} — R$ {(produto.price * quantidade).toFixed(2)}
                  </li>
                ))}
              </ul>
            )}

            <Link to="/carrinho">
              <button style={{
                marginTop: "10px",
                padding: "6px 12px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}>
                Ver Carrinho
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

import { Link } from "react-router-dom";

function CartPage({ carrinho, aumentarQuantidade, diminuirQuantidade, limparCarrinho }) {
  const total = carrinho.reduce(
    (acc, item) => acc + item.produto.price * item.quantidade,
    0
  );

  if (carrinho.length === 0) {
    return <p>O carrinho está vazio.</p>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Carrinho</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {carrinho.map(({ produto, quantidade }) => (
          <li key={produto.id} style={{ marginBottom: "10px" }}>
            <strong>{produto.title}</strong> - R$ {produto.price.toFixed(2)} x {quantidade} = R$ {(produto.price * quantidade).toFixed(2)}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "5px" }}>
              <button onClick={() => diminuirQuantidade(produto.id)}>-</button>
              <span>{quantidade}</span>
              <button onClick={() => aumentarQuantidade(produto.id)}>+</button>
            </div>
          </li>
        ))}
      </ul>

      <h3>Total: R$ {total.toFixed(2)}</h3>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button onClick={limparCarrinho} style={{ backgroundColor: "#c62828", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "4px" }}>
          Limpar Carrinho
        </button>

        <Link to="/checkout">
          <button style={{ backgroundColor: "#2e7d32", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "4px" }}>
            Finalizar Pedido
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CartPage;

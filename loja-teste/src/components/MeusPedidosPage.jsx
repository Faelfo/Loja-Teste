import { useEffect, useState } from "react";

function MeusPedidosPage() {
  const [pedidos, setPedidos] = useState([]);

  // Carrega os pedidos ao montar o componente
  useEffect(() => {
    carregarPedidos();
  }, []);

  // Função para carregar pedidos do localStorage
  const carregarPedidos = () => {
    try {
      const dados = JSON.parse(localStorage.getItem("pedidos")) || [];
      setPedidos(dados);
    } catch (erro) {
      console.error("Erro ao carregar pedidos:", erro);
      setPedidos([]);
    }
  };

  // Atualiza o status de um pedido e salva no localStorage
  const atualizarStatus = (id, novoStatus) => {
    const pedidosAtualizados = pedidos.map((pedido) =>
      pedido.id === id ? { ...pedido, status: novoStatus } : pedido
    );

    // Atualiza o estado e o localStorage
    setPedidos(pedidosAtualizados);
    localStorage.setItem("pedidos", JSON.stringify(pedidosAtualizados));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Meus Pedidos</h2>
      {pedidos.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        pedidos.map((pedido) => (
          <div
            key={pedido.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>Pedido #{pedido.id}</h3>
            <p><strong>Data:</strong> {pedido.data}</p>
            <p><strong>Status:</strong> {pedido.status}</p>
            <p><strong>Total:</strong> R$ {pedido.total.toFixed(2)}</p>

            <h4>Itens:</h4>
            <ul>
              {pedido.itens.map((item, index) => (
                <li key={index}>
                  {item.quantidade}x {item?.produto?.title || "Produto não encontrado"}
                </li>
              ))}
            </ul>

            {pedido.status !== "Entregue" && (
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => atualizarStatus(pedido.id, "Em processamento")}
                  style={{ marginRight: "10px" }}
                >
                  Em processamento
                </button>
                <button
                  onClick={() => atualizarStatus(pedido.id, "Enviado")}
                  style={{ marginRight: "10px" }}
                >
                  Enviado
                </button>
                <button onClick={() => atualizarStatus(pedido.id, "Entregue")}>
                  Entregue
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MeusPedidosPage;

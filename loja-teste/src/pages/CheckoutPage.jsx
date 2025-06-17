import { useState } from "react";


function CheckoutPage({ carrinho, limparCarrinho }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [endereco, setEndereco] = useState("");
    const [pagamento, setPagamento] = useState("pix");
    const [pedidoEnviado, setPedidoEnviado] = useState(false);
    const [numeroPedido, setNumeroPedido] = useState("");

    const total = carrinho.reduce(
        (acc, item) => acc + item.produto.price * item.quantidade, 0
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const numeroGerado = Math.floor(100000 + Math.random() * 900000);
        setNumeroPedido(numeroGerado.toString());

        setPedidoEnviado(true);

        limparCarrinho();
    };

    if (pedidoEnviado) {
        return (
            <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
                <h2>✅ Pedido enviado com sucesso!</h2>
                <p>Obrigado por comprar conosco, <strong>{nome}</strong>.</p>
                <p>Enviamos a confirmação para <strong>{email}</strong>.</p>
                <p>Seu número de pedido é <strong>#{numeroPedido}</strong>.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
            <h2>Finalizar Pedido</h2>

            <div style={{ marginBottom: "20px" }}>
                <h3>Resumo do Pedido</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {carrinho.map(({ produto, quantidade }) => (
                        <li key={produto.id}>
                            {produto.title} - {quantidade} x R$ {produto.price.toFixed(2)} = R$ {(produto.price * quantidade).toFixed(2)}
                        </li>
                    ))}
                </ul>
                <h4>Total: R$ {total.toFixed(2)}</h4>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <label>
                    Nome completo:
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </label>

                <label>
                    E-mail:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </label>

                <label>
                    Endereço de entrega:
                    <textarea
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </label>

                <label>
                    Método de pagamento:
                    <select
                        value={pagamento}
                        onChange={(e) => setPagamento(e.target.value)}
                        style={{ width: "100%", padding: "8px" }}
                    >
                        <option value="pix">PIX</option>
                        <option value="boleto">Boleto</option>
                        <option value="credito">Cartão de Crédito</option>
                    </select>
                </label>

                <button
                    type="submit"
                    style={{
                        backgroundColor: "#2e7d32",
                        color: "#fff",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "4px",
                        marginTop: "10px",
                    }}
                >
                    Enviar Pedido
                </button>
            </form>
        </div>
    );
}

export default CheckoutPage;

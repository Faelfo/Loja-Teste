function ProductCard({ produto, aoAdicionar }) {
    return (
      <div style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
        <img
          src={produto.image}
          alt={produto.title}
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
        />
        <h3 style={{ fontSize: "14px", height: "40px", overflow: "hidden" }}>{produto.title}</h3>
        <p><strong>R$ {produto.price}</strong></p>
        <button onClick={() => aoAdicionar(produto)}>Adicionar ao carrinho</button>
      </div>
    );
  }
  
  export default ProductCard;
  
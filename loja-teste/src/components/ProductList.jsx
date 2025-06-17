import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductList({ aoAdicionar }) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProdutos(data));
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px"}}>
      {produtos.map(produto => (
        <ProductCard
          key={produto.id}
          produto={produto}
          aoAdicionar={aoAdicionar}
        />
      ))}
    </div>    
  );
}

export default ProductList;

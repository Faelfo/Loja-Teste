import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage"
import Home from "./pages/Home";

function App() {
  const [carrinho, setCarrinho] = useState(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  });

  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const mostrarToast = (mensagem) => {
    setToast(mensagem);
    setTimeout(() => setToast(""), 500);
  };

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((carrinhoAnterior) => {
      const produtoExistente = carrinhoAnterior.find(
        (item) => item.produto.id === produto.id
      );

      if (produtoExistente) {
        mostrarToast("Quantidade aumentada");
        return carrinhoAnterior.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        mostrarToast("Produto adicionado ao carrinho");
        return [...carrinhoAnterior, { produto, quantidade: 1 }];
      }
    });
  };

  const aumentarQuantidade = (id) => {
    setCarrinho((prev) =>
      prev.map((item) =>
        item.produto.id === id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  };

  const diminuirQuantidade = (id) => {
    setCarrinho((prev) =>
      prev
        .map((item) =>
          item.produto.id === id
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  const limparCarrinho = () => {
    const confirmado = window.confirm("Tem certeza que deseja limpar o carrinho?");
    if (confirmado) {
      setCarrinho([]);
      localStorage.removeItem("carrinho");
      mostrarToast("Carrinho limpo");
    }
  };

  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Router>
        <Header totalItens={totalItens} carrinho={carrinho} />
        <main style={{ flex: 1, padding: "80px 20px 20px" }}>
          <Routes>
            <Route
              path="/"
              element= {<Home/>} />
            <Route 
              path = "/categoria/:nome"
              element={<ProductList aoAdicionar={adicionarAoCarrinho}/>} />
            <Route
              path="/"
              element={<ProductList aoAdicionar={adicionarAoCarrinho} />}
            />
            <Route
              path="/carrinho"
              element={
                <CartPage
                  carrinho={carrinho}
                  aumentarQuantidade={aumentarQuantidade}
                  diminuirQuantidade={diminuirQuantidade}
                  limparCarrinho={limparCarrinho}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <CheckoutPage
                  carrinho={carrinho}
                  limparCarrinho={limparCarrinho}
                />
              }
            />
          </Routes>
        </main>
      </Router>

      {toast && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "#333",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "8px",
          zIndex: 1000,
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;

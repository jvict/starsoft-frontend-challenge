"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useQuery } from "react-query";
import { fetchProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import OverlayCheckout from "../components/OverlayCheckout"; // Importa o overlay
import styles from "../styles/Cart.module.scss";
import Footer from "@/components/Footer";

const Cart = () => {
  const { data: products = [], isLoading, isError } = useQuery("products", fetchProducts);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [isOverlayVisible, setOverlayVisible] = useState(false); // Controla visibilidade do overlay

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 8);
  };

  const progressPercentage = products?.data
    ? Math.min((visibleProducts / products.data.length) * 100, 100)
    : 0;

  if (isLoading) {
    return <p>Carregando produtos...</p>;
  }

  if (isError) {
    return <p>Erro ao carregar os produtos...</p>;
  }

  return (
    <div className={styles.container}>
      <Navbar />

      <div className={styles.mainContent}>
        {/* Grid de Produtos */}
        <div className={styles.products}>
          {products.data.slice(0, visibleProducts).map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => setOverlayVisible(true)} // Controla a exibição do overlay
            />
          ))}
        </div>

        <div className={styles.loadMoreSection}>
          <div className={styles.progressContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <button className={styles.loadMore} onClick={handleLoadMore}>
            {visibleProducts < products.data.length ? "Carregar mais" : "Você já viu tudo"}
          </button>
        </div>
      </div>

      {/* Overlay de Checkout */}
      <OverlayCheckout
        isVisible={isOverlayVisible}
        onClose={() => setOverlayVisible(false)}
      />

      <Footer />
    </div>
  );
};

export default Cart;
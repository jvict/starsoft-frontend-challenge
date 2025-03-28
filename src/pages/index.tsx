"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useQuery } from "react-query";
import { fetchProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import styles from "../styles/Cart.module.scss";
import Footer from "@/components/Footer";

const Cart = () => {
  const { data: products = [], isLoading, isError } = useQuery("products", fetchProducts);
  const [visibleProducts, setVisibleProducts] = useState(8); // Controla a quantidade visível

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 8); 
  };

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
        <div className={styles.products}>
          {products.data
            .slice(0, visibleProducts) 
            .map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>

        <button className={styles.loadMore} onClick={handleLoadMore} disabled={visibleProducts < products.data.length ? false : true}>
          {visibleProducts < products.data.length ? "Carregar mais" : "Você já viu tudo"}
        </button>

      </div>
      <Footer />
    </div>
  );
};

export default Cart;
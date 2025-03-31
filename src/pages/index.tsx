import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import OverlayCheckout from "../components/OverlayCheckout";
import styles from "../styles/Cart.module.scss";
import { setProducts, setLoading, setError } from "../store/slices/productSlice";
import { RootState } from "../store";
import { Product } from "./product/[id]";

const Cart = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state: RootState) => state.products);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    dispatch(setLoading(true));
    fetchProducts()
      .then((data) => {
        dispatch(setProducts(data.data));
      })
      .catch((err) => {
        dispatch(setError(err.message));
      });
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 8);
  };

  const progressPercentage = products
    ? Math.min((visibleProducts / products.length) * 100, 100)
    : 0;

  if (isLoading) {
    return <p>Carregando produtos...</p>;
  }

  if (error) {
    return <p>Erro ao carregar os produtos: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.products}>
          {products.slice(0, visibleProducts).map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => setOverlayVisible(true)}
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
            {visibleProducts < products.length ? "Carregar mais" : "Você já viu tudo"}
          </button>
        </div>
      </div>
      <OverlayCheckout
        isVisible={isOverlayVisible}
        onClose={() => setOverlayVisible(false)}
      />
    </div>
  );
};

export default Cart;
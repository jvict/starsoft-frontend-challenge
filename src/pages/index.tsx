import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import dynamic from "next/dynamic";
import { fetchProducts } from "../services/productService";
import { setProducts, setLoading, setError } from "../store/slices/productSlice";
import { RootState } from "../store";
import { Product } from "./product/[id]";
import SkeletonCard from "../components/SkeletonCard"; // Import SkeletonCard
import styles from "../styles/Cart.module.scss";

// Lazy load components
const ProductCard = dynamic(() => import("../components/ProductCard"));
const OverlayCheckout = dynamic(() => import("../components/OverlayCheckout"));

const Cart = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state: RootState) => state.products);
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

    return (
      <>
        <Head>
          <title>Catálogo de Produtos - Sua Loja</title>
          <meta
            name="description"
            content="Explore nossa seleção de produtos e adicione itens à sua mochila de compras."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href="https://seusite.com/cart" />
        </Head>
    
        <main className={styles.container}>
          <h1 className={styles.visuallyHidden}>Catálogo de Produtos</h1>
    
          <section className={styles.mainContent}>
            {isLoading ? (
              <div className={styles.products} role="list">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} role="listitem">
                    <SkeletonCard />
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.products} role="list">
                {products.slice(0, visibleProducts).map((product: Product) => (
                  <div key={product.id} role="listitem">
                    <ProductCard
                      product={product}
                      onAddToCart={() => setOverlayVisible(true)}
                    />
                  </div>
                ))}
              </div>
            )}
    
            <div className={styles.loadMoreSection}>
              <div
                className={styles.progressContainer}
                role="progressbar"
                aria-valuenow={progressPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={styles.progressBar}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              {!isLoading && (
                <button
                  className={styles.loadMore}
                  onClick={handleLoadMore}
                  disabled={visibleProducts >= products.length}
                >
                  {visibleProducts < products.length
                    ? "Carregar mais"
                    : "Você já viu tudo"}
                </button>
              )}
            </div>
          </section>
        </main>
    
        <OverlayCheckout
          isVisible={isOverlayVisible}
          onClose={() => setOverlayVisible(false)}
        />
      </>
    );
};

export default Cart;
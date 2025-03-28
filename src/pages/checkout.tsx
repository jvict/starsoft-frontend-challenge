"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { increaseQuantity, decreaseQuantity, removeItem } from "../store/slices/cartSlie";
import { useRouter } from "next/router";
import styles from "../styles/Checkout.module.scss";
import Footer from "@/components/Footer";

const Checkout = () => {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className={styles.checkoutContainer}>

      <button className={styles.backButton} onClick={() => router.push("/")}>
        ←
      </button>
      
      <h1 className={styles.title}>Mochila de Compras</h1>
      
      <div className={styles.cartItems}>
        {items.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <img src={item.image} alt={item.name} className={styles.itemImage} />
            <div className={styles.itemDetails}>
              <h3 className={styles.itemName}>{item.name}</h3>
              <p className={styles.itemPrice}>{item.price} ETH</p>
              <div className={styles.quantityControls}>
                <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
              </div>
            </div>
            <button
              className={styles.removeButton}
              onClick={() => dispatch(removeItem(item.id))}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
      
      <div className={styles.footer}>
        <div className={styles.total}>
          <span>TOTAL</span>
          <span>{total} ETH</span>
        </div>
        <button className={styles.checkoutButton}>Finalizar Compra</button>
      </div>
      <Footer />
    </div>

    
  );
};

export default Checkout;
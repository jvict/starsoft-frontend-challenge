"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/router";
import styles from "../styles/Checkout.module.scss";
import CartItem from "@/components/CartItem";
import Arrow from "../utils/images/Arrow - Left.svg";
import Ellipse from "../utils/images/Ellipse 770.svg";
import FinalizeButton from "../components/FinishedButton";

const Checkout = () => {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const router = useRouter();

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.containerBar}>

        <button className={styles.backButton} onClick={() => router.back()}>
          <img src={Arrow.src} className={styles.arrowIcon} />
        </button>

        <p className={styles.title}>Mochila de Compras</p>
      </div>

      <div className={styles.cartItems}>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className={styles.total}>
        TOTAL
        <div className={styles.sectionIconTotal}>
          <img src={Ellipse.src} />
          <span>{total} ETH</span>
        </div>
      </div>

      <FinalizeButton />
    </div>
  );
};

export default Checkout;
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import CartItem from "./CartItem";
import styles from "../styles/OverlayCheckout.module.scss";
import Ellipse from "../utils/images/Ellipse 770.svg";
import Arrow from "../utils/images/Arrow - Left.svg";
import FinishedButton from "./FinishedButton";

interface OverlayCheckoutProps {
  isVisible: boolean;
  onClose: () => void;
}

const OverlayCheckout: React.FC<OverlayCheckoutProps> = ({ isVisible, onClose }) => {
  const { items, total } = useSelector((state: RootState) => state.cart);

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.containerBar}>
        <button className={styles.backButton} onClick={onClose}>
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
      
      <FinishedButton  onClose={()=>{onClose()}}/>
    </div>
  );
};

export default OverlayCheckout;
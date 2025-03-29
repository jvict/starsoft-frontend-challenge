import { useSelector } from "react-redux";
import { RootState } from "../store";
import CartItem from "./CartItem";
import styles from "../styles/OverlayCheckout.module.scss";
import Ellipse from "../utils/images/Ellipse 770.svg";
import Arrow from "../utils/images/Arrow - Left.svg";

interface OverlayCheckoutProps {
  isVisible: boolean;
  onClose: () => void;
}

const OverlayCheckout: React.FC<OverlayCheckoutProps> = ({ isVisible, onClose }) => {
  const { items, total } = useSelector((state: RootState) => state.cart);

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      {/* Barra Superior */}
      <div className={styles.containerBar}>
        {/* Botão Voltar */}
        <button className={styles.backButton} onClick={onClose}>
          <img src={Arrow.src} className={styles.arrowIcon} />
        </button>

        {/* Título Centralizado */}
        <p className={styles.title}>Mochila de Compras</p>
      </div>

      {/* Lista de Itens no Carrinho */}
      <div className={styles.cartItems}>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Total */}
      <div className={styles.total}>
        TOTAL
        <div className={styles.sectionIconTotal}>
          <img src={Ellipse.src} />
          <span>{total} ETH</span>
        </div>
      </div>

      {/* Botão Finalizar Compra */}
      <button className={styles.checkoutButton}>FINALIZAR COMPRA</button>
    </div>
  );
};

export default OverlayCheckout;
"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlie";
import styles from "../styles/ProductCard.module.scss";
import Ellipse from "../utils/images/Ellipse 770.svg";

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    description : string;
  };
  onAddToCart: () => void; // Nova prop para controlar o overlay
}

const ProductCard: React.FC<ProductProps> = ({ product, onAddToCart }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Adiciona o produto ao carrinho
    onAddToCart(); // Controla a exibição do overlay
  };

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} className={styles.productImage} />
      <div className={styles.productDetails}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productPrice}>
          <img src={Ellipse.src} alt="Carrinho" className={styles.ellipseIcon} />
          <span className={styles.priceValue}>{product.price} ETH</span>
        </p>
        <button className={styles.buyButton} onClick={handleAddToCart}>
          COMPRAR
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
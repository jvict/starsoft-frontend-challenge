"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlie";
import styles from "../styles/ProductCard.module.scss";
import Ellipse from "../utils/images/Ellipse 770.svg";
import { useRouter } from "next/router";

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    description: string;
  };
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductProps> = ({ product, onAddToCart }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    dispatch(addToCart(product));
    onAddToCart();
  };

  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div className={styles.card}>
      <div  onClick={handleCardClick}>
        <img src={product.image} alt={product.name} className={styles.productImage} />
        <div className={styles.productDetails}>
          <h3 className={styles.productName}>{product.name}</h3>
          <p className={styles.productPrice}>
            <img src={Ellipse.src} alt="Carrinho" className={styles.ellipseIcon} />
            <span className={styles.priceValue}>{product.price} ETH</span>
          </p>

        </div>
      </div>
      <button className={styles.buyButton} onClick={handleAddToCart}>
        COMPRAR
      </button>
    </div>
  );
};

export default ProductCard;
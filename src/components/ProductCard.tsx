"use client";
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlie';
import styles from "../styles/ProductCard.module.scss";

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity:number
  };
}


const ProductCard = ({ product }: any) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} className={styles.productImage} />
      <div className={styles.productDetails}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productPrice}>
          <span className={styles.priceValue}>{product.price} ETH</span>
        </p>
        <button className={styles.buyButton} onClick={() => dispatch(addToCart(product))}>Comprar</button>
      </div>
    </div>
  );
};

export default ProductCard;
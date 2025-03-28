import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { increaseQuantity, decreaseQuantity, removeItem } from '../store/slices/cartSlie';
import styles from '../styles/OverlayCheckout.module.scss';

const OverlayCheckout: React.FC = () => {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className={styles.overlay}>
      <h2>Mochila de Compras</h2>
      <div className={styles.cartItems}>
        {items.map((item) => (
          <div className={styles.cartItem} key={item.id}>
            <img src={item.image} alt={item.name} />
            <div>
              <h4>{item.name}</h4>
              <span>{item.price} ETH</span>
              <div>
                <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                {item.quantity}
                <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
              </div>
            </div>
            <button onClick={() => dispatch(removeItem(item.id))}>🗑️</button>
          </div>
        ))}
      </div>
      <div className={styles.total}>
        Total: {total} ETH
      </div>
      <button>Finalizar Compra</button>
    </div>
  );
};

export default OverlayCheckout;
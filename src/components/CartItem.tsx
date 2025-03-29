import styles from "../styles/CartItem.module.scss";
import { useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeItem } from "../store/slices/cartSlie";
import Ellipse from "../utils/images/Ellipse 770.svg";
import Delete from "../utils/images/Delete.svg";

interface CartItemProps {
    item: {
        id: string;
        name: string;
        description?: string;
        price: number;
        quantity: number;
        image: string;
    };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const dispatch = useDispatch();

    return (
        <div className={styles.card}>
            {/* Imagem do Produto */}
            <img src={item.image} alt={item.name} className={styles.image} />
            <div className={styles.containerControls}>
                <div className={styles.info}>
                    <h4 className={styles.name}>{item.name}</h4>
                    <div className={styles.priceBlock}>
                        <img src={Ellipse.src} className={styles.ellipseIcon} />
                        <span className={styles.price}>{item.price} ETH</span>
                    </div>
                </div>

                {/* Controles e Botão Delete na mesma linha */}
                <div className={styles.containerAddDecreseDelete}>
                    {/* Controles de Quantidade */}
                    <div className={styles.controls}>
                        <button
                            className={styles.decrease}
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                        >
                            -
                        </button>
                        <span className={styles.quantity}>{item.quantity}</span>
                        <button
                            className={styles.increase}
                            onClick={() => dispatch(increaseQuantity(item.id))}
                        >
                            +
                        </button>
                    </div>

                    {/* Botão de Remover */}
                    <button
                        className={styles.remove}
                        onClick={() => dispatch(removeItem(item.id))}
                    >
                        <img src={Delete.src} alt="Delete" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.scss";
import BagtIcon from "../utils/images/Bag.svg"; 
import Logo from "../utils/images/logo 1.svg";
import { RootState } from "../store";
import { useSelector } from "react-redux";


const Navbar = () => {
  const router = useRouter();
  const { items, total } = useSelector((state: RootState) => state.cart);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={Logo.src} alt="Starsoft Logo" className={styles.logoImage} />
      </div>
      <div className={styles.cartIcon}>
        <img src={BagtIcon.src} alt="Carrinho" className={styles.basketIcon} onClick={() => router.push("/checkout")} />
        <span className={styles.cartCount}>{items.length}</span>
      </div>
    </nav>
  );
};

export default Navbar;


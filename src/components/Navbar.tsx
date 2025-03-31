import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.scss";
import BagtIcon from "../utils/images/Bag.svg"; 
import Logo from "../utils/images/logo 1.svg";
import { RootState } from "../store";
import { useSelector } from "react-redux";


const Navbar = () => {
  const router = useRouter();
  const { items } = useSelector((state: RootState) => state.cart);

  return (
    <nav className={styles.navbar}>
      <div>
        <img src={Logo.src} alt="Starsoft Logo" className={styles.logoImage} onClick={()=>{router.push("/")}}/>
      </div>
      <div className={styles.cartIcon}>
        <img src={BagtIcon.src} alt="Carrinho" className={styles.basketIcon} onClick={() => router.push("/checkout")} />
        <span className={styles.cartCount}>{items.length}</span>
      </div>
    </nav>
  );
};

export default Navbar;


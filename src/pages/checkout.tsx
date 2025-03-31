import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/router";
import Head from 'next/head';
import Image from 'next/image';
import styles from "../styles/Checkout.module.scss";
import CartItem from "@/components/CartItem";
import Arrow from "../utils/images/Arrow - Left.svg";
import Ellipse from "../utils/images/Ellipse 770.svg";
import FinishedButton from "../components/FinishedButton";

const Checkout = () => {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Checkout - Mochila de Compras</title>
        <meta name="description" content="Finalize sua compra e revise os itens em sua mochila de compras." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://starsoft-frontend-challenge/checkout" />
      </Head>

      <main className={styles.checkoutContainer}>
        <header className={styles.containerBar}>
          <button 
            className={styles.backButton} 
            onClick={() => router.back()}
            aria-label="Voltar para a página anterior"
          >
            <Image src={Arrow} alt="" width={24} height={24} className={styles.arrowIcon} />
          </button>

          <h1 className={styles.title}>Mochila de Compras</h1>
        </header>

        <section className={styles.cartItems} aria-label="Itens na mochila">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </section>

        <footer className={styles.total}>
          <h2>TOTAL</h2>
          <div className={styles.sectionIconTotal}>
            <Image src={Ellipse} alt="" width={24} height={24} />
            <span>{total} ETH</span>
          </div>
        </footer>

        <FinishedButton />
      </main>
    </>
  );
};

export default Checkout;
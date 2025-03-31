import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/Product.module.scss";
import Ellipse from "../../utils/images/Ellipse 770.svg";
import { RootState } from "../../store";
import { addToCart } from "../../store/slices/cartSlie";
import { fetchProducts } from "../../services/productService";
import { setProducts } from "../../store/slices/productSlice"; 

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

const Product = () => {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products.products);
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadProduct = async () => {
            if (id) {
                if (products.length === 0) {
                    try {
                        const fetchedProducts = await fetchProducts();
                        dispatch(setProducts(fetchedProducts.data));
                        const foundProduct = fetchedProducts.data.find((p : Product) => p.id === id);
                        if (foundProduct) {
                            setProduct(foundProduct);
                        }
                    } catch (error) {
                        console.error("Erro ao carregar produtos:", error);
                    }
                } else {
                    const foundProduct = products.find(p => p.id.toString() === id.toString());
                    if (foundProduct) {
                        setProduct(foundProduct);
                    }
                }
            }
            setIsLoading(false);
        };

        loadProduct();
    }, [id, products, dispatch]);

    const handleBuyClick = () => {
        if (product) {
            dispatch(addToCart({id: product.id, description:product.description, image:product.image, name:product.name,price:product.price,quantity:0}));

        }
    };

    if (isLoading) return <div>Carregando...</div>;

    if (!product) return <div>Produto não encontrado</div>;

    return (
        <div className={styles.productContainer}>
            <div className={styles.productContent}>
                <img src={product.image} alt={product.name} className={styles.productImage} />
                <div className={styles.productInfo}>
                    <h1 className={styles.productName}>{product.name}</h1>
                    <p className={styles.productDescription}>{product.description}</p>
                    <div className={styles.productPrice}>
                        <img src={Ellipse.src} alt="ETH" className={styles.ethIcon} />
                        <span>{product.price} ETH</span>
                    </div>
                    <button className={styles.buyButton} onClick={handleBuyClick}>COMPRAR</button>
                </div>
            </div>
        </div>
    );
};

export default Product;
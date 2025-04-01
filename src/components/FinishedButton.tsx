import React from "react";
import { useState } from "react";
import styles from "../styles/FinishedButton.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "@/store/slices/cartSlie";
import { RootState } from "@/store";


interface FinishedButtonProps {
  onClose?: () => void;
}

const FinishedButton: React.FC<FinishedButtonProps> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);

  const handleClick = () => {
    if (total > 0) {
      if (isLoading || isCompleted) return;

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsCompleted(true);

        dispatch(clearState());
        if (onClose) onClose()
      }, 3000);

    } else {
      console.warn("Nenhum produto no carrinho ! ")
    }
  };

  return (
    <button
      className={`${styles.finalizeButton} ${isLoading || isCompleted ? styles.disabled : ""}`}
      onClick={handleClick}
      disabled={isLoading || isCompleted}
    >
      {isLoading ? "Carregando..." : isCompleted ? "Compra Finalizada" : "FINALIZAR COMPRA"}
    </button>
  );
};

export default FinishedButton;
// components/FinalizeButton.tsx
import { useState } from "react";
import styles from "../styles/FinishedButton.module.scss";

const FinalizeButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleClick = () => {
    if (isLoading || isCompleted) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsCompleted(true);
    }, 3000); 
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

export default FinalizeButton;
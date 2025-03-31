import { useState } from "react";
import styles from "../styles/FinishedButton.module.scss";
import { useDispatch } from "react-redux";
import { clearState } from "@/store/slices/cartSlie";


interface FinishedButtonProps {
  onClose?: () => void;
}

const FinishedButton : React.FC<FinishedButtonProps> = ({onClose}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
 
    if (isLoading || isCompleted) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsCompleted(true);

      dispatch(clearState());
      if (onClose) onClose()
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

export default FinishedButton;
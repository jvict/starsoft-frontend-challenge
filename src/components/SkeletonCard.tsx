import React from "react";
import styles from "../styles/SkeletonCard.module.scss";

const SkeletonCard: React.FC = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.imagePlaceholder}></div>
      <div className={styles.textPlaceholder}></div>
      <div className={styles.textPlaceholder}></div>
      <div className={styles.buttonPlaceholder}></div>
    </div>
  );
};

export default SkeletonCard;
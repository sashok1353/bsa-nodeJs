import React from "react";

import styles from "./WinnerModal.module.css";

const WinnerModal = ({ winner }) => {
  return (
    <div className={styles.modalLayer}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <span> Winner is {winner}!!! Congratulations!</span>
          <div className={styles.closeButton} onClick={() => window.location.reload(false)}>
            ×
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;

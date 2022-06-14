import React from "react";

import styles from "./HealthBar.module.css";

const HealthBar = ({ fighter, position }) => {
  return (
    <div className={styles.container}>
      <div className={styles.fighterName}>{fighter.name}</div>
      <div className={styles.indicator}>
        <div
          className={`${styles.healthBar} ${position}`}
          style={{ width: (100 * fighter.health) / fighter.fullHP + "%" }}
        ></div>
      </div>
    </div>
  );
};

export default HealthBar;

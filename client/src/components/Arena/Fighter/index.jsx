import React from "react";

import styles from "./Fighter.module.css";

const Fighter = ({ fighter, position }) => {
  return (
    <div className={position === "right" ? `${styles.fighterElementRight}` : undefined}>
      <img
        src={
          position === "left"
            ? "http://25.media.tumblr.com/a47d7ba3ee6a85c9f62b889422ac506b/tumblr_mq05okTOmW1qeb49fo1_400.gif"
            : "https://media1.giphy.com/media/sMr8GWbIPvSfe/200w.gif"
        }
        alt={fighter.name}
        className={styles.fighterImage}
      />
    </div>
  );
};

export default Fighter;

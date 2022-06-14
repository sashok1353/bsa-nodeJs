import React from "react";
import Fighter from "./Fighter";

import styles from "./Arena.module.css";
import HealthBar from "./HealthBar";
import { fightReducer } from "../../reducers/fightReducer";
import { actionTypes } from "../../constants/actionTypes";
import WinnerModal from "./WinnerModal";
import { createFight } from "../../services/domainRequest/fightRequest";

const Arena = ({ leftFighter, rightFighter }) => {
  const initialState = {
    fightID: null,
    leftFighter: {
      ...leftFighter,
      fullHP: leftFighter.health,
      isBlocking: false,
      ultimateCooldown: false,
      keyCombination: [],
    },
    rightFighter: {
      ...rightFighter,
      fullHP: rightFighter.health,
      isBlocking: false,
      ultimateCooldown: false,
      keyCombination: [],
    },
  };

  const [state, dispatch] = React.useReducer(fightReducer, initialState);

  const [winner, setWinner] = React.useState(null);

  const handleWinner = (winner) => {
    setWinner(winner.name);
  };

  const initiateFight = async () => {
    const data = await createFight({
      fighter1: state.leftFighter.id,
      fighter2: state.rightFighter.id,
      log: [
        {
          fighter1Shot: 0,
          fighter2Shot: 0,
          fighter1Health: state.leftFighter.health,
          fighter2Health: state.rightFighter.health,
        },
      ],
    });
    if (!data && data.error) {
      alert(data.error);
    }

    dispatch({ type: "addID", payload: data.id });
  };

  React.useEffect(() => {
    document.body.addEventListener("keydown", (e) => {
      if (!e.repeat) {
        if (actionTypes.PlayerOneCriticalHitCombination.includes(e.code))
          state.leftFighter.keyCombination.push(e.code);

        if (actionTypes.PlayerTwoCriticalHitCombination.includes(e.code))
          state.rightFighter.keyCombination.push(e.code);

        if (state.leftFighter.keyCombination.length === 3) {
          dispatch({ type: actionTypes.PlayerOneCriticalHitCombination });
        }

        if (state.rightFighter.keyCombination.length === 3) {
          dispatch({ type: actionTypes.PlayerTwoCriticalHitCombination });
        }
        dispatch({ type: e.code, event: "down" });
      }
    });

    document.body.addEventListener("keyup", (e) => {
      if (!e.repeat) {
        if (state.leftFighter.keyCombination.includes(e.code))
          state.leftFighter.keyCombination.splice(
            state.leftFighter.keyCombination.indexOf(e.code),
            1
          );
        if (state.rightFighter.keyCombination.includes(e.code))
          state.rightFighter.keyCombination.splice(
            state.rightFighter.keyCombination.indexOf(e.code),
            1
          );
        dispatch({ type: e.code });
      }
    });

    initiateFight();
  }, []);

  React.useEffect(() => {
    if (state.leftFighter.ultimateCooldown) {
      setTimeout(() => {
        dispatch({ type: "removeCoolDownLeft" });
      }, 10000);
    }

    if (state.rightFighter.ultimateCooldown) {
      setTimeout(() => {
        dispatch({ type: "removeCoolDownRight" });
      }, 10000);
    }
  }, [state.leftFighter.ultimateCooldown, state.rightFighter.ultimateCooldown]);

  React.useEffect(() => {
    if (state.leftFighter.health === 0) {
      handleWinner(state.leftFighter);
    }

    if (state.rightFighter.health === 0) {
      handleWinner(state.rightFighter);
    }
  }, [state.leftFighter.health, state.rightFighter.health]);

  return (
    <div className={styles.arenaRoot}>
      {winner ? (
        <WinnerModal winner={winner} />
      ) : (
        <>
          <div className={styles.healthBars}>
            <HealthBar fighter={state.leftFighter} position={"left"} />
            <div className={styles.versusSign}></div>
            <HealthBar fighter={state.rightFighter} position={"right"} />
          </div>
          <div className={styles.fighters}>
            <div className={styles.battlefield}>
              <Fighter fighter={leftFighter} position={"left"} />
              <Fighter fighter={rightFighter} position={"right"} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Arena;

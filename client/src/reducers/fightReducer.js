import { actionTypes } from "../constants/actionTypes";
import { createLog } from "../services/domainRequest/fightRequest";
import { getDamage } from "../services/fightService";

const sendLog = async (fighter1HP, fighter2HP, fighter1D, fighter2D, fightID) => {
  const data = await createLog(
    {
      log: [
        {
          fighter1Health: fighter1HP,
          fighter2Health: fighter2HP,
          fighter1Shot: fighter1D,
          fighter2Shot: fighter2D,
        },
      ],
    },
    fightID
  );
  if (!data && data.error) {
    alert(data.error);
  }
};

export const fightReducer = (state, { type, event, payload }) => {
  let damage;
  switch (type) {
    case "addID":
      return {
        ...state,
        fightID: payload,
      };

    case actionTypes.PlayerOneAttack:
      damage = getDamage(state.leftFighter, state.rightFighter);
      if (!state.rightFighter.isBlocking && !state.leftFighter.isBlocking && event === "down") {
        const rHealth =
          state.rightFighter.health - damage <= 0 ? 0 : state.rightFighter.health - damage;
        sendLog(state.leftFighter.health, rHealth, damage, 0, state.fightID);
        return {
          ...state,
          rightFighter: {
            ...state.rightFighter,
            health: rHealth,
          },
        };
      }
      return { ...state };

    case actionTypes.PlayerTwoAttack:
      damage = getDamage(state.rightFighter, state.leftFighter);
      if (!state.rightFighter.isBlocking && !state.leftFighter.isBlocking && event === "down") {
        const lHealth =
          state.leftFighter.health - damage <= 0 ? 0 : state.leftFighter.health - damage;
        sendLog(lHealth, state.rightFighter.health, damage, 0, state.fightID);
        return {
          ...state,
          leftFighter: {
            ...state.leftFighter,
            health: lHealth,
          },
        };
      }
      return { ...state };

    case actionTypes.PlayerOneBlock:
      return {
        ...state,
        leftFighter: {
          ...state.leftFighter,
          isBlocking: !state.leftFighter.isBlocking,
        },
      };

    case actionTypes.PlayerTwoBlock:
      return {
        ...state,
        rightFighter: {
          ...state.rightFighter,
          isBlocking: !state.rightFighter.isBlocking,
        },
      };

    case actionTypes.PlayerOneCriticalHitCombination:
      if (!state.leftFighter.ultimateCooldown && !state.leftFighter.isBlocking) {
        damage = state.leftFighter.power * 2;
        const rHealth =
          state.rightFighter.health - damage < 0 ? 0 : state.rightFighter.health - damage;
        sendLog(state.leftFighter.health, rHealth, damage, 0, state.fightID);
        return {
          ...state,
          rightFighter: {
            ...state.rightFighter,
            health: state.rightFighter.health - damage < 0 ? 0 : state.rightFighter.health - damage,
          },
          leftFighter: {
            ...state.leftFighter,
            ultimateCooldown: true,
          },
        };
      }
      return {
        ...state,
      };

    case actionTypes.PlayerTwoCriticalHitCombination:
      if (!state.rightFighter.ultimateCooldown && !state.rightFighter.isBlocking) {
        damage = state.rightFighter.power * 2;
        const lHealth =
          state.leftFighter.health - damage < 0 ? 0 : state.rightFighter.health - damage;
        sendLog(lHealth, state.rightFighter.health, damage, 0, state.fightID);
        return {
          ...state,
          leftFighter: {
            ...state.leftFighter,
            health: state.leftFighter.health - damage < 0 ? 0 : state.rightFighter.health - damage,
          },
          rightFighter: {
            ...state.rightFighter,
            ultimateCooldown: true,
          },
        };
      }
      return {
        ...state,
      };

    case "removeCoolDownLeft":
      return {
        ...state,
        leftFighter: {
          ...state.leftFighter,
          ultimateCooldown: false,
        },
      };

    case "removeCoolDownRight":
      return {
        ...state,
        rightFighter: {
          ...state.leftFighter,
          ultimateCooldown: false,
        },
      };

    default:
      return { ...state };
  }
};

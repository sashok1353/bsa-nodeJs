const { fighter } = require("../models/fighter");

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during creation
  let { id, ...mockFighter } = fighter;

  Object.keys(mockFighter).forEach((prop) => {
    prop === "health" ? (mockFighter[prop] = 100) : (mockFighter[prop] = "");
  });

  let data =
    Object.keys(req.body).length !== Object.keys(mockFighter).length
      ? Object.assign({}, mockFighter, req.body)
      : req.body;

  const errorsMessage = validate(data);

  if (errorsMessage.length !== 0) {
    res.is400 = true;
    res.message = errorsMessage;
  }
  req.body = data;
  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during update
  let errorsMessage = validate({ ...req.body });

  if (Object.keys(req.body).length === 0) errorsMessage += "Nothing to update \n";

  if (errorsMessage.length !== 0) {
    res.is400 = true;
    res.message = errorsMessage;
  }
  next();
};

const validatePower = (power) => {
  return power && power <= 100 && power >= 1;
};

const validateHealth = (health) => {
  return health && health <= 120 && health >= 80;
};

const validateDefense = (defense) => {
  return defense && defense <= 10 && defense >= 1;
};

const validateName = (name) => {
  return isNaN(name);
};

const validate = (newFighter) => {
  let error = "";

  Object.keys(newFighter).forEach((prop) => {
    switch (prop) {
      case "health":
        if (!validateHealth(newFighter[prop])) {
          error += `Invalid health. \n`;
        }
        break;

      case "defense":
        if (!validateDefense(newFighter[prop])) {
          error += `Invalid defense. \n`;
        }
        break;

      case "power":
        if (!validatePower(newFighter[prop])) {
          error += `Invalid power. \n`;
        }
        break;

      case "name":
        if (!validateName(newFighter[prop])) {
          error += `Invalid name. \n`;
        }
        break;

      case "id":
        error += `Don't pass ID, please! \n`;
        break;

      default:
        error += `Wrong properties. \n`;
    }
  });

  return error;
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;

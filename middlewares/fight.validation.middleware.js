const { fight } = require("../models/fight");

const createFightValid = (req, res, next) => {
  let { id, ...mockFight } = fight;

  let data =
    Object.keys(req.body).length !== Object.keys(mockFight).length
      ? Object.assign({}, mockFight, req.body)
      : req.body;

  const errorsMessage = validate(data);

  if (errorsMessage.length !== 0) {
    res.is400 = true;
    res.message = errorsMessage;
  }
  next();
};

const updateFightValid = (req, res, next) => {
  let errorsMessage = "";

  const { log } = req.body;

  if (!log) errorsMessage += `Wrong log format \n`;
  else errorsMessage += validateLog(req.body.log);

  if (log && Object.keys(req.body).length === 0) errorsMessage += "Nothing to update \n";

  if (errorsMessage.length !== 0) {
    res.is400 = true;
    res.message = errorsMessage;
  }

  next();
};

exports.createFightValid = createFightValid;
exports.updateFightValid = updateFightValid;

const validateFighterID = (fighterID) => {
  return fighterID;
};

const validateLog = (log) => {
  let error = "";

  if (log.length === 0) return (error += `Empty log. \n`);

  const mockLog = {
    fighter1Shot: "",
    fighter2Shot: "",
    fighter1Health: "",
    fighter2Health: "",
  };

  const checkLogs = log.map((obj) =>
    Object.keys(log).length !== Object.keys(mockLog).length ? Object.assign({}, mockLog, obj) : obj
  );

  checkLogs.forEach((obj, index) =>
    Object.keys(obj).forEach((prop) => {
      switch (prop) {
        case "fighter1Shot":
          if (isNaN(parseFloat(obj[prop]))) {
            error += `Invalid first fighter damage value in ${index + 1} log. \n`;
          }
          break;
        case "fighter2Shot":
          if (isNaN(parseFloat(obj[prop]))) {
            error += `Invalid second fighter damage value in ${index + 1} log. \n`;
          }
          break;
        case "fighter1Health":
          if (isNaN(parseFloat(obj[prop]))) {
            error += `Invalid first fighter health value in ${index + 1} log. \n`;
          }
          break;
        case "fighter2Health":
          if (isNaN(parseFloat(obj[prop]))) {
            error += `Invalid second fighter health value in ${index + 1} log. \n`;
          }
          break;
        default:
          error += `Wrong property in ${index + 1} log. \n`;
      }
    })
  );
  return error;
};

const validate = (newFight) => {
  let error = "";

  Object.keys(newFight).forEach((prop) => {
    switch (prop) {
      case "fighter1":
        if (!validateFighterID(newFight[prop])) {
          error += `Invalid email. \n`;
        }
        break;

      case "fighter2":
        if (!validateFighterID(newFight[prop])) {
          error += `Password must be min 3 characters. \n`;
        }
        break;

      case "log":
        error += validateLog(newFight[prop]);
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

const { user } = require("../models/user");
const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during creation

  let { id, ...mockUser } = user;

  let data =
    Object.keys(req.body).length !== Object.keys(mockUser).length
      ? Object.assign({}, mockUser, req.body)
      : req.body;

  const errorsMessage = validate(data);

  if (errorsMessage.length !== 0) {
    res.is400 = true;
    res.message = errorsMessage;
  }
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  let errorsMessage = validate({ ...req.body });

  if (Object.keys(req.body).length === 0) errorsMessage += "Nothing to update \n";

  if (errorsMessage.length !== 0) {
    res.is400 = true;
    res.message = errorsMessage;
  }
  next();
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;

const validateEmail = (mail) => {
  return mail && mail.match(/^\w+([\.-]?\w+)*@gmail.com/);
};

const validatePhone = (phoneNumber) => {
  return phoneNumber && phoneNumber.match(/\+380[0-9]{9}$/);
};

const validatePassword = (password) => {
  return password && password.length >= 3;
};

const validateLastName = (lastName) => {
  return isNaN(lastName);
};

const validateFirstName = (firstName) => {
  return isNaN(firstName);
};

const validate = (newUser) => {
  let error = "";

  Object.keys(newUser).forEach((prop) => {
    switch (prop) {
      case "email":
        if (!validateEmail(newUser[prop])) {
          error += `Invalid email. \n`;
        }
        break;

      case "password":
        if (!validatePassword(newUser[prop])) {
          error += `Password must be min 3 characters. \n`;
        }
        break;

      case "phoneNumber":
        if (!validatePhone(newUser[prop])) {
          error += `Invalid number format. \n`;
        }
        break;

      case "lastName":
        if (!validateLastName(newUser[prop])) {
          error += `Invalid last name. \n`;
        }
        break;

      case "firstName":
        if (!validateFirstName(newUser[prop])) {
          error += `Invalid first name. \n`;
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

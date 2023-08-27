const validator = require("validator");

/**================================================================
 * Check email is valid
 ================================================================*/
const checkEmail = (email) => {
  let emailValid;
  if (validator.isEmail(email)) {
    emailValid = true;
  } else {
    emailValid = false;
  }
  return emailValid;
};

/**================================================================
 * Transform name without accent and lowercase
 ================================================================*/
const nameTransformFormat = (name) => {
  const nameWithoutAccent = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const nameLowerCase = nameWithoutAccent.toLowerCase();
  return nameLowerCase;
};

/**================================================================
 * Check password is valid
 ================================================================*/
const checkPassword = (password) => {
  console.log("Je suis ici ==> ");
  const isNonWhiteSpace = /^\S*$/;
  if (!isNonWhiteSpace.test(password)) {
    console.log("1");
    return 1;
  }

  const isContainsUppercase = /^(?=.*[A-Z]).*$/;
  if (!isContainsUppercase.test(password)) {
    console.log("2");
    return 2;
  }

  const isContainsLowercase = /^(?=.*[a-z]).*$/;
  if (!isContainsLowercase.test(password)) {
    console.log("3");
    return 3;
  }

  const isContainsNumber = /^(?=.*[0-9]).*$/;
  if (!isContainsNumber.test(password)) {
    console.log("4");
    return 4;
  }

  const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
  if (!isContainsSymbol.test(password)) {
    console.log("5");
    return 5;
  }

  const isValidLength = /^.{10,16}$/;
  if (!isValidLength.test(password)) {
    console.log("6");
    return 6;
  }

  return true;
};

module.exports = { checkEmail, nameTransformFormat, checkPassword };

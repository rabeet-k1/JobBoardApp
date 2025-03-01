import { constants } from "@/constants";

export const openSnackAlert = (messageee, typeee) => {
  constants.snackAlert.openSnack(messageee, typeee);
};

export const checkValidEmail = (email) => {
  const stringWithoutSpaces = email.replace(/\s/g, "");

  let regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return regexForEmail.test(stringWithoutSpaces);
};

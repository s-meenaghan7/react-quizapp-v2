class FormValidator {
  public validateEmail(email: string): boolean | string{
    if (!email.includes("@"))
      return false;

    const splitEmail: string[] = email.trim().split("@");
    if (splitEmail.length !== 2)
      return false;

    return splitEmail[0].trim().length === 0 && splitEmail[1].trim().length === 0
    ||
    "Email is invalid";
  }

  public validatePassword(password: string): boolean | string { 
      return ((password.length >= 8) &&
        (!!password.match(/[A-Z]+/)) &&
        (!!password.match(/[a-z]+/)) &&
        (!!password.match(/[0-9]+/)) &&
        (!!password.match(/[$@#&!]+/)))
        ||
        "Password does not match criteria";
  }
}

export default new FormValidator();

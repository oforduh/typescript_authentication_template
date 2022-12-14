import { body } from "express-validator";

export const createUserSchema = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .trim()
    .withMessage("A valid email is required"),

  body("username")
    .trim()
    .isString()
    .isLength({ min: 2 })
    .withMessage("First name is required"),

  body("fName")
    .trim()
    .isString()
    .isLength({ min: 2 })
    .withMessage("First name is required"),

  body("lName")
    .trim()
    .isString()
    .isLength({ min: 2 })
    .withMessage("Last name is required"),

  body("phoneNumber")
    .trim()
    .isMobilePhone(["en-NG"])
    .isLength({ min: 9, max: 15 })
    .withMessage("Please provide a valid phoneNumber"),

  body("password")
    .trim()
    .isString()
    .isLength({ min: 2 })
    .withMessage("Password is required"),
  // .isStrongPassword(),
];

export const signinSchema = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .trim()
    .withMessage("Incorrect email"),

  body("password")
    .trim()
    .isLength({ min: 2 })
    .withMessage("password should not be less than"),
];

export const changePasswordSchema = [
  body("old_password")
    .trim()
    .isLength({ min: 2 })
    .withMessage("password should not be less than 2"),

  body("new_password")
    .trim()
    .isLength({ min: 2 })
    .withMessage("password should not be less than 2"),
];
export const recoverPasswordSchema = [
  body("email").isEmail().normalizeEmail().trim().withMessage("Invalid email"),
];

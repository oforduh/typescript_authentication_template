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

import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

export const authorize = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "longer-secret-is-better");
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed!" });
  }
};

export const registerValidation = () => {
  return [
    check("name")
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage("Name must be atleast 3 characters long"),
    check("email", "Email is required").not().isEmpty(),
    check(
      "PasswordValidation.password",
      "Password should be between 8 to 20 characters long"
    )
      .not()
      .isEmpty()
      .isLength({ min: 8, max: 20 }),
    check(
      "PasswordValidation.repeatpassword",
      "RepeatPassword should be between 8 to 20 characters long"
    )
      .not()
      .isEmpty()
      .isLength({ min: 8, max: 20 }),
    check("roles").not().isEmpty(),
  ];
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  } else {
    return next();
  }
};

import express from "express";
import {
  authorize,
  registerValidation,
  validate,
} from "@/middlewares/auth.middleware";
import AuthController from "@/controllers/auth.controller";

const router = express.Router();

// Sign-up
router.post(
  "/register-user",
  registerValidation(),
  validate,
  AuthController.register
);

// Sign-in
router.post("/signin", AuthController.signIn);

// Get Users
router.route("/users").get(authorize, AuthController.getUsers);

// Get Single User with authorize
router.route("/user-profile/:id").get(authorize, AuthController.getUserById);

// Update User
router.route("/update-user/:id").put(authorize, AuthController.updateUser);

// Delete User
router.route("/delete-user/:id").delete(authorize, AuthController.deleteUser);

module.exports = router;

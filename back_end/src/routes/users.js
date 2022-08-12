import express from "express";
import {
  getUser,
  createUser,
  loginUser,
  putUser,
  deleteUser,
  getReturnTokenData,
  getRetriveImageByPath
} from "../controllers/UsersController.js";

const router = express.Router();

router.get("/get_user/:userName?", getUser);
router.get("/get_token_data", getReturnTokenData);
router.post("/retrive_image_by_path", getRetriveImageByPath);
router.post("/create", createUser);
router.post("/login", loginUser);
router.put("/update", putUser);
router.delete("/delete", deleteUser);

export {router};

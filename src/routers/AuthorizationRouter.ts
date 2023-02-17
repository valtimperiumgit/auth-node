import express, { Router } from "express";
import AuthorizationController from "../controllers/AuthorizationController";
import {body} from "express-validator";
import { authMiddleware } from "../middleware/AuthMiddleware";

const authorizationRouter: Router = express.Router();

authorizationRouter.post("/login",
[
    body("email").notEmpty().isEmail(),
    body("password").notEmpty().isLength({min: 4, max: 10})
],
AuthorizationController.login);

authorizationRouter.post("/registration", 
[   
    body("name").isLength({min: 1, max: 20}),
    body("email").isEmail(),
    body("password").isLength({min: 3, max: 10})
],
AuthorizationController.registration);

authorizationRouter.get("/refresh", AuthorizationController.refresh);

authorizationRouter.get("/test", authMiddleware ,AuthorizationController.test);

export default authorizationRouter;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthorizationController_1 = __importDefault(require("../controllers/AuthorizationController"));
const express_validator_1 = require("express-validator");
const authorizationRouter = express_1.default.Router();
authorizationRouter.post("/login", [
    (0, express_validator_1.body)("email").notEmpty().isEmail(),
    (0, express_validator_1.body)("password").notEmpty().isLength({ min: 4, max: 10 })
], AuthorizationController_1.default.login);
authorizationRouter.post("/registration", [
    (0, express_validator_1.body)("name").isLength({ min: 1, max: 20 }),
    (0, express_validator_1.body)("email").isEmail(),
    (0, express_validator_1.body)("password").isLength({ min: 3, max: 10 })
], AuthorizationController_1.default.registration);
exports.default = authorizationRouter;

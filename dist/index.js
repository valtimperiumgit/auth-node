"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthorizationRouter_1 = __importDefault(require("./src/routers/AuthorizationRouter"));
const configuration_1 = require("./configuration");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use('/api/authorization', AuthorizationRouter_1.default);
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(configuration_1.DB_URL);
        app.listen(configuration_1.PORT, () => console.log("Hello!"));
    }
    catch (e) {
        console.log(e);
    }
});
startApp();

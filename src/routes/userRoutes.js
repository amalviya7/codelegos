"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userRegistrationMiddleware_1 = __importDefault(require("../middlewares/userRegistrationMiddleware"));
const router = express_1.default.Router();
//signUp  
router.post('/signUp', userRegistrationMiddleware_1.default, userController_1.signUp_User);
router.get('/user/:id', userController_1.getUser);
exports.default = router;

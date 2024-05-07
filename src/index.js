"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const dbConfig_1 = require("../src/database/config/dbConfig");
const initModel_1 = require("./database/sequelize/initModel");
const transactionId_1 = require("./middlewares/transactionId");
const routes_1 = require("./routes");
const swagger_1 = __importDefault(require("./utils/swagger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.APP_PORT || 3001;
app.use(express_1.default.json());
app.use(transactionId_1.transactionIdMiddleware);
app.use(transactionId_1.logger);
app.use(transactionId_1.loggerSuccess);
try {
    (0, initModel_1.initModel)(dbConfig_1.sequelize);
    // sequelize.sync({force: true})
    dbConfig_1.sequelize.sync();
    console.log('Table created successfully');
}
catch (err) {
    console.log(err, 'error occured');
}
(0, swagger_1.default)(app);
(0, routes_1.setupRoutes)(app);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

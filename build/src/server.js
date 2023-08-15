"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = parseInt(`${process.env.PORT}`) || 3000;
const whitelist = [process.env.LOCALHOST];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
//ROUTES
app.use(require("./routes/user/user.route"));
app.use(require("./routes/login/login.route"));
app.use(require("./routes/password/password.route"));
app.listen(port, () => {
    console.log(`Server is running in PORT: ${port}`);
});
//# sourceMappingURL=server.js.map
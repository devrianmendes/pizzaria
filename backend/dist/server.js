"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const router_1 = require("./router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(router_1.router);
app.use('/tmp', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp')));

app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
});

app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message,
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
const port = 3333;
app.listen(port, () => console.log("Servidor online"));

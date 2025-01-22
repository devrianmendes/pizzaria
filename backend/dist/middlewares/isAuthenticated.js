"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end;
    }
    const [, token] = authToken.split(" ");
    if (!process.env.SECRET) {
        throw new Error("Erro interno.");
    }
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.SECRET);
        req.user_id = sub;
    }
    catch (error) {
        return res.status(401).end();
    }
    return next();
}

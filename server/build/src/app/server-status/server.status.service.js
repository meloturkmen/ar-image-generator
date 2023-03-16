"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoutes = void 0;
const server_1 = __importDefault(require("../../server"));
const getRoutes = () => {
    let route;
    const routes = [];
    server_1.default._router.stack.forEach((middleware) => {
        if (middleware.route) { // routes registered directly on the app
            routes.push(middleware.route);
        }
        else if (middleware.name === 'router') { // router middleware 
            middleware.handle.stack.forEach((handler) => {
                route = handler.route;
                route && routes.push(route);
            });
        }
    });
    return routes;
};
exports.getRoutes = getRoutes;

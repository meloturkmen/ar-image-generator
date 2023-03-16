"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const endpoint_1 = require("../../constants/endpoint");
const server_status_service_1 = require("./server.status.service");
exports.router = (0, express_1.Router)();
// getStatus
exports.router.get(endpoint_1.SERVER_STATUS_ENDPOINT + "/", (req, res) => {
    res.status(200).send({
        "status": "server is running"
    });
});
// getRoutes
exports.router.get(endpoint_1.SERVER_STATUS_ENDPOINT + "/routes", (req, res) => {
    const routes = (0, server_status_service_1.getRoutes)();
    res.status(200).send({
        numberOfRoutes: routes.length,
        routes: routes
    });
});

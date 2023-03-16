"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const config_json_1 = __importDefault(require("../config.json"));
// Start the application by listening to specific port
const port = Number(process.env.PORT || config_json_1.default.PORT || 8080);
server_1.default.listen(port, () => {
    console.info('Express application started on port: ' + port);
});

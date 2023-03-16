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
exports.router = void 0;
const express_1 = require("express");
const chat_controller_1 = require("../controllers/chat.controller");
const azure_service_1 = __importDefault(require("../services/azure.service"));
;
// Export module for registering router in express app
exports.router = (0, express_1.Router)();
const azureService = new azure_service_1.default();
const upload = azureService.upload();
exports.router.post('/upload', upload.single('file'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const sceneId = req.body.sceneID;
    const fileContent = yield azureService.uploadFile(file, sceneId);
    res.status(200).json({
        message: 'File uploaded successfully',
        fileContent
    });
}));
exports.router.get('/chat', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Hello World');
    res.status(200).json({
        message: 'Hello World'
    });
}));
exports.router.post('/image', chat_controller_1.getImageFromAPI);
exports.router.post('/chat', chat_controller_1.createChat);

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageFromAPI = exports.createChat = void 0;
const openai_service_1 = require("../services/openai.service");
const imageConverter_1 = require("../helpers/imageConverter");
const createChat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.body;
    try {
        const image = yield (0, openai_service_1.createImage)(message);
        res.status(200).json({
            image,
        });
    }
    catch (e) {
        res.status(400).json({
            error: e,
        });
    }
});
exports.createChat = createChat;
const getImageFromAPI = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { image } = req.body;
    try {
        const base64 = yield (0, imageConverter_1.getBase64)(image);
        res.status(200).json({
            image: `data:image/png;base64,${base64}`
        });
    }
    catch (e) {
        res.status(400).json({
            error: e,
        });
    }
});
exports.getImageFromAPI = getImageFromAPI;

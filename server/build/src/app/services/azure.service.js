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
const storage_blob_1 = require("@azure/storage-blob");
const multer_1 = __importDefault(require("multer"));
class AzureService {
    constructor() {
        this.containerName = process.env.AZURE_CONTAINER_NAME;
        this.accountName = process.env.AZURE_ACCOUNT_NAME;
        this.accountKey = process.env.AZURE_STORAGE_CONNECTION_STRING;
        const azureClient = storage_blob_1.BlobServiceClient.fromConnectionString(this.accountKey);
        this.containerClient = azureClient.getContainerClient(this.containerName);
    }
    upload() {
        return (0, multer_1.default)({
            storage: multer_1.default.memoryStorage(),
            limits: { fileSize: 1000000000, files: 1 },
            fileFilter(req, file, cb) {
                if (!file.originalname.match(/\.(usdz|glb|gltf|png|jpg)$/)) {
                    return cb(new Error('Please upload a valid image file'));
                }
                cb(null, true);
            },
        });
    }
    uploadFile(file, id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("uploading file to azure storage");
            const [originalName, extension] = file.originalname.split('.');
            const file_name = `${originalName}.${extension}`;
            const blobName = `openai/${id}/${file_name}`;
            const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
            const uploadBlobResponse = yield blockBlobClient.upload(file.buffer, file.buffer.length);
            console.log(`File uploaded to ${blockBlobClient.url}`);
            return {
                url: blockBlobClient.url,
                filename: file_name,
                size: file.size,
                type: extension,
            };
        });
    }
    deleteFile(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.containerClient.deleteBlob(fileName);
            if (response._response.status !== 202) {
                throw new Error(`Error deleting ${fileName}`);
            }
        });
    }
    getFile(fileName) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    getFiles() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    getFilesByPrefix(prefix) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    formatBytes(bytes, decimals = 2) {
        if (!+bytes)
            return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }
    getBuild() {
    }
}
exports.default = AzureService;

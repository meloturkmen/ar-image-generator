"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilesWithKeyword = void 0;
const fs_1 = __importDefault(require("fs"));
const getFilesWithKeyword = (keyword, folderName, files_) => {
    files_ = (typeof files_ === 'undefined') ? [] : files_;
    const files = fs_1.default.readdirSync(folderName);
    for (let i in files) {
        let name = folderName + '/' + files[i];
        if (fs_1.default.statSync(name).isDirectory()) {
            (0, exports.getFilesWithKeyword)(keyword, name, files_);
        }
        else {
            name.includes(keyword) && files_.push(name);
        }
    }
    return files_;
};
exports.getFilesWithKeyword = getFilesWithKeyword;

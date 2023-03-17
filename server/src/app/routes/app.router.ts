import { Router, Response, Request, NextFunction } from "express";
import { createChat, getImageFromAPI } from "../controllers/chat.controller";
import AzureService from "../services/azure.service";
import azure from "azure-storage";

declare module 'express' {
    export interface Request {
        file?: Express.Multer.File;

    }
};


// Export module for registering router in express app
export const router: Router = Router();
import multer from "multer";

const azureService: AzureService = new AzureService();

const inMemoryStorage = multer.memoryStorage()
    , uploadStrategy = multer({ storage: inMemoryStorage }).single('file')


router.post('/upload', uploadStrategy, async (req: Request, res: Response, next: NextFunction) => {

    console.log('uploading file');

    const sceneId = req.body.sceneID as string;
    const fileName = req.body.fileName as string;

    const uploadURL = azureService.createFileUploadURL(sceneId, fileName);



    return res.status(200).json({
        message: 'File upload url generated successfully',
        uploadURL
    });
});



router.get('/chat', async (req: Request, res: Response, next: NextFunction) => {
    console.log('Hello World');
    res.status(200).json({
        message: 'Hello World'
    });
});


router.post('/image', getImageFromAPI);

router.post('/chat', createChat);


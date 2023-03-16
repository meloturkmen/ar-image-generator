import { Router, Response, Request, NextFunction } from "express";
import { createChat, getImageFromAPI } from "../controllers/chat.controller";
import AzureService from "../services/azure.service";


declare module 'express' {
    export interface Request {
        file?: Express.Multer.File;

    }
};


// Export module for registering router in express app
export const router: Router = Router();
const azureService: AzureService = new AzureService();
const upload = azureService.upload();



router.post('/upload', upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file as Express.Multer.File;
    const sceneId = req.body.sceneID as string;

    const fileContent = await azureService.uploadFile(file, sceneId);


    res.status(200).json({
        message: 'File uploaded successfully',
        fileContent
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


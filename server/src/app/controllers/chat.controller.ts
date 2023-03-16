import { Request, Response, NextFunction } from "express";
import { createImage } from "../services/openai.service";
import { getBase64 } from "../helpers/imageConverter";

const createChat = async (req: Request, res: Response, next: NextFunction) => {

    const { message } = req.body;

    try {
        const image: string = await createImage(message);

        res.status(200).json({
            image,
        });

    } catch (e) {
        res.status(400).json({
            error: e,
        });
    }

}

const getImageFromAPI = async (req: Request, res: Response, next: NextFunction) => {

    const { image } = req.body;

    try {
        const base64 = await getBase64(image as string);

        res.status(200).json({
            image: `data:image/png;base64,${base64}`
        });

    } catch (e) {
        res.status(400).json({
            error: e,
        });
    }

}


export { createChat ,getImageFromAPI};
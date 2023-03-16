import { OpenAIApi, Configuration } from "openai";
import { getBase64 } from "../helpers/imageConverter";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export const createImage = async (message: string) => {

    const apiResult = await openai
        .createImage({
            prompt: message,
            n: 1,
            size: '1024x1024',
        })
        .then((response) => {
            return response.data.data;
        });



    return apiResult[0].url as string;
}
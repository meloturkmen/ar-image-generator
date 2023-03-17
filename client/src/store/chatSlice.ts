
import { immer } from 'zustand/middleware/immer';
import { StateCreator } from 'zustand';
import axios from '../config/axiosClient';


type State = {

    loading: boolean;
    error: string | null;
    image: string | null;
};

type Actions = {
    sendMessage: (message: string) => Promise<void>;
    getImageFromAPI: (image: string | null) => Promise<string | null>;
    uploadFile: (file: File, id: string) => Promise<string>;
};

export type ChatState = State & Actions;

export const chatSlice: StateCreator<ChatState> = (set) => ({
    loading: false,
    error: null,
    image: null,
    sendMessage: async (message: string) => {
        set((state) => ({
            ...state,
            loading: true,
            error: null,
        }));

        try {
            const { data } = await axios.post('/chat', { message });
            set((state) => ({
                ...state,
                loading: false,
                image: data.image,
            }));


        } catch (e: any) {
            set((state) => ({
                ...state,
                loading: false,
                error: e.message,
            }));
        }

    },
    getImageFromAPI: async (image) => {
        if (!image) return null;
        set((state) => ({
            ...state,
            loading: true,
            error: null,
        }));


        console.log('getting image base64', image)
        const response = await axios.post('/image', { image: image }).then(res => res.data)

        set((state) => ({
            ...state,
            loading: false,
        }));

        return response.image as string;
    },
    uploadFile: async (file: File, id: string) => {

        const uploadURL = await axios.post('/upload', { sceneID: id, fileName: file.name }).then(res => res.data.uploadURL);

        return new Promise(async (resolve, reject) => {
            var req = new XMLHttpRequest();
            req.open("PUT", uploadURL);
            req.setRequestHeader("x-ms-blob-type", "BlockBlob");
            if (file.name.includes(".usdz")) {
                req.setRequestHeader("Content-Type", "model/vnd.usdz+zip");
            }
            req.onload = function (event: any) {
                console.log(
                    "uploadPutHandler1: ",
                    event.target,
                    "event.target.response: ",
                    event.target.response,
                    "event.target.responseURL: ",
                    event.target.responseURL
                );
                return resolve(event.target.responseURL); 
            };
            req.send(file);
        });

    }
});

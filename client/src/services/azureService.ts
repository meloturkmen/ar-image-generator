import { BlobServiceClient } from '@azure/storage-blob';

type IFileContent = {
    url: string;
    filename: string;
    type: string;
    size: number;
}


const AZURE_STORAGE_CONNECTION_STRING = process.env.REACT_APP_AZURE_STORAGE_CONNECTION_STRING as string;
const AZURE_CONTAINER_NAME = process.env.REACT_APP_AZURE_CONTAINER_NAME as string;
const AZURE_ACCOUNT_NAME = process.env.REACT_APP_AZURE_ACCOUNT_NAME as string;

console.log(AZURE_STORAGE_CONNECTION_STRING, AZURE_CONTAINER_NAME, AZURE_ACCOUNT_NAME)


const azureClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = azureClient.getContainerClient(AZURE_CONTAINER_NAME);


export const uploadFile = async (file: File, id: string): Promise<IFileContent> => {


    const [originalName, extension] = file.name.split('.');
    const file_name = `${originalName}.${extension}`;
    const blobName = `openai/${id}/${file_name}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } };
    // upload file
    await blockBlobClient.uploadData(file, options);

    console.log(`File uploaded to ${blockBlobClient.url}`);



    return {
        url: blockBlobClient.url,
        filename: file_name,
        size: file.size,
        type: extension,
    };
}


import { v4 as uuidv4 } from 'uuid';
import { BlobServiceClient } from '@azure/storage-blob';

import multer, { Multer } from 'multer';



type IFileContent = {
	url: string;
	filename: string;
	type: string;
	size: number;
}


class AzureService {
	containerName: string;
	accountName: string;
	accountKey: string;
	containerClient: any;

	constructor() {
		this.containerName = process.env.AZURE_CONTAINER_NAME as string;
		this.accountName = process.env.AZURE_ACCOUNT_NAME as string;
		this.accountKey = process.env.AZURE_STORAGE_CONNECTION_STRING as string;
		const azureClient = BlobServiceClient.fromConnectionString(this.accountKey);

		this.containerClient = azureClient.getContainerClient(this.containerName);
	}

	public async uploadFile(file: Express.Multer.File, id: string): Promise<IFileContent> {

		console.log("uploading file to azure storage");
		const [originalName, extension] = file.originalname.split('.');

		const file_name = `${originalName}.${extension}`;

		const blobName = `openai/${id}/${file_name}`;

		const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);

		const uploadBlobResponse = await blockBlobClient.upload(file.buffer, file.buffer.length);


		console.log(`File uploaded to ${blockBlobClient.url}`);
		return {
			url: blockBlobClient.url,
			filename: file_name,
			size: file.size,
			type: extension,
		};
	}

	public async deleteFile(fileName: string) {
		const response = await this.containerClient.deleteBlob(fileName);
		if (response._response.status !== 202) {
			throw new Error(`Error deleting ${fileName}`);
		}
	}

	public async getFile(fileName: string) { }

	public async getFiles() { }

	public async getFilesByPrefix(prefix: string) { }

	public formatBytes(bytes: number, decimals = 2): string {
		if (!+bytes) return '0 Bytes';

		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
	}

	public getBuild() {

	}

}

export default AzureService;

import { BlobSASPermissions, BlobServiceClient, BlockBlobClient, ContainerClient, SASProtocol } from "@azure/storage-blob";

export const generateReadOnlySASUrl = async (connectionString: string, containerName: string, filename: string) => {

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(filename);

    const accountSasTokenUrl = await blobClient.generateSasUrl({
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + (60 * 60 * 1000)),
        permissions: BlobSASPermissions.parse("r"), // Read only permission to the blob
        protocol: SASProtocol.Https, // Only allow HTTPS access to the blob
    });

    return {
        accountSasTokenUrl,
        storageAccountName: blobClient.accountName
    };
};

export const getContainerClient = (containerName: string) => {
    const connectionString = process.env.storageaccount;
    // const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    // const containerClient = blobServiceClient.getContainerClient(containerName);
    return new ContainerClient(connectionString, containerName); 
};

export const getBlobPaths = async (containerName: string, path: string) => {
    const filesList = [];
    const containerClient = getContainerClient(containerName);
    for await (const blob of containerClient.listBlobsFlat({ prefix: path + "/" })) {
        //let blobClient = await containerClient.getBlobClient(blob.name);
        filesList.push(`${containerClient.url}/${blob.name}`);
        //console.log(`https://schistorageaccount01.blob.core.windows.net/${blob.name}   ${blobClient.url}`);
    }
    return filesList;
};

export const saveBlob = async (containerName: string, folder: string, fileName: string, buffer: Buffer) => {
    const containerClient = getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(`${folder}\\${fileName}`);
    await blockBlobClient.uploadData(buffer);
    return `${containerClient.url}/${folder}/${fileName}`;
};

export const deleteBlob = async (containerName: string, folder: string, fileName: string) => {
    const containerClient = getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(`${folder}\\${fileName}`);
    if (await blockBlobClient.exists()) {
        await blockBlobClient.delete();
    }
    return `${containerClient.url}/${folder}/${fileName}`;
};
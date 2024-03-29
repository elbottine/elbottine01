import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import HTTP_CODES from "http-status-enum";
import * as multipart from "parse-multipart";
import { deleteBlob, generateReadOnlySASUrl, saveBlob } from './azure-storage-blob-sas-url';
import { checkUserAdmin } from "../account/security";

export const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {

    console.log(`l1 ====================================================`);
    context.log(`context.bindingData.id: ${JSON.stringify(context.bindingData)}`);
    //context.log(`blogpost req: ${JSON.stringify(req)}`);

    console.log(`req.method: ${req.method}`);
    console.log(`req.query: ${req.query}`);
    //console.log(`l3 process.env: ${JSON.stringify(req, null, 4)}`);
    console.log(`l4 ====================================================`);

    const containerName = 'blogposts-blobs';
    let id: string = null;
    let fileName: string = null;
    let response: string = null;

    try {
        switch (req.method) {
            case "POST":
                checkUserAdmin(context.bindingData.headers['x-custom-authorization']);

                id = context.bindingData.id;
                fileName = context.bindingData.filename;
                if (!req || !req.body) {
                    throw Error("No document found");
                }

                const bodyBuffer = Buffer.from(req.body);
                const boundary = multipart.getBoundary(req.headers["content-type"]);
                const parts = multipart.Parse(bodyBuffer, boundary);
        
                if (!parts || parts.length === 0 || !parts[0] || !parts[0].data) {
                    throw Error('File buffer is incorrect');
                }
                const buffer = parts[0].data;

                response = await saveBlob(containerName, id, fileName, buffer);
                break;
            case "DELETE":
                checkUserAdmin(context.bindingData.headers['x-custom-authorization']);

                id = context.bindingData.id;
                fileName = context.bindingData.filename;
                if (!fileName) {
                    throw Error("No filename given");
                }
                response = await deleteBlob(containerName, id, fileName);
                break;
            default:
                throw Error(`method ${req.method} not allowed`)
        }

        context.res.body = response;
    } catch (err) {
        context.log.error(err.message);
        context.res.body = { error: `${err.message}` };
        context.res.status = HTTP_CODES.INTERNAL_SERVER_ERROR;
    }

    return context.res;

    // get connection string to Azure Storage from environment variables
    // Replace with DefaultAzureCredential before moving to production
    const storageConnectionString = process.env.storageaccount;
    if (!storageConnectionString) {
        context.res.body = `AzureWebJobsStorage env var is not defined - get Storage Connection string from Azure portal`;
        context.res.status = HTTP_CODES.BAD_REQUEST
    }

    //const fileName = req.query?.filename;
    if (!fileName) {
        context.res.body = `filename is not defined`;
        context.res.status = HTTP_CODES.BAD_REQUEST
    }

    if (!req.body || !req.body.length) {
        context.res.body = `Request body is not defined`;
        context.res.status = HTTP_CODES.BAD_REQUEST
    }

    if (!req.headers || !req.headers["content-type"]) {
        context.res.body = `Content type is not sent in header 'content-type'`;
        context.res.status = HTTP_CODES.BAD_REQUEST
    }

    console.log(`l10 *** Filename:${req.query?.filename}, Content type:${req.headers["content-type"]}, Length:${req.body.length}`);

    try {

        const fileName = req.query?.filename;
        const containerName = 'blogposts-blobs';

        // Each chunk of the file is delimited by a special string
        const bodyBuffer = Buffer.from(req.body);
        const boundary = multipart.getBoundary(req.headers["content-type"]);
        const parts = multipart.Parse(bodyBuffer, boundary);

        // The file buffer is corrupted or incomplete ?
        if (!parts?.length) {
            context.res.body = `File buffer is incorrect`;
            context.res.status = HTTP_CODES.BAD_REQUEST
        }

        // filename is a required property of the parse-multipart package
        // if (parts[0]?.filename) context.log(`Original filename = ${parts[0]?.filename}`);
        // if (parts[0]?.type) context.log(`Content type = ${parts[0]?.type}`);
        // if (parts[0]?.data?.length) context.log(`Size = ${parts[0]?.data?.length}`);

        context.bindings.storage = parts[0]?.data;

        const sasInfo = await generateReadOnlySASUrl(storageConnectionString, containerName, fileName);

        context.res.body = {
            fileName,
            storageAccountName: sasInfo.storageAccountName,
            containerName,
            url: sasInfo.accountSasTokenUrl,
        };

    } catch (err) {
        context.log.error(err.message);
        context.res.body = { error: `${err.message}` };
        context.res.status = HTTP_CODES.INTERNAL_SERVER_ERROR;
    }

    return context.res;
};

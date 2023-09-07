import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";
import { getBlobPaths } from "../upload/azure-storage-blob-sas-url";
import * as db from "./db";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        let response = null;
        let id = null;

        context.log(`################################################################`);
        context.log(`context.bindingData.id: ${context.bindingData.id}`);
        context.log(`blogpost req: ${JSON.stringify(req)}`);
        context.log(`################################################################`);

        await db.init();

        switch (req.method) {
            case "GET":
                id = context.bindingData.id;
                if (id) {
                    const blogPost = await db.findItemById(id);
                    blogPost.paths = await getBlobPaths('blogposts-blobs', id);
                    response = blogPost;
                } else {
                    const dbQuery = req?.query?.dbQuery || (req?.body && req?.body?.dbQuery);
                    response = { blogposts: await db.findItems(dbQuery) }; // ?????????????????
                }          
                break;
            case "PUT":
                id = context.bindingData.id;
                if (!id) {
                    throw Error("No document id given");
                }

                var entry = await db.findItemById(id);
                if (!entry) {
                    throw Error(`Document '${id}' not found`);
                }

                entry.title = req.body.title;
                entry.text = req.body.text;
                response = await entry.save();
                break;
            case "POST":
                if (!req?.body) {
                    throw Error("No document found");
                }
                response = await db.addItem(req?.body);
                break;
            case "DELETE":
                id = context.bindingData.id;
                if (!id) {
                    throw Error("No document id given");
                }
                response = await db.deleteItemById(id);
                break;
            default:
                throw Error(`${req.method} not allowed`)
        }

        context.res = {
            body: response
        };

    } catch (err) {
        context.log(`*** Error ${JSON.stringify(err)}`);
        context.res = {
            status: 501,
            body: err,
        };
    }
};

export default httpTrigger;

import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getBlobPaths } from "../upload/azure-storage-blob-sas-url";
import * as db from "./db";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        let response = null;
        let id = null;

        context.log(`################################################################`);
        context.log(`context.bindingData.id: ${context.bindingData.id}`);
        context.log(`clubActivity req: ${JSON.stringify(req)}`);
        context.log(`################################################################`);

        await db.init();

        switch (req.method) {
            case "GET":
                id = context.bindingData.id;
                if (id) {
                    const entry = await db.findItemById(id);
                    entry.paths = await getBlobPaths('blogposts-blobs', id);
                    response = entry;
                } else if (req.query) {
                    response = { clubActivities: await db.findItems(req.query) };
                }
                break;
            case "PUT":
                id = context.bindingData.id;
                if (!id) {
                    throw Error("No document id");
                }
                if (!req?.body) {
                    throw Error("No document");
                }
                response = await db.updateItem(req.body);
                break;
            case "POST":
                if (!req?.body) {
                    throw Error("No document");
                }
                response = await db.addItem(req?.body);
                break;
            case "DELETE":
                id = context.bindingData.id;
                if (!id) {
                    throw Error("No document id");
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
        context.log(`*** Error ${err}`);
        context.log(`*** Error ${JSON.stringify(err)}`);
        context.res = {
            status: 501,
            body: err,
        };
    }
};

export default httpTrigger;

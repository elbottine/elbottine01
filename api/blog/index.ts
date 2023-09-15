import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getBlobPaths } from "../upload/azure-storage-blob-sas-url";
import * as db from "./db";
// email https://stackoverflow.com/questions/19509357/not-able-to-connect-to-outlook-com-smtp-using-nodemailer
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        context.log(`################################################################`);
        context.log(`blogpost id: ${context.bindingData.id}`);
        context.log(`blogpost entity: ${context.bindingData.entity}`);
        context.log(`blogpost req.query: ${JSON.stringify(req.query)}`);
        context.log(`################################################################`);

        let response = null;
        let entity = context.bindingData.entity;
        let id = null;

        await db.init();

        switch (req.method) {
            case "GET":
                id = context.bindingData.id;
                if (id) {
                    const entry = await db.findItemById(entity, id);
                    entry.paths = await getBlobPaths('blogposts-blobs', id);
                    response = entry;
                } else if (req.query) {
                    response = { list: await db.findItems(entity, req.query) };
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
                response = await db.updateItem(entity, req.body);
                break;
            case "POST":
                if (!req?.body) {
                    throw Error("No document");
                }
                response = await db.addItem(entity, req?.body);
                break;
            case "DELETE":
                id = context.bindingData.id;
                if (!id) {
                    throw Error("No document id");
                }
                response = await db.deleteItemById(entity, id);
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
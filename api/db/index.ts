import { Schema, model, connect } from "mongoose";

export const baseConfig = {
    discriminatorKey: "_type",
    collection: "col"
};

export const commonModel = model('Common', new Schema({}, baseConfig));

let db = null;

export const initDb = async () => {
    if (!db) {
        db = await connect(process.env["CosmosDbConnectionString"]);
    }
};
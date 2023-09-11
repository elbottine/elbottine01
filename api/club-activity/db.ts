import { Schema } from "mongoose";
import { baseConfig, commonModel, initDb } from "../db";

export const init = async () => {
    await initDb();
};

export interface IClubActivity {
    title:     string,
    date:      Date, 
    text:      string,
    paths:     string[],
    createdAt: Date,
    createdBy: string,
    updatedAt: Date,
    updatedBy: string
  }
    
const clubActivitySchema = {
    title:     { type: String, require: true },
    date:      { type: Date, required: false },
    text:      { type: String, require: true },
    paths:     [{ type: String, require: true }],
    createdAt: { type: Date, default: Date.UTC, index: true },
    createdBy: { type: String, require: true },
    updatedAt: { type: Date },
    updatedBy: { type: String }
};

const repository = commonModel.discriminator<IClubActivity>('clubactivity', new Schema(clubActivitySchema, baseConfig));

export const addItem = async (doc) => {
    const entry = new repository();
    entry.title= doc.title;
    entry.date= doc.date;
    entry.text= doc.text;
    entry.paths= doc.paths;
    entry.createdAt= new Date();
    entry.createdBy= doc.createdBy;
    entry.updatedAt= new Date();
    entry.updatedBy= doc.updatedBy;
    return await entry.save();
};

export const updateItem = async (doc) => {
    var entry = await repository.findById(doc._id);
    if (!entry) {
        throw Error(`Document '${doc._id}' not found`);
    }   
    entry.title= doc.title;
    entry.date= doc.date;
    entry.text= doc.text;
    entry.paths= doc.paths;
    entry.createdAt= new Date();
    entry.createdBy= doc.createdBy;
    entry.updatedAt= new Date();
    entry.updatedBy= doc.updatedBy;    
    entry.update();    
    return await entry.save();
};

export const findItemById = async (id) => {
    return await repository.findById(id);
};

export const findItems = async (query: any) => {
    var filter = query.title ? {title: {$regex: `.*${query.title}.*`, $options: 'i'}} : null;
    return await repository.find(filter).limit(20).sort({'createdAt': -1});
};

export const deleteItemById = async (id) => {
    return await repository.findByIdAndDelete(id);
};

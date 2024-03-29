import { Schema, model, connect, Model } from "mongoose";

const baseConfig = {
    discriminatorKey: "_type",
    collection: "col"
};

export const commonModel = model('Common', new Schema({}, baseConfig));

let db = null;
let cache = null;

export const init = async () => {
    if (!db) {
        db = await connect(process.env["CosmosDbConnectionString"]);
    }
    if (!cache) {
        cache = new Map();
    }
};

export interface IBlogBase {
    title:     string,
    date:      Date, 
    text:      string,
    paths:     string[],
    createdAt: Date,
    createdBy: string,
    updatedAt: Date,
    updatedBy: string
}

export interface IBlogPost extends IBlogBase {}
export interface IClubActivity extends IBlogBase {}

const blogpostSchema = {
    title:     { type: String, require: true },
    date:      { type: Date, required: false },
    text:      { type: String, require: true },
    paths:     [{ type: String, require: true }],
    createdAt: { type: Date, default: Date.UTC, index: true },
    createdBy: { type: String, require: true },
    updatedAt: { type: Date },
    updatedBy: { type: String }
};

let blogPostRepository: Model<IBlogBase> = null;
let clubActivityRepository: Model<IBlogBase> = null;
let photoAlbumRepository: Model<IBlogBase> = null;

export function createRepository(entity): Model<IBlogBase>  {
    switch(entity?.toLowerCase()) {
        case 'blogpost':
            if (blogPostRepository == null) {
                blogPostRepository = commonModel.discriminator<IBlogBase>('blogpost', new Schema(blogpostSchema, baseConfig));
            }
            return blogPostRepository;
        case 'club-activity':
            if (clubActivityRepository == null) {
                clubActivityRepository = commonModel.discriminator<IBlogBase>('clubactivity', new Schema(blogpostSchema, baseConfig));
            }
            return clubActivityRepository;
        case 'photo-album':
            if (photoAlbumRepository == null) {
                photoAlbumRepository = commonModel.discriminator<IBlogBase>('photo-album', new Schema(blogpostSchema, baseConfig));
            }
            return photoAlbumRepository;
        default:
            throw `entity '${entity}' not supported`;
    }
};

export const addItem = async (entity, doc) => {
    const repository = createRepository(entity);
    const entry = new repository();
    entry.title = doc.title;
    entry.date = doc.date;
    entry.text = doc.text;
    entry.paths = doc.paths;
    entry.createdAt = new Date();
    entry.createdBy = doc.createdBy;
    entry.updatedAt = new Date();
    entry.updatedBy = doc.updatedBy;
    return await entry.save();
};

export const updateItem = async (entity, doc) => {
    const repository = createRepository(entity);
    var entry = await repository.findById(doc._id);
    if (!entry) {
        throw Error(`Document '${doc._id}' not found`);
    }   
    entry.title = doc.title;
    entry.date = doc.date;
    entry.text = doc.text;
    entry.paths = doc.paths;
    entry.createdAt = new Date();
    entry.createdBy = doc.createdBy;
    entry.updatedAt = new Date();
    entry.updatedBy = doc.updatedBy;    
    entry.update();    
    return await entry.save();
};

export const findItemById = async (entity, id) => {
    const repository = createRepository(entity);
    return await repository.findById(id);
};

export const findItems = async (entity, query: any) => {
    const repository = createRepository(entity);
    var filter = query.title ? {title: {$regex: `.*${query.title}.*`, $options: 'i'}} : null;
    return await repository.find(filter).limit(20).sort({'date': -1});
};

export const deleteItemById = async (entity, id) => {
    const repository = createRepository(entity);
    return await repository.findByIdAndDelete(id);
};

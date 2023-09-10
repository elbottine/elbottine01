import { Schema, model, connect } from "mongoose";

let db = null;

// const blogpostSchema = new Schema(
//   { blogpostName: String },
//   { timestamps: true }
// );

// const blogpostSchema = new Schema()
//     { title: String },
//     { text: String },

//     // title: {
//     //   type: String,
//     //   //required: [true, 'title is required'],
//     // },
//     // text: {
//     //   type: String,
//     //   //required: [true, 'text is required'],
//     //   //index: true,
//     // },
//     { createdAt: { type: Date,  default: Date.now() } }
// )

const baseConfig = {
    discriminatorKey: "_type", //If you've got a lot of different data types, you could also consider setting up a secondary index here.
    collection: "blogpost"   //Name of the Common Collection
};

// const dateSchema = new Schema({
//     year: { type: Number, required: true },
//     month: { type: Number, required: true },
//     day: { type: Number, required: true }
// });

const blogpostSchema = new Schema({
    title:     { type: String, require: true },
    date:      { type: Date, required: false },
    text:      { type: String, require: true },
    paths:     [{ type: String, require: true }],
    createdAt: { type: Date, default: Date.UTC, index: true },
    createdBy: { type: String, require: true },
    updatedAt: { type: Date },
    updatedBy: { type: String }
});

//export const DateModel = model("bottine", dateSchema, "date");
export const BlogpostModel = model("bottine", blogpostSchema, "blogpost");

export const init = async () => {
    if (!db) {
        db = await connect(process.env["CosmosDbConnectionString"]);
    }
};

export const addItem = async (doc) => {
    const modelToInsert = new BlogpostModel();
    modelToInsert["title"]     = doc.title;
    modelToInsert["date"]      = doc.date;
    modelToInsert["text"]      = doc.text;
    modelToInsert["paths"]     = doc.paths;
    modelToInsert["createdAt"] = doc.createdAt;
    modelToInsert["createdBy"] = doc.createdBy;
    modelToInsert["updatedAt"] = doc.updatedAt;
    modelToInsert["updatedBy"] = doc.updatedBy;
    return await modelToInsert.save();
};

export const updateItem = async (doc) => {
    var entry = await BlogpostModel.findById(doc._id);
    if (!entry) {
        throw Error(`Document '${doc._id}' not found`);
    }   
    entry.title = doc.title;
    entry.text = doc.text;
    entry.paths = doc.paths;
    entry.date = doc.date;
    entry.updatedAt = new Date();
    entry.updatedBy = doc.updatedBy;
    return await entry.save();
};

export const findItemById = async (id) => {
    return await BlogpostModel.findById(id);
};

export const findItems = async (query: any) => {
    var filter = query.title ? {title: {$regex: `.*${query.title}.*`, $options: 'i'}} : null;
    return await BlogpostModel.find(filter).limit(20).sort({'createdAt': -1});
};

export const deleteItemById = async (id) => {
    return await BlogpostModel.findByIdAndDelete(id);
};

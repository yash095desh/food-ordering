import mongoose from "mongoose";

const CategoriesSchema = mongoose.Schema({
    name : { type : String},
},{timestamps:true})

export const Categories = mongoose.models?.Categories || mongoose.model('Categories',CategoriesSchema)
import mongoose, { models } from "mongoose";

const UserSchema = mongoose.Schema({
    name : {type : String , required : true,unique : true},
    email:{type : String , requied : true , unique : true},
    password : {type : String , required : true },
    image : {type:String},
},{timestamps: true})

export const  User = models ?.User || mongoose.model('User',UserSchema) ;
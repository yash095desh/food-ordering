import mongoose, { model, models } from "mongoose";

const OrderSchema = new mongoose.Schema({
    email : String,
    phoneNumber : String,
    address : String,
    postalCode : String,
    city : String,
    country : String,
    products : [Object],
    paid : {type:Boolean,default:false},
},{timestamps:true})

export const Order = models?.Order || model('Order',OrderSchema);

import mongoose from "mongoose";

const ExtraPropsSchema = new mongoose.Schema({
    name:String,
    price:Number,
})

const MenuItemsShema = new mongoose.Schema({
    image : {type : String},
    name : {type:String},
    description : {type:String},
    category : {type:mongoose.Types.ObjectId},
    basePrice:{type:Number},
    sizes : {type:[ExtraPropsSchema]},
    extraIngredients : {type:[ExtraPropsSchema]}
},{timestamps:true})

export const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem',MenuItemsShema)
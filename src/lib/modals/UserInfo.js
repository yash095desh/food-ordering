import mongoose  from "mongoose";

const UserInfoSchema = mongoose.Schema({
    email:{type : String , requied : true , unique : true}, 
    phoneNumber : {type:String},
    address : {type:String},
    postalCode : {type:String},
    city : {type:String},
    country : {type:String},
    Isadmin : {type:Boolean , default:false , required : true}
},{ timestamps : true})

 export  const  UserInfo = mongoose.models?.UserInfo || mongoose.model('UserInfo',UserInfoSchema) 
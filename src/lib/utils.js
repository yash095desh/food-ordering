import mongoose from "mongoose"
import { UserInfo } from "./modals/UserInfo"
import { auth } from "./auth"

export const ConnectToDb =async()=>{
    try {
        let connection = {}
        if(connection.isConnected){
            console.log('Using Existing Connection')
            return
        }else{
            const db = await mongoose.connect(process.env.MONGOURL)
            connection.isConnected = db.connections[0].readyState;
            console.log('Connected Successfully')
        }
    } catch (e) {
        console.log(e)
    }
}

export const isAdmin = async()=>{
    const session = await auth();
    const email = session?.user?.email;

    const userInfo = await UserInfo.findOne({email}) ;

    return userInfo?.Isadmin 
}
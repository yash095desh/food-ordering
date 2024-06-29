import { auth } from "@/lib/auth"
import { User } from "@/lib/modals/User"
import { UserInfo } from "@/lib/modals/UserInfo"
import { ConnectToDb } from "@/lib/utils"
import { NextResponse } from "next/server"

export const POST =async(req) =>{
    const {email,name,image,...otherInfo} = await req.json()
    try {
        ConnectToDb()
        const user = await User.findOneAndUpdate({email},{name,image},{new:true})
        await UserInfo.findOneAndUpdate({email}, otherInfo,{upsert : true})
        console.log('Updated Successfully ')
        return NextResponse.json(user)
    } catch (error) {
        console.log(error)
    }
}
export const GET = async(req) =>{
    try {
    const url = new URL(req.url);
    const id  = url.searchParams.get('id')
    const session = await auth()
    let filter;
    if(id){
      const user = await User.findById(id)
      filter = {email:user.email}
    }else{
      filter = {email:session?.user?.email}
    }
        ConnectToDb();
        const user = await User.findOne(filter).lean();
        const userInfo = await UserInfo.findOne(filter).lean();
        return NextResponse.json({...user,...userInfo})
    } catch (error) {
        console.log(error)
    }
}
export const DELETE =async(req)=>{
    try {
        ConnectToDb()
        const url = new URL(req.url)
        const id = url.searchParams.get('id')
        const user = await User.findOneAndDelete(id).lean();
        const userInfo = await UserInfo.findOneAndDelete({email:user.email}).lean();
        return NextResponse.json({...user,...userInfo})
    } catch (error) {
        console.log(error)
    }
}
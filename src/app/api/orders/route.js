import { auth } from "@/lib/auth";
import { Order } from "@/lib/modals/Orders";
import { ConnectToDb, isAdmin} from "@/lib/utils"
import { NextResponse } from "next/server";

export const GET =async(req)=>{
    ConnectToDb();
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id')
        const session = await auth();
        const email = session?.user?.email;
        const admin = await isAdmin()
        let order ;

        if(id){
            order = await Order.findById(id)
            return NextResponse.json(order)
        }
        if(admin){
            order = await Order.find({}).sort({'createdAt':'desc'}).exec();
        }else{
            order = await Order.find({email}).sort({'createdAt':'desc'}).exec();
        }
        return NextResponse.json(order)

    } catch (error) {
        console.log(error)
    }
}
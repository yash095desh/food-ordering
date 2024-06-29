import { User } from "@/lib/modals/User";
import { ConnectToDb } from "@/lib/utils"
import { NextResponse } from "next/server";

export const GET = async()=>{
    try {
        ConnectToDb();
        const user = await User.find({});
        return NextResponse.json(user)
    } catch (error) {
        console.log(error)
    }
}
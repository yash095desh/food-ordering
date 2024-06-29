import { MenuItem } from "@/lib/modals/MenuItems"
import { ConnectToDb } from "@/lib/utils"
import { NextResponse } from "next/server"

export const POST = async(res) =>{
    const data = await res.json();
    try {
        ConnectToDb();
        const menuItem = new MenuItem(data)
        await menuItem.save();
        return NextResponse.json(menuItem)
    } catch (error) {
        return NextResponse.json(error.message,{status:500})
    }

}
export const PUT = async(res) =>{
    const { id ,...data} = await res.json();
    try {
        ConnectToDb();
        const menuItem = await MenuItem.findByIdAndUpdate(id,data)
        return NextResponse.json(menuItem)
    } catch (error) {
        return NextResponse.json(error.message,{status:500})
    }

}
export const GET = async() => {
    ConnectToDb()
    const items = await MenuItem.find({})
   return NextResponse.json(items)    
}

export const DELETE = async(req)=>{
    try {
    ConnectToDb();
    let Url = new URL(req.url)
    const id = Url.searchParams.get('id')
    const res = await MenuItem.findByIdAndDelete(id)
    return NextResponse.json(res)
    } catch (error) {
        console.log(error)
    } 
 }
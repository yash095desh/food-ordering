import { Categories } from "@/lib/modals/Categories"
import { ConnectToDb } from "@/lib/utils"
import { Connection } from "mongoose"
import { NextResponse } from "next/server"

 export const POST =async(req)=>{
    const {data} = await req.json()
    console.log(data)
    try {
        ConnectToDb()
        const category = new Categories({name : data.category})
        await category.save()
        return NextResponse.json(category)
    } catch (error) {
        console.log(error)
    }
 }
 export const GET = async()=>{
    ConnectToDb()
    const categories = await Categories.find({})
    return NextResponse.json(categories)
 }

 export const PUT = async(req)=>{
    const {data} = await req.json()
    try {
        ConnectToDb()
        const category = await Categories.findByIdAndUpdate(data._id,{name : data.category})
        return NextResponse.json(category)
    } catch (error) {
        console.log(error)
    }
 }

 export const DELETE = async(req)=>{
    try {
    ConnectToDb();
    let Url = new URL(req.url)
    const id = Url.searchParams.get('id')
    const res = await Categories.findByIdAndDelete(id)
    return NextResponse.json(res)
    } catch (error) {
        console.log(error)
    }
    
 }
import { User } from "@/lib/modals/User"
import { ConnectToDb } from "@/lib/utils"
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'

export const POST = async(request)=>{
    const body = await request.json() 
    try {
        await ConnectToDb()
        const salt = bcrypt.genSaltSync(10)
        const hashedpass = bcrypt.hashSync(body.password,salt)
        const newUser = new User({
            name : body.username,
            email : body.email,
            password : hashedpass
        })
        await newUser.save()
        console.log('user created Sucessfully')
        return NextResponse.json(newUser)
    } catch (error) {
        console.log(error)
       return NextResponse.json({error:error},{status:500})
    }
} 
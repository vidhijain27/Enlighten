import { ConnectDB } from "@/lib/config/db.config";
import { UserModel } from "@/lib/models/User.models";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

ConnectDB()
export const POST = async(request:NextRequest) => {

    try {
        const {name,email,password, age, gender}= await request.json();
        
        // if email exists

        const existUser = await UserModel.findOne({email});
        if(existUser){
            return NextResponse.json({error:"User already exist"}, {
                status:400
            })
        }

        await UserModel.create({
            name,email,password,age,gender
        })
        return NextResponse.json({msg:"User resgister Succesfully"}, {
            status:200
        })

    } catch (error:any) {
        return NextResponse.json({error:error.message}, {
            status:500
        })
    }
    
}
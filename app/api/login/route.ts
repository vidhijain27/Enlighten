import { ConnectDB } from "@/lib/config/db.config";
import { UserModel } from "@/lib/models/User.models";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";
import { GenerateToken } from "@/lib/services/Token.service";

ConnectDB()
export const POST = async(request:NextRequest) => {

    try {
        const {email,password}= await request.json();
        
        // if email exists

        const existUser = await UserModel.findOne({email});
        if(!existUser){
            return NextResponse.json({error:"User Not Found"}, {
                status:404
            })
        }

        // matching password
        const isMatch = await existUser.comparePassword(password);
        if(!isMatch){
            return NextResponse.json({error:"Invalid Credentials"}, {
                status:401
            })
        }

        //token

        // jwt 

        const token = await GenerateToken(existUser._id);

        const response = NextResponse.json({msg:"User login successfully"}, {
            status:201
        })

        response.cookies.set("authentication", token, {
            httpOnly:true
        }); 
        return response;

    } catch (error:any) {
        return NextResponse.json({error:error.message}, {
            status:500
        })
    }
    
}
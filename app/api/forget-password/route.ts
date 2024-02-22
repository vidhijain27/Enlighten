import { ConnectDB } from "@/lib/config/db.config";
import { UserModel } from "@/lib/models/User.models";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";
import { GenerateToken, GenerateTokenReset } from "@/lib/services/Token.service";
import { SendEmail } from "@/lib/services/MainService";

ConnectDB()
export const POST = async(request:NextRequest) => {

    try {
        const {email}= await request.json();
        
        // if email exists

        const existUser = await UserModel.findOne({email});
        if(!existUser){
            return NextResponse.json({error:"User Not Found"}, {
                status:404
            })
        }

        const token = await GenerateTokenReset(existUser._id);

        await SendEmail(existUser.name, existUser.email, token)

        const response = NextResponse.json({msg:"Mail sent successfully, kindly check"}, {
            status:201
        })

        return response;

    } catch (error:any) {
        return NextResponse.json({error:error.message}, {
            status:500
        })
    }
    
}
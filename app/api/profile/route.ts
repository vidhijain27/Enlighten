import { ConnectDB } from "@/lib/config/db.config";
import { UserModel } from "@/lib/models/User.models";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";
import { GenerateToken, VerifyToken } from "@/lib/services/Token.service";
import { verify } from "crypto";

ConnectDB()
export const GET = async(request:NextRequest) => {

    try {
        const tokenData = await request.cookies.get("authentication") || '';

        if (!tokenData) {
            return NextResponse.json({error:"Please first login"}, {
                status:401
            })
        }

        const user = await VerifyToken(tokenData.value);
        
        // if email exists

        const existUser = await UserModel.findById(user).select("name email age");
        if(!existUser){
            return NextResponse.json({error:"User Not Found"}, {
                status:401
            })
        }
        return NextResponse.json({msg:"Profile fetched", user:existUser}, {
            status:200
        })



    } catch (error:any) {
        return NextResponse.json({error:error.message}, {
            status:500
        })
    }
    
}
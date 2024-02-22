import { ConnectDB } from "@/lib/config/db.config";
import { UserModel } from "@/lib/models/User.models";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";
import { GenerateToken, GenerateTokenReset, VerifyTokenReset } from "@/lib/services/Token.service";
import { SendEmail } from "@/lib/services/MainService";

ConnectDB()
export const PUT = async(request:NextRequest) => {

    try {
        const {password, cpassword, token}= await request.json();
        
        // if email exists


        if (password !== cpassword) {
            return NextResponse.json({error:"password and cpassword does not match"},{
                status:404
            })
        }

        const data = await VerifyTokenReset(token);
        const existUser = await UserModel.findByIdAndUpdate(data);
        if(!existUser){
            return NextResponse.json({error:"User Not Found"}, {
                status:404
            })
        }

        const hashPassword = await existUser.updatePassword(password);

        await UserModel.findByIdAndUpdate(data, {
            $set:{
                password: hashPassword
            }
        })


        const response = NextResponse.json({msg:"Password reset successfully"}, {
            status:200
        })

        return response;

    } catch (error:any) {
        return NextResponse.json({error:error.message}, {
            status:500
        })
    }
    
}
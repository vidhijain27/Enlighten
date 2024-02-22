import { request } from "http";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "crypto";

export const GET = async(request:NextRequest) => {

    try {

        const response =  NextResponse.json({msg:"Logout successful"}, {
            status:200
        })

        response.cookies.delete("authentication");
        return response;



    } catch (error:any) {
        return NextResponse.json({error:error.message}, {
            status:500
        })
    }
    
}
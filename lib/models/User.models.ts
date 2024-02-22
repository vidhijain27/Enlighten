import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const Schema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    isBlock:{
        type:Boolean,
        default:false
    },
    age:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        // possibleValues:['male', 'female', 'other'],
        required:true
    }
}, {
    timestamps:true
})

// function - middleware

Schema.pre("save", async function(next){
    const user = this;

    if (user.isModified("password")) {
        user.password =await bcrypt.hash(user.password, 10);
    }
    next()
})

// function - compare password

Schema.methods.comparePassword = async function(string_pass: string) {
    const isMatch:boolean = await bcrypt.compare(string_pass, this.password);
    return isMatch;
}

// function - update password

Schema.methods.updatePassword = async function(string_pass: string) {
    const pass:string = await bcrypt.hash(string_pass, 10);
    return pass;
}


export const UserModel = mongoose.models.User || mongoose.model("User", Schema);
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

interface UserData{
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    roleId: bigint | null,
}

const ResponseData = (status:number, message:string | null, error:any|null, data:any|null) => {
    if (error != null && error instanceof Error) {
        const response = {
            status:status,
            message: error.message,
            error: error,
            data: null
        }
        return response;
      
    }
    const res = {
        status:status,
        message: message,
        data: data,
        error: error,
    }
    return res;
}

const GenerateToken = (data:any): string => {
    const token = jwt.sign(data, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRE
    })
    return token;
}

const GenerateRefreshToken = (data:any): string => {
    const token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN as string, {
        expiresIn: process.env.JWT_REFRESH_EXPIRED_TOKEN
    })
    return token;
}

const ExtractToken = (token:string): UserData | null => {
    const secretKey: string = process.env.JWT_SECRET as string
    let resData:any;
    const res = jwt.verify(token, secretKey,(err,decoded)=>{
        if(err){
            resData = null
        }
        else{
            resData = decoded
        }
    })
    if(resData){
        const result:UserData = <UserData>(resData)
        return result
    }
    return null
}

const ExtractRefreshToken = (token:string): UserData | null => {
    const secretKey: string = process.env.JWT_REFRESH_EXPIRED_TOKEN as string
    let resData:any;
    const res = jwt.verify(token, secretKey,(err,decoded)=>{
        if(err){
            resData = null
        }
        else{
            resData = decoded
        }
    })
    if(resData){
        const result:UserData = <UserData>(resData)
        return result
    }
    return null
}


export default { ResponseData, GenerateToken,GenerateRefreshToken, ExtractToken,ExtractRefreshToken }
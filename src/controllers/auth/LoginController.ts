
import { Request, Response } from "express";
import User from "../../db/models/User";
import helper from "../../helpers/helper";
import PasswordHelpers from "../../helpers/PasswordHelpers";
import Role from "../../db/models/Role";

const login = async(req:Request, res:Response): Promise<Response> =>{
    try {
        const { email,password } = req.body;
        const create = await User.findOne({
            where: {
                email: email
            }
        })
        if (!create || !await PasswordHelpers.PasswordCompare(password,create.password)) {
            return res.status(404).send(helper.ResponseData(401,'Unauthorized',null,null))
        }
        // if (await PasswordHelpers.PasswordCompare(password,create.password)) {
        //     return res.status(401).send(helper.ResponseData(401,'Unauthorized',null,null))
        // }
        const dataUser = {
            firstName: create.firstName,
            lastName: create.lastName,
            email: create.email,
            roleId: create.roleId
        }
        const token = helper.GenerateToken(dataUser)
        const refreshToken = helper.GenerateRefreshToken(dataUser)
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            maxAge:24*60*60*1000
        })
        create.accessToken = refreshToken
        await create.save()
        const response = {
            firstName: create.firstName,
            lastName: create.lastName,
            email: create.email,
            roleId: create.roleId,
            token: token
        }
        return res.status(200).send(helper.ResponseData(200,'Login OKE',null,response))
    } catch (error:any) {
        return res.status(500).send(helper.ResponseData(500,'Error',error,null))
    }
}

const logout = async(req:Request, res:Response): Promise<Response> =>{
    try {
        const refreshToken = req.cookies?.refreshToken
        if(!refreshToken){
            return res.status(200).send(helper.ResponseData(200,'Logout OKE',null,null))
        }
        const email = res.locals.userEmail
        const user = await User.findOne({
            where:{
                email:email
            },
            attributes: { exclude: ['password','accessToken'] }
        })
        if(!user){
            res.clearCookie('refreshToken')
            return res.status(200).send(helper.ResponseData(200,'Logout OKE',null,null))
        }
        user.accessToken = null
        await user.save()
        
        return res.status(200).send(helper.ResponseData(200,'Logout OKE',null,null))
    } catch (error:any) {
        return res.status(500).send(helper.ResponseData(500,'Error','Error',null))
    }
}

const currentUser = async(req:Request, res:Response): Promise<Response> =>{
    try {
        const email = res.locals.userEmail
        const user = await User.findOne({
            where:{
                email:email
            },
            attributes: { exclude: ['password','accessToken'] },
            include:{
                model:Role,
                attributes:['id','roleName']
            },
        })
        if (!user){
            return res.status(404).send({
                status:404,
                message: 'User not found'
            })
        }
        return res.status(200).send({
            status:200,
            message: 'Current Login',
            data: user
        })
    } catch (error:any) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status:500,
                message: error.message,
                error: error
            })
        }
        return res.status(500).send({
            status:500,
            message: 'Internal Server Error',
            error: error
        })
    }
}


export default {login,logout,currentUser}

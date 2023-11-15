import { Request, Response } from "express";
import helper from "../../helpers/helper";

const RefreshToken = async(req:Request, res:Response): Promise<Response> =>{
    try {
        const refreshToken = req.cookies?.refreshToken
        if (!refreshToken) {
            return res.status(401).send(helper.ResponseData(401,'Unauthorized',null,null))
        }
        const dataUser = await helper.ExtractRefreshToken(refreshToken)
        if (!dataUser) {
            return res.status(401).send(helper.ResponseData(401,'Unauthorized',null,null))
        }
        const token = helper.GenerateToken({
            firstName: dataUser.firstName,
            lastName: dataUser.lastName,
            email: dataUser.email,
            roleId: dataUser.roleId
        })
        
        const result = {
            firstName: dataUser.firstName,
            lastName: dataUser.lastName,
            email: dataUser.email,
            roleId: dataUser.roleId,
            token: token
        }
        return res.status(200).send(helper.ResponseData(200,'OKE',null,result))
    } catch (error:any) {
        return res.status(500).send(helper.ResponseData(500,'','Error',null))
    }
}

export default {RefreshToken}
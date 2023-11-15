import { Request, Response } from "express";
import User from "../../db/models/User";
import helper from "../../helpers/helper";
import PasswordHelpers from "../../helpers/PasswordHelpers";

const register = async(req:Request, res:Response): Promise<Response> =>{
    try {
        const { firstName,lastName,email,password,confirmPassword } = req.body;
        const create = await User.create({
           firstName: firstName,
           lastName: lastName,
           email: email,
           password: await PasswordHelpers.PasswordHashing(password),
           active:true,
           verified:true,
           roleId: 1
        })
        return res.status(201).send(helper.ResponseData(201,'Created',null,create))
    } catch (error:any) {
        return res.status(500).send(helper.ResponseData(500,'Error','Error',null))
    }
}

export default {register}

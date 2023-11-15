import Validator  from "validatorjs";
import { Request, Response, NextFunction } from "express";
import helper from "../../helpers/helper";
import User from "../../db/models/User";

const RegisterValidation = async (req: Request, res: Response, next: NextFunction)=>{
    console.log(req.body)
    try {
        const validator = new Validator(req.body, {
            firstName: "required|min:3|max:20",
            lastName: "required|min:3|max:20",
            email: "required|email",
            password: "required|min:8",
            confirmPassword: "required|same:password"
        });
        if (validator.fails()) {
            return res.status(400).send(helper.ResponseData(400,"Bad Request",validator.errors,null))
        }
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (user) {
            return res.status(400).send(helper.ResponseData(400,"Bad Request",{errors:{email:["Email already exists"]}},null))
        }
        next()
    } catch (error:any) {
        return res.status(500).send(helper.ResponseData(500,"",error,null))
    }
}

export default {RegisterValidation}
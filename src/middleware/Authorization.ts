import { Request, Response, NextFunction } from "express";
import helper from "../helpers/helper";

const Authenticated = (req: Request,res: Response, next: NextFunction) =>{
    try {
        const authToken = req.headers['authorization']
        const token = authToken && authToken.split(' ')[1]
        if (token === null) {
			return res.status(401).send(helper.ResponseData(401, "Unautorized", null, null));
		}
		const result = helper.ExtractToken(token!);
		if (!result) {
			return res.status(401).send(helper.ResponseData(401, "Unautorized", null, null));
		}
        res.locals.userEmail = result?.email
        res.locals.roleId = result?.roleId
		next();
    } catch (error:any) {
        return res.status(500).json(helper.ResponseData(500, "",error,null))
    }
}


export default { Authenticated }
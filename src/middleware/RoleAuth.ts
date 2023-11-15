import { Request, Response, NextFunction } from "express";
import helper from "../helpers/helper";

const superAdmin = (req: Request,res: Response, next: NextFunction) =>{
    try {
        const role = res.locals.roleId;
        if (role!== 1) {
            return res.status(403).send(helper.ResponseData(403, "Forbidden", null, null));
        }
		next();
    } catch (error:any) {
        return res.status(500).json(helper.ResponseData(500, "",error,null))
    }
}

const admin = (req: Request,res: Response, next: NextFunction) =>{
    try {
        const role = res.locals.roleId;
        if (role!== 2) {
            return res.status(403).send(helper.ResponseData(403, "Forbidden", null, null));
        }
		next();
    } catch (error:any) {
        return res.status(500).json(helper.ResponseData(500, "",error,null))
    }
}

const basic = (req: Request,res: Response, next: NextFunction) =>{
    try {
        const role = res.locals.roleId;
        if (role !== 3) {
            return res.status(403).send(helper.ResponseData(403, "Forbidden", null, null));
        }
		next();
    } catch (error:any) {
        return res.status(500).json(helper.ResponseData(500, "",error,null))
    }
}


export default { superAdmin, admin, basic }
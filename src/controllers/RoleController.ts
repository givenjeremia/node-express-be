import { Request, Response } from "express";
import Role from "../db/models/Role";

const get = async(req:Request, res:Response): Promise<Response> =>{
    try {
        const roles = await Role.findAll({
            where:{
                active:true
            }
        })
        return res.status(200).send({
            status:200,
            message: 'OK',
            data: roles
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

const show = async(req:Request, res:Response): Promise<Response> =>{
    try {
        const { id } = req.params
        const role = await Role.findByPk(id)
        if (!role){
            return res.status(404).send({
                status:404,
                message: 'Role not found'
            })
        }
        return res.status(200).send({
            status:200,
            message: 'Show',
            data: role
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

const store = async(req:Request, res:Response): Promise<Response> =>{
    try {
        const { roleName,active } = req.body;
        const role = await Role.create({
            roleName,
            active
        })
        return res.status(201).send({
            status:201,
            message: 'Created',
            data: role
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

const update = async(req:Request, res:Response): Promise<Response> =>{
    try {
        const { id } = req.params
        const { roleName,active } = req.body;
        const role = await Role.findByPk(id)
        if (!role){
            return res.status(404).send({
                status:404,
                message: 'Role not found'
            })
        }
        role.roleName = roleName
        role.active = active
        await role.save()
        return res.status(200).send({
            status:200,
            message: 'Updated',
            data: role
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

const destroy = async(req:Request, res:Response): Promise<Response> =>{
    try {
        const { id } = req.params
        const role = await Role.findByPk(id)
        if (!role){
            return res.status(404).send({
                status:404,
                message: 'Role not found'
            })
        }
        await role.destroy()
        return res.status(200).send({
            status:200,
            message: 'Deleted',
            data: null
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

export default {get,show,store,update,destroy}
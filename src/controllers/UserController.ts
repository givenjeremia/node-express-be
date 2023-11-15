import { Request, Response } from "express";
import User from "../db/models/User";
import helper from "../helpers/helper";
import PasswordHelpers from "../helpers/PasswordHelpers";
// const get = async(req:Request, res:Response): Promise<Response> =>{
//     try {
//         const Users = await User.findAll({
//             where:{
//                 active:true
//             }
//         })
//         return res.status(200).send({
//             status:200,
//             message: 'OK',
//             data: Users
//         })
//     } catch (error:any) {
//         if (error != null && error instanceof Error) {
//             return res.status(500).send({
//                 status:500,
//                 message: error.message,
//                 error: error
//             })
//         }
//         return res.status(500).send({
//             status:500,
//             message: 'Internal Server Error',
//             error: error
//         })
//     }
// }

// const show = async(req:Request, res:Response): Promise<Response> =>{
//     try {
//         const { id } = req.params
//         const Users = await User.findByPk(id)
//         if (!User){
//             return res.status(404).send({
//                 status:404,
//                 message: 'User not found'
//             })
//         }
//         return res.status(200).send({
//             status:200,
//             message: 'Show',
//             data: User
//         })
//     } catch (error:any) {
//         if (error != null && error instanceof Error) {
//             return res.status(500).send({
//                 status:500,
//                 message: error.message,
//                 error: error
//             })
//         }
//         return res.status(500).send({
//             status:500,
//             message: 'Internal Server Error',
//             error: error
//         })
//     }
// }





// export default {store,login}
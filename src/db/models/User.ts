import { DataTypes, Model, Optional } from 'sequelize'
import connection from "../../config/dbConnect"
import Role from './Role'

interface UserAttributes{
  id?:number,
  roleId?:number | null,
  firstName?:string | null,
  lastName?:string | null,
  email?:string | null,
  password?:string | null,
  accessToken?:string | null
  verified?:boolean | null,
  active?:boolean | null,
  createdAt?:Date | null,
  updatedAt?:Date | null
}

export interface UserInput extends Optional<UserAttributes,'id'>{}
export interface UserOutput extends Required<UserAttributes>{}

class User extends Model<UserAttributes,UserInput> implements UserAttributes{
  public id!:number
  public roleId!:number
  public firstName!:string
  public lastName!:string
  public email!:string
  public password!:string 
  public accessToken!:string |null
  public verified!:boolean
  public active!:boolean
  public readonly createdAt!:Date
  public readonly updatedAt!:Date
}

User.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT
    },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.TEXT
      },
      roleId: {
        type: DataTypes.BIGINT
      },
      accessToken:{
        type: DataTypes.TEXT
      },
      verified:{
        type: DataTypes.BOOLEAN
      },
      active:{
        type: DataTypes.BOOLEAN
      },
},{
  timestamps:true,
  sequelize: connection,
})

User.belongsTo(Role,{foreignKey:"roleId"})

export default User
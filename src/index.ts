import express, {Request,Response} from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import router from './routes/Routes'
import AuthRouter from './routes/AuthRoutes'

// Initial
dotenv.config()
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

// Router Data
app.get('/', (req : Request, res :Response) => {
    return res.status(200).send({
        response:"Express Ts"
    })
})
app.use(AuthRouter)
app.use(router)

// Server
app.listen(process.env.APP_PORT, ()=>{
    console.log(`${process.env.APP_NAME} Server is running on port ${process.env.APP_PORT}`);
})
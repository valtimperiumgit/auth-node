import express, {Express} from "express";
import authorizationRouter from "./routers/AuthorizationRouter";
import mongoose from "mongoose";
import * as bodyParser from 'body-parser';
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middleware/ErrorMiddleware";
import cors from "cors";
import fs from "fs";
import https from "https";

import dotenv from 'dotenv'
dotenv.config()

const app: Express = express();

function loggerMiddleware(request: express.Request, response: express.Response, next: express.NextFunction) {
    console.log(`${request.method} ${request.path}`);
    next();
  }

app.use(loggerMiddleware);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/authorization', authorizationRouter);

app.use(errorMiddleware);

const https_options = {
    ca: fs.readFileSync("ssl/ca_bundle.crt"),
    key: fs.readFileSync("ssl/private.key"),
    cert: fs.readFileSync("ssl/certificate.crt")
   };

   const startApp = async () => {
    try{
        if(process.env.DB_URL != undefined){
            await mongoose.connect(process.env.DB_URL);
        }
        app.listen(process.env.PORT, () => console.log("Hello " + process.env.PORT));
    }
    catch(e){
        console.log(e)
    }
}

startApp();

https.createServer(https_options, app).listen(443);


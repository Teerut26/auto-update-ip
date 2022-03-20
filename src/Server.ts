import express, { Application, Request, Response } from "express";
import { promises as fsp } from "fs";
require('dotenv').config()

export default class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.run()
  }

  private run(): void {
    this.app.listen(Number.parseInt(process.env.PORT as string));
    console.log(`run on port: ${process.env.PORT as string}`);
    
  }

  private config(): void {
    this.app.get("/", this.get);
  }

  private async get(req: Request, res: Response) {
    let raw_data = await fsp.readFile("data.json")
    
    res.json(JSON.parse(raw_data.toString()));
  }
}

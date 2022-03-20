import express, { Application, Request, Response } from "express";
import save_file from "./modules/save_file";
import ip from "ip";
import Server from "./Server";
import HttpRequest from "./HttpRequest";
require('dotenv').config()

export default class AutoUpdateIp extends Server {
  private httpRequest = new HttpRequest();

  constructor() {
    super();

    setInterval(() => {
      this.send()
    }, 10000);
  }

  private async send() {
    await this.httpRequest.send_webhook(process.env.WEBHOOK_URL as string);
    await save_file({
      ip: ip.address(),
      timestamp: new Date().toISOString(),
    });
  }
}

new AutoUpdateIp();

import express, { Application, Request, Response } from "express";
import save_file from "./modules/save_file";
import Server from "./Server";
import HttpRequest from "./HttpRequest";
import axios from "axios";

export interface IpApi {
  ip: string;
  success: boolean;
  type: string;
  continent: string;
  continent_code: string;
  country: string;
  country_code: string;
  country_flag: string;
  country_capital: string;
  country_phone: string;
  country_neighbours: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  asn: string;
  org: string;
  isp: string;
  timezone: string;
  timezone_name: string;
  timezone_dstOffset: number;
  timezone_gmtOffset: number;
  timezone_gmt: string;
  currency: string;
  currency_code: string;
  currency_symbol: string;
  currency_rates: number;
  currency_plural: string;
  completed_requests: number;
}

require("dotenv").config();

export default class AutoUpdateIp extends Server {
  private httpRequest = new HttpRequest();

  constructor() {
    super();

    setInterval(() => {
      this.send();
    }, 1000 * 60 * 60);
  }

  private async send() {
    let ip: { data: IpApi } = await axios.get(
      "https://ipwhois.app/json/?lang=en"
    );
    await this.httpRequest.send_webhook(process.env.WEBHOOK_URL as string);
    await save_file({
      ip: ip.data.ip,
      timestamp: new Date().toISOString(),
    });
    console.log(`[${new Date().toLocaleString("th-TH")}] ${ip.data.ip}`);
  }
}

new AutoUpdateIp();

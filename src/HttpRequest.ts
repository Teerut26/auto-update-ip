import axios, { AxiosStatic } from "axios";
export default class HttpRequest {
  private axios: AxiosStatic = axios;

  public async send_webhook(url: string) {
    let { data } = await this.axios.get(url);
    console.log(`[${new Date().toLocaleString("th-TH")}] ${data}`);
    return data
  }
}

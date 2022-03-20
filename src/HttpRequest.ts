import axios, { AxiosStatic } from "axios";
export default class HttpRequest {
  private axios: AxiosStatic = axios;

  public async send_webhook(url: string) {
    let { data } = await this.axios.get(url);
    return data
  }
}

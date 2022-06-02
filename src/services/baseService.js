import Axios from "axios";
import { DOMAIN, KEY, METHOD, TOKEN } from "../util/settings/config";

export class baseServices {
  put = (url, model) =>
    Axios({
      url: DOMAIN + url,
      method: METHOD.PUT,
      data: model,
      headers: {
        Authorization: KEY + localStorage.getItem(TOKEN),
      },
    });

  post = (url, model) =>
    Axios({
      url: DOMAIN + url,
      method: METHOD.POST,
      data: model,
      headers: {
        Authorization: KEY + localStorage.getItem(TOKEN),
      },
    });

  get = (url) =>
    Axios({
      url: DOMAIN + url,
      method: METHOD.GET,
      headers: {
        Authorization: KEY + localStorage.getItem(TOKEN),
      },
    });

  delete = (url) =>
    Axios({
      url: DOMAIN + url,
      method: METHOD.DELETE,
      headers: {
        Authorization: KEY + localStorage.getItem(TOKEN),
      },
    });
}

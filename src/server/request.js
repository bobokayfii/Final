import axios from "axios";
import Cookies from "js-cookie";

import { TOKEN } from "../const";

const token = Cookies.get(TOKEN);

export const request = axios.create({
  baseURL: "https://blog-backend-production-a0a8.up.railway.app/api/v1",
  timeout: 10000,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

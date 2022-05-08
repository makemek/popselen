import axios from "axios";
import config from "./config";

export const apiHttp = axios.create({
  baseURL: config.API_BASE_URL,
});

export const API_PATHS = {
  POP: "pop",
};

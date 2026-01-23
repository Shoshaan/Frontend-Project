import axios from "axios";

const BaseURl = "https://dummyjson.com";
export const API = axios.create({
  baseURL: BaseURl,
});

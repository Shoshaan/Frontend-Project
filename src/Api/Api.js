import axios, { Axios } from "axios";

const BaseURl = "https://dummyjson.com";
export const API = Axios.create({
  baseURL: BaseURl,
});

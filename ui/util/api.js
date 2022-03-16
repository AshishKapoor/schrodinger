import axios from "axios";
const defaultBaseURL = "http://localhost:8000";

export default axios.create({
  baseURL: defaultBaseURL,
});

export const API_ENDPOINTS = {
  cats: "/cats",
};

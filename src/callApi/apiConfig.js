import axios from "axios";
// export const baseURL = "http://localhost:3001"
export const baseURL = "https://cuahang99.com/"
const url = baseURL + "/api"

export const rootApi = axios.create({
    baseURL: url
});


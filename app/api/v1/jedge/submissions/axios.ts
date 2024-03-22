import axios from "axios";
const apiUrl:string = process.env.NEXT_PRIVATE_JEDGE_URL!

export const axiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 50000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
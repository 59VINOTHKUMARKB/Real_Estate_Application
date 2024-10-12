import axios from "axios"

const apiRequest = axios.create({
    baseURL: "https://vino-estate-api.vercel.app/api",
    withCredentials:true
})


export default apiRequest;
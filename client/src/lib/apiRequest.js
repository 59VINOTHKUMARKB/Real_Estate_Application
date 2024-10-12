import axios from "axios"

const apiRequest = axios.create({
    baseURL: "https://vino-estate-api.vercel.appapi",
    withCredentials:true
})


export default apiRequest;
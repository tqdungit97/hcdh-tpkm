import Axios from "axios";
import { environment } from "../environment";

export const AxiosInstance = Axios.create({
    baseURL: environment.apiUrl,
})
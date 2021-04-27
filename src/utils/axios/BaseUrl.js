import axios from "axios";
import {serverEndpoint} from "../ServerEndPoint";

export const baseUrlNoAuth = axios.create({

    baseURL: serverEndpoint
})
